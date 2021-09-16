function showWeather(response) {
  console.log(response);
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "#main-weather-picture"
  ).src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
}

function searchCity(city) {
  let apiKey = "a6e2395246505358e7bef9273f106845";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a6e2395246505358e7bef9273f106845";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function convertToFahrenheit() {
  let city = document.querySelector("#city");
  city = city.innerHTML;
  let apiKey = "a6e2395246505358e7bef9273f106845";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function goBackToCelcius() {
  let city = document.querySelector("#city");
  city = city.innerHTML;
  let apiKey = "a6e2395246505358e7bef9273f106845";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let fahrenheitTemperature = document.querySelector("#fahrenheit-temperature");
fahrenheitTemperature.addEventListener("click", convertToFahrenheit);

let celciusTemperature = document.querySelector("#celcius-temperature");
celciusTemperature.addEventListener("click", goBackToCelcius);

let searchCityWeather = document.querySelector("#search-form");
searchCityWeather.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function formatDate(date) {
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
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay} ${currentHour}:${currentMinutes}`;
}

let currentTimeAndDay = document.querySelector("#current-time");
let timeNow = new Date();
currentTimeAndDay.innerHTML = formatDate(timeNow);

searchCity("Warsaw");
