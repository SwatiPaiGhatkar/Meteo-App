function displayWeather(response) {
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = response.data.temperature.current.toFixed(1);

  let currentCityElement = document.querySelector("#current-city");
  currentCityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `${response.data.temperature.feels_like}°C`;

  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="emojie" />`;
  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "0d020a074f787obb6e00f25733t5d32d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearchData(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchData);

function getForecast(city) {
  let apiKey = "0d020a074f787obb6e00f25733t5d32d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
  axios(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forecast-week">
            <div class="weather-forecast-day">Tue</div>
            <div >
            <img src= "${
              day.condition.icon_url
            }" class="weather-forecast-icon"/>
            </div>
            <div class="weather-forecast-temp">
              <div class="weather-forecast-temperature">
                <strong>${day.temperature.maximum.toFixed(1)}°</strong>
              </div>
              <div class="weather-forecast-temperature">${day.temperature.maximum.toFixed(
                1
              )}°</div>
            </div>
          </div>   
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Melbourne");

displayForecast();
