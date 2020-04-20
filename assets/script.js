// Input field for city (Bootstrap)
// Div that will populate with the current forecast for input city
    // Divs inside that will house various bits of information
// 5 Cards will populate underneath that will update with the 5 day forecast (seperate API)
// Need moment.js

var cityID = "houston";
var APIKey = "&appid=3f2c167c8daff8f6c0523b5e972f1c83"

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityID + APIKey;

// Initial function
function initPage () {
// AJAX call for current forecast
$.ajax({
    url: queryURL,
    method:"GET"
}).then(function(response) {
    console.log(response);
// Variables being defined for data retrieved from the response object
    var cityName = response.name;
    var currentDate = moment().format("MMMM Do" + ", " + "YYYY");
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed + " MPH";
    console.log(cityName);
    console.log(currentDate);
    console.log(tempF);
    console.log(humidity);
    console.log(windSpeed);
// Lat and lon values obtained from first ajax call response
    var lat = response.coord.lat;
    var lon = response.coord.lon;
// Another API to get UV Index using the lat and lon values from first response
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + lat + "&lon=" + lon;
// Second ajax call
    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function(uvResponse) {
        console.log(uvResponse);

        var uvIndex = uvResponse.value;
    
    $(".city-id").text(cityName + " " + currentDate);
    $(".temp").text(tempF);
    $(".humidity").text(humidity);
    $(".wind").text(windSpeed);
    $(".uv").text(uvIndex);
    })
});



}

initPage ();






// // Var for city
// var city = "austin";
// // queryURL defined for 5 day forecast
// var query = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKey;
// // AJAX call
// $.ajax({
//     url: query,
//     method:'GET'
// }).then(function(response){
//     console.log(response);
// });