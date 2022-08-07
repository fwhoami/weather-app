function formatDate(date){
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let dayIndex = date.getDay();
    let day = days[dayIndex];

    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    let currentDate = date.getDate();
    let monthIndex = date.getMonth();
    let month = months[monthIndex];

    return `${day}, ${currentDate} ${month}`;
}


function formatTime(date) {
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hour}:${minutes}`;
}


let now = new Date();
let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = formatDate(now);
let timeElement = document.querySelector("#current-time");
timeElement.innerHTML = formatTime(now);


//Search_button
function searchCity(city){
  let apiKey = "32b1356da0b65f877b0f297ff829102a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  
  axios.get(apiUrl).then(displayWeather);
}

//Local_button
function showPosition(position) {
  let apiKey = "32b1356da0b65f877b0f297ff829102a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonLocal = document.querySelector("#local-button");
buttonLocal.addEventListener("click", getCurrentPosition);


function displayWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = `${celsiusTemperature}°`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let mainIcon = response.data.weather[0].icon;
  document
    .querySelector("#main-icon")
    .setAttribute("src", `images/media/${mainIcon}.png`);
  document
    .querySelector("#main-icon")
    .setAttribute("alt", `${response.data.weather[0].description}`);

  showPosition(response.data.coords);

}


function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Kyiv");



//display temperature
function getFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#main-temperature");
  currentTemp.innerHTML = `50°`;
}

function getCelsiusTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#main-temperature");
  currentTemp.innerHTML = `17°`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", getFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", getCelsiusTemp);


//Weakly Forecast

let weaklyElement = document.innerHTML("forecast-temp");
