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


function searchCity(city){
  let apiKey = "32b1356da0b65f877b0f297ff829102a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response){
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#main-temperature") = `${response.data.main.temp}°`;
}

function searchSubmit(event){
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Tokyo");


//Temperature
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


