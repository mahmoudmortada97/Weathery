// Step 1: Get user coordinates
function getCoordintes() {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    var lat = crd.latitude.toString();
    var lng = crd.longitude.toString();
    var coordinates = [lat, lng];
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    getCity(coordinates);
    return;
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name
function getCity(coordinates) {
  var xhr = new XMLHttpRequest();
  var lat = coordinates[0];
  var lng = coordinates[1];

  // Paste your LocationIQ token below.
  xhr.open(
    "GET",
    `
https://us1.locationiq.com/v1/reverse.php?key=pk.fee98d8c991be6288de6d3e8b0efb922&lat=` +
      lat +
      "&lon=" +
      lng +
      "&format=json",
    true
  );
  xhr.send();
  xhr.onreadystatechange = processRequest;
  xhr.addEventListener("readystatechange", processRequest, false);

  function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      var city = response.address.city;
      console.log(city);
      return;
    }
  }
}

let userCity = getCoordintes();

const weatherApplication = document;
const searchInput = weatherApplication.querySelector("#search");
const cityLocation = weatherApplication.querySelector("#location");
const currentDate = weatherApplication.querySelector("#date");
const currentTemperature = weatherApplication.querySelector(
  "#current-temperature__value"
);
const currentTemperatureText = weatherApplication.querySelector(
  "#current-temperature__summary"
);
const currentTemperatureIconContainer = weatherApplication.querySelector(
  "#current-temperature__icon-container"
);
const currentHighestTemperature = weatherApplication.querySelector(
  "#currentHighestTemperature"
);
const currentLowestTemperature = weatherApplication.querySelector(
  "#currentLowestTemperature"
);
const currentWind = weatherApplication.querySelector("#currentWind");
const currentRainPercentage = weatherApplication.querySelector(
  "#currentRainPercent"
);
const currentSunrise = weatherApplication.querySelector("#currentSunrise");
const currentSunset = weatherApplication.querySelector("#currentSunset");

const _3am = weatherApplication.querySelector("#_3am");
const _3amTemperatue = weatherApplication.querySelector("#_3amTemp");
const _3amTemperatueText = weatherApplication.querySelector("#_3amTempText");

const _6am = weatherApplication.querySelector("#_6am");
const _6amTemperatue = weatherApplication.querySelector("#_6amTemp");
const _6amTemperatueText = weatherApplication.querySelector("#_6amTempText");

const _9am = weatherApplication.querySelector("#_9am");
const _9amTemperatue = weatherApplication.querySelector("#_9amTemp");
const _9amTemperatueText = weatherApplication.querySelector("#_9amTempText");

const _12pm = weatherApplication.querySelector("#_12pm");
const _12pmTemperatue = weatherApplication.querySelector("#_12pmTemp");
const _12pmTemperatueText = weatherApplication.querySelector("#_12pmTempText");

const _3pm = weatherApplication.querySelector("#_3pm");
const _3pmTemperatue = weatherApplication.querySelector("#_3pmTemp");
const _3pmTemperatueText = weatherApplication.querySelector("#_3pmTempText");

const _6pm = weatherApplication.querySelector("#_6pm");
const _6pmTemperatue = weatherApplication.querySelector("#_6pmTemp");
const _6pmTemperatueText = weatherApplication.querySelector("#_6pmTempText");

const _9pm = weatherApplication.querySelector("#_9pm");
const _9pmTemperatue = weatherApplication.querySelector("#_9pmTemp");
const _9pmTemperatueText = weatherApplication.querySelector("#_9pmTempText");

let searchedCity = "";

try {
  searchInput.addEventListener("input", async function (e) {
    searchedCity = searchInput.value;
    await getWeatherInfo(searchedCity || userCity);
  });
} catch (error) {
  console.log("error please wait");
}
const forecastHTTP = new XMLHttpRequest();

//**Main Entry Point */
(async function () {
  // searchCity();
  await getWeatherInfo(searchedCity || "alex");
})();

