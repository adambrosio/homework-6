// Input field for city (Bootstrap)
// Div that will populate with the current forecast for input city
// 5 Cards will populate underneath that will update with the 5 day forecast (seperate API)
    // Both will need moment.js


var cityID = "houston";
var APIKey = "&appid=3f2c167c8daff8f6c0523b5e972f1c83"

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityID + APIKey;
// AJAX call for current forecast
$.ajax({
    url: queryURL,
    method:'GET'
}).then(function(response) {
    console.log(response);
});








// // Var for city
// var city = "austin";
// // queryURL defined for 5 day forecast
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&appid=3f2c167c8daff8f6c0523b5e972f1c83";
// // AJAX call
// $.ajax({
//     url: queryURL,
//     method:'GET'
// }).then(function(response){
//     console.log(response);
// });