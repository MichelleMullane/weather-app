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

// Display the weather upon clicking the search button
function displaySearchWeather(response) {
  console.log(response);
  // Display the current day & time
  document.querySelector("#day-time").innerHTML = displayDate(
    response.data.dt * 1000
  );

  // Displayed searched city
  document.querySelector("#location").innerHTML = response.data.name;

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

// Display the temperature in Celsius
function displayCelsius(event) {
  event.preventDefault();

  let fahrenheitTemp = 82;
  let celsiusTemp = (fahrenheitTemp - 32) * (5 / 9);
  celsiusTemp = Math.round(celsiusTemp);

  let tempDisplay = document.querySelector("#temp-value");
  tempDisplay.innerHTML = celsiusTemp;

  let unitsDisplay = document.querySelector("#units-display");
  unitsDisplay.innerHTML = "°C";

  let unitsElement = document.querySelector("span#units-display");
  unitsElement.classList.add("shift-right");
}

let selectCelsiusUnits = document.querySelector("#select-celsius");
selectCelsiusUnits.addEventListener("click", displayCelsius);

// Display the name of the searched city
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSearchButton);

// Display the weather at the user's location & display "Your Location"
let currentLocationSearch = document.querySelector("#current-location");
currentLocationSearch.addEventListener("click", findUser);

// Display default weather upon page loading
searchCity("Denver");