async function getWeatherInfo(city) {
  let weather;
  try {
    weather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=47941096b86d4f388bc140500232202&q=${city}&days=6&aqi=no&alerts=no`
    );
  } catch (error) {
    console.log("eroor");
  }
  let weatherInfo = await weather.json();
  await displayweather(weatherInfo);
}

async function displayweather(weatherInfo) {
  if (weatherInfo.location) {
    const dayObject = new Date(weatherInfo.location.localtime);

    currentDay = {
      city: weatherInfo.location.name,
      day: getSpecificDay(dayObject.getDay()),
      country: weatherInfo.location.country,
      date: weatherInfo.location.localtime,
      temperatue: weatherInfo.current.temp_c,
      temperatueText: weatherInfo.current.condition.text,
      temperatueImage: weatherInfo.current.condition.icon,
      highestTemperatue: weatherInfo.forecast.forecastday[0].day.maxtemp_c,
      lowestTemperatue: weatherInfo.forecast.forecastday[0].day.mintemp_c,
      wind: weatherInfo.current.wind_mph,
      rainPercentage:
        weatherInfo.forecast.forecastday[0].day.daily_chance_of_rain,
      sunrise: weatherInfo.forecast.forecastday[0].astro.sunrise,
      sunset: weatherInfo.forecast.forecastday[0].astro.sunset,
      weather3am: {
        temperatue: weatherInfo.forecast.forecastday[0].hour[3].temp_c,

        temperatueText:
          weatherInfo.forecast.forecastday[0].hour[3].condition.text,
        temperatueImage:
          weatherInfo.forecast.forecastday[0].hour[3].condition.icon,
      },
      weather6am: {
        temperatue: weatherInfo.forecast.forecastday[0].hour[6].temp_c,

        temperatueText:
          weatherInfo.forecast.forecastday[0].hour[6].condition.text,
        temperatueImage:
          weatherInfo.forecast.forecastday[0].hour[6].condition.icon,
      },
      weather9am: {
        temperatue: weatherInfo.forecast.forecastday[0].hour[9].temp_c,

        temperatueText:
          weatherInfo.forecast.forecastday[0].hour[9].condition.text,
        temperatueImage:
          weatherInfo.forecast.forecastday[0].hour[9].condition.icon,
      },
      weather12pm: {
        temperatue: weatherInfo.forecast.forecastday[0].hour[12].temp_c,

        temperatueText:
          weatherInfo.forecast.forecastday[0].hour[12].condition.text,
        temperatueImage:
          weatherInfo.forecast.forecastday[0].hour[12].condition.icon,
      },
      weather3pm: {
        temperatue: weatherInfo.forecast.forecastday[0].hour[15].temp_c,

        temperatueText:
          weatherInfo.forecast.forecastday[0].hour[15].condition.text,
        temperatueImage:
          weatherInfo.forecast.forecastday[0].hour[15].condition.icon,
      },
      weather6pm: {
        temperatue: weatherInfo.forecast.forecastday[0].hour[18].temp_c,

        temperatueText:
          weatherInfo.forecast.forecastday[0].hour[18].condition.text,
        temperatueImage:
          weatherInfo.forecast.forecastday[0].hour[18].condition.icon,
      },
      weather9pm: {
        temperatue: weatherInfo.forecast.forecastday[0].hour[21].temp_c,

        temperatueText:
          weatherInfo.forecast.forecastday[0].hour[21].condition.text,
        temperatueImage:
          weatherInfo.forecast.forecastday[0].hour[21].condition.icon,
      },
    };
  }

  currentTemperatureIconContainer.innerHTML = `<img src="${currentDay.temperatueImage}" class="w-100"/>`;
  cityLocation.innerText = `${currentDay.city}, ${currentDay.country}`;
  currentDate.innerHTML = `${currentDay.day}, ${currentDay.date}`;
  currentTemperature.innerText = `${currentDay.temperatue} \u00B0`;
  currentTemperatureText.innerText = `${currentDay.temperatueText}`;
  currentHighestTemperature.innerText = `${currentDay.highestTemperatue} \u00B0`;
  currentLowestTemperature.innerText = `${currentDay.lowestTemperatue} \u00B0`;
  currentWind.innerText = `${currentDay.wind}mph`;
  currentRainPercentage.innerText = `${currentDay.rainPercentage} %`;
  currentSunrise.innerText = `${currentDay.sunrise}`;
  currentSunset.innerText = `${currentDay.sunset}`;

  // for (let i = 3; i < ; i += 3) {
  //   const element = array[i];
  // }

  _3am.innerHTML = `<img src="${currentDay.weather3am.temperatueImage}" class="img-fluid"/>`;
  _3amTemperatueText.innerText = `${currentDay.weather3am.temperatueText}`;
  _3amTemperatue.innerText = `${currentDay.weather3am.temperatue} \u00B0`;

  _6am.innerHTML = `<img src="${currentDay.weather6am.temperatueImage}" class="img-fluid"/>`;
  _6amTemperatueText.innerText = `${currentDay.weather6am.temperatueText}`;
  _6amTemperatue.innerText = `${currentDay.weather6am.temperatue} \u00B0`;

  _9am.innerHTML = `<img src="${currentDay.weather9am.temperatueImage}" class="img-fluid"/>`;
  _9amTemperatueText.innerText = `${currentDay.weather9am.temperatueText}`;
  _9amTemperatue.innerText = `${currentDay.weather9am.temperatue} \u00B0`;

  _12pm.innerHTML = `<img src="${currentDay.weather12pm.temperatueImage}" class="img-fluid"/>`;
  _12pmTemperatueText.innerText = `${currentDay.weather12pm.temperatueText}`;
  _12pmTemperatue.innerText = `${currentDay.weather12pm.temperatue} \u00B0`;

  _3pm.innerHTML = `<img src="${currentDay.weather3pm.temperatueImage}" class="img-fluid"/>`;
  _3pmTemperatueText.innerText = `${currentDay.weather3pm.temperatueText}`;
  _3pmTemperatue.innerText = `${currentDay.weather3pm.temperatue} \u00B0`;

  _6pm.innerHTML = `<img src="${currentDay.weather6pm.temperatueImage}" class="img-fluid"/>`;
  _6pmTemperatueText.innerText = `${currentDay.weather6pm.temperatueText}`;
  _6pmTemperatue.innerText = `${currentDay.weather6pm.temperatue} \u00B0`;

  _9pm.innerHTML = `<img src="${currentDay.weather9pm.temperatueImage}" class="img-fluid"/>`;
  _9pmTemperatueText.innerText = `${currentDay.weather9pm.temperatueText}`;
  _9pmTemperatue.innerText = `${currentDay.weather9pm.temperatue} \u00B0`;

  //** */
  console.log(weatherInfo);
}

function getSpecificDay(num) {
  switch (num) {
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
  }
}
// const xmas95 = new Date("2023-02-27 23:15:30");
// const weekday = xmas95.getDay();

// const options = { weekday: "long" };
// console.log(new Intl.DateTimeFormat("en-US", options).format(xmas95));
// // Monday
// console.log(new Intl.DateTimeFormat("de-DE", options).format(xmas95));
// // Montag
