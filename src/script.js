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


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


//Search_button
function searchCity(city){
  let apiKey = "32b1356da0b65f877b0f297ff829102a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  
  axios.get(apiUrl).then(displayWeather);
}

//Update weather display

function getForecast(coordinates) {
  let apiKey = "32b1356da0b65f877b0f297ff829102a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}

function showWeatherForecast(response) {
  let forecast = response.data.daily;
  weatherForecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        ${formatDay(forecastDay.dt)} 
              <img src="images/media/${
                forecastDay.weather[0].icon
              }.png" width="60" class="image-fluid" id="forecast-icon />
              <span class="forecast-temperature">${Math.round(
                forecastDay.temp.day
              )}°C</span>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  weatherForecastElement.innerHTML = forecastHTML;
}

//Current location 
function showPosition(position) {
  let apiKey = "32b1356da0b65f877b0f297ff829102a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}


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

  showPosition(response.data.coord);

}


function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}


//display temperature
function getFahrenheitTemp(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#main-temperature").innerHTML = Math.round(fahrenheitTemp);
}

function getCelsiusTemp(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#main-temperature").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


//Event listeners
let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", searchSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", getFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", getCelsiusTemp);

let buttonLocal = document.querySelector("#local-button");
buttonLocal.addEventListener("click", getCurrentPosition);


searchCity("Kyiv");
