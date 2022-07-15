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
