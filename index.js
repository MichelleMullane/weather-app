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

// Display the motivational text
function displayQuote(weatherCondition) {
  if (weatherCondition === "Thunderstorm") {
    return `"When you come out of the storm, you won’t be the same person who walked in. That’s what this storm’s all about." <br /> -Haruki Murakami`;
  }

  if (weatherCondition === "Drizzle") {
    return `"And when it rains on your parade, look up rather than down. Without the rain, there would be no rainbow." <br /> -Gilbert K. Chesterton`;
  }

  if (weatherCondition === "Rain") {
    return `"The way I see it, if you want the rainbow, you got to put up with the rain." <br /> -Dolly Parton`;
  }

  if (weatherCondition === "Snow") {
    return `"Kindness is like snow—it beautifies everything it covers." <br /> -Kahlil Gibran`;
  }

  if (weatherCondition === "Mist") {
    return `"As I stood and watched the mists slowly rising this morning I wondered what view was more beautiful than this." <br /> -Hal Borland`;
  }

  if (weatherCondition === "Smoke") {
    return `"Love is a smoke made with the fume of sighs." <br /> -William Shakespeare`;
  }

  if (weatherCondition === "Haze") {
    return `"Romance is the glamour which turns the dust of everyday life into a golden haze." <br /> -Carolyn Gold Heilbrun`;
  }

  if (weatherCondition === "Dust") {
    return `"You may write me down in history with your bitter, twisted lines. You may trod me in the very dirt, but still, like dust, I'll rise." <br /> -Maya Angelou`;
  }

  if (weatherCondition === "Fog") {
    return `"I like the muted sounds, the shroud of grey, and the silence that comes with fog." <br /> -Om Malik`;
  }

  if (weatherCondition === "Sand") {
    return `"To see a world in a grain of sand and heaven in a wild flower <br />Hold infinity in the palm of your hand and eternity in an hour." <br /> -William Blake`;
  }

  if (weatherCondition === "Ash") {
    return `"Our passions are the true phoenixes; when the old one is burnt out, a new one rises from its ashes." <br /> -Johann Wolfgang von Goethe`;
  }

  if (weatherCondition === "Squall") {
    return `"The elderly have weathered enough squalls to know that this one, too, shall pass." <br /> -Sarah Ferguson`;
  }

  if (weatherCondition === "Tornado") {
    return `"At the heart of the cyclone tearing the sky is a place of central calm." <br /> -Edwin Markham`;
  }

  if (weatherCondition === "Clear") {
    return `"Look at the sunny side of everything." <br /> -Christian D. Larson`;
  }

  if (weatherCondition === "Clouds") {
    return `"A cloudy day is no match for a sunny disposition." <br /> -William Arthur Ward`;
  }
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

  // Set motivational text
  document.querySelector("#motivation-text").innerHTML = displayQuote(
    response.data.weather[0].main
  );

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

// Display the name of the searched city
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSearchButton);

// Display the weather at the user's location & display the user's location
let currentLocationSearch = document.querySelector("#current-location");
currentLocationSearch.addEventListener("click", findUser);

// Display default weather upon page loading
searchCity("Denver");
