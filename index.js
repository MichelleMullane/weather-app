// Display the current time upon loading the page:
function displayDate(timeStamp) {
  let date = new Date(timeStamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${currentDay}, ${time}`;
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "08010f9a1b70b38b765f2b921b8d7364";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

// Display the weather upon clicking the search button
function displaySearchWeather(response) {
  fahrenheitTemperature = response.data.main.temp;

  // Display the current day & time
  document.querySelector("#day-time").innerHTML = displayDate(
    response.data.dt * 1000
  );

  // Displayed searched city
  document.querySelector("#location").innerHTML = response.data.name;

  // Display weather icon
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  // Set temperature
  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );

  // Set daily high & low
  document.querySelector("#high-temp-value").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp-value").innerHTML = Math.round(
    response.data.main.temp_min
  );

  // Set humidity
  document.querySelector("#humidity-value").innerHTML =
    response.data.main.humidity;

  // Set feels like
  document.querySelector("#feels-like-value").innerHTML = Math.round(
    response.data.main.feels_like
  );

  // Set wind speed
  document.querySelector("#wind-speed-value").innerHTML = Math.round(
    response.data.wind.speed
  );

  // Set weather description
  let weatherDescription = response.data.weather[0].description;
  let currentDescriptionElement = document.querySelector(
    "#current-weather-description"
  );
  currentDescriptionElement.innerHTML = weatherDescription;

  getForecast(response.data.coord);
}

// Send API request for default or searched city
function searchCity(city) {
  let apiKey = "08010f9a1b70b38b765f2b921b8d7364";
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displaySearchWeather);
}

function handleSearchButton(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#location-input").value;
  searchCity(inputCity);
}

// Display the weather at the user's location
function handlePosition(position) {
  let apiKey = "08010f9a1b70b38b765f2b921b8d7364";
  let units = "imperial";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displaySearchWeather);
}

function findUser() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
                    <div class="col five-day">
                      <ul>
                        <li>${formatDay(forecastDay.dt)}</li>
                        <li>
                          <img
                            src="http://openweathermap.org/img/wn/${
                              forecastDay.weather[0].icon
                            }@2x.png"
                            alt="Weather icon"
                            width="42"
                        </li>
                        <li class="forecast-high-temp">H: ${Math.round(
                          forecastDay.temp.max
                        )}°F</li>
                        <li class="forecast-low-temp">L: ${Math.round(
                          forecastDay.temp.min
                        )}°F</li>
                      </ul>
                    </div>
`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let fahrenheitTemperature = null;

// Display the name of the searched city
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSearchButton);

// Display the weather at the user's location & display the user's location
let currentLocationSearch = document.querySelector("#current-location");
currentLocationSearch.addEventListener("click", findUser);

// Display default weather upon page loading
searchCity("Denver");
