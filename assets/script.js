// Initial function
function initPage() {

    $(document).ready(function() {
        console.log("ready");
    });

    // Event listener for enter keypress
    $("#search-term").keypress(function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $(".submit-button").click();
        };
    });
    // Event listener for click
    $(".submit-button").on("click", function() {
        $(".city-id").empty();
        var city = $("#search-term").val();
        var APIKey = "&appid=3f2c167c8daff8f6c0523b5e972f1c83";

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKey;
        // AJAX call for current forecast
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            // Variables being defined for data retrieved from the response object
            var cityName = response.name;
            var currentDate = moment().format("MMMM Do" + ", " + "YYYY");
            var currentIcon = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + currentIcon + ".png";
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            // Rounding temperature to two decimal places
            var tempRound = tempF.toFixed(2);
            var humidity = response.main.humidity;
            var windSpeed = response.wind.speed;
            // Lat and lon values obtained from first ajax call response
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            // Another API to get UV Index using the lat and lon values from first response
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + lat + "&lon=" + lon;
            // Second ajax call to get UV index
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function(uvResponse) {
                console.log(uvResponse);

                var uvIndex = uvResponse.value;

                var cityDiv = $("<h2>").addClass("city-header");
                $(".city-id").append(cityDiv);
                $(".city-header").text(cityName + " " + currentDate);
                $("#wicon").attr("src", iconURL);
                $(".temp").text("Temperature: " + tempRound + " °F");
                $(".humidity").text("Humidity: " + humidity + "%");
                $(".wind").text("Wind Speed: " + windSpeed + " MPH");
                $(".uv").text("UV Index: " + uvIndex);

                // Change background color for UV Index value
                if (uvIndex < 3) {
                    $(".uv").addClass("favorable");
                } else if (uvIndex <= 7 && uvIndex >= 3) {
                    $(".uv").addClass("moderate");
                } else {
                    $(".uv").addClass("severe");
                }
            });
        });

        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
        // Third ajax call to get 5 day forecast
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (forecastResponse) {
            console.log(forecastResponse);
            $("#forecast").empty();
            var results = forecastResponse.list
            for (var i = 0; i < results.length; i++) {
                // HERE'S THE PROBLEM
                if (results[i].dt_txt.includes("12:00:00")) {
                    var newDate = new Date();
                    var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                    var tempRound = temp.toFixed(2);
                    var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                    var cardBody = $("<div>").addClass("card-body p-3 forecast-body");
                    var date = $("<h2>").addClass("card-title").text(newDate(results[i].dt_txt).toLocaleDateString());
                    var forecastIcon = "http://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png";
                    var image = $("<img>").attr("src", forecastIcon);
                    var forecastTemp = $("<p>").addClass("card-temp").text(tempRound + " °F");
                    var forecastHumidity = $("<p>").addClass("card-humidity").text("Humidity:" + results[i].main.humidity + "%");
                    cardBody.append(date, image, forecastTemp, forecastHumidity);
                    card.append(cardBody);
                    $("#forecast").append(card);
                };
            };
        });
    });
};

initPage();