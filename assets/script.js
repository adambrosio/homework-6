// Initial function
function initPage () {
    
// Test city for APIs
var city = "houston";
var APIKey = "&appid=3f2c167c8daff8f6c0523b5e972f1c83";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKey;


// AJAX call for current forecast
$.ajax({
    url: queryURL,
    method:"GET"
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
    // console.log(cityName);
    // console.log(currentDate);
    // console.log(tempF);
    // console.log(humidity);
    // console.log(windSpeed);
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
    })

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
// Third ajax call to get 5 day forecast
    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function(forecastResponse) {
        console.log(forecastResponse);
        // Dates for each day ?????????????????????
        var dayOne = forecastResponse.list[0].dt_txt;
        var dayTwo = forecastResponse.list[7].dt_txt;
        var dayThree = forecastResponse.list[15].dt_txt;
        var dayFour = forecastResponse.list[23].dt_txt;
        var dayFive = forecastResponse.list[31].dt_txt;
        var forecastDays = [dayOne, dayTwo, dayThree, dayFour, dayFive];
        console.log(forecastDays);

        var icon = forecastResponse.list[0].weather[0].icon;
        var forecastIcon ="http://openweathermap.org/img/w/" + icon + ".png";
        var forecastTemp = (forecastResponse.list[0].main.temp - 273.15) * 1.80 + 32;
        var tempRound = forecastTemp.toFixed(2);
        var forecastHumidity = forecastResponse.list[0].main.humidity;
        $(".day-1").text(moment(dayOne).format("MMMM Do" + ", " + "YYYY"));
        $("#wicon-1").attr("src", forecastIcon);
        $(".temp-card-1").text(tempRound + " °F");
        $(".humidity-card-1").text("Humidity: " + forecastHumidity + "%");

    })
});
}

initPage ();

// Event listener is breaking 
// $('#submit-button').on('click', function () {
//     console.log("hit");
//     $('#current-search').empty();
//     var city = $('#search-term').val();
//     var APIKey = "&appid=3f2c167c8daff8f6c0523b5e972f1c83"

//     var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + APIKey;
// }