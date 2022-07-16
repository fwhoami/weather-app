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

let now = new Date();
let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = formatDate(now);

function searchSubmit(event){
  event.preventDefault();
  let cityElement = document.querySelector("#city-search");
  cityElement.innerHTML = cityInput.value;
}
let searchCity = document.querySelector("#city-search-form");
searchCity.addEventListener("submit", searchCity);


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
