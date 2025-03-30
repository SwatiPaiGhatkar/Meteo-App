function displayWeather(response) {
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let currentCityElement = document.querySelector("#current-city");
  currentCityElement.innerHTML = response.data.city;
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
