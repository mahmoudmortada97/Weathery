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

const weatherByHourContainerList = weatherApplication.querySelector(
  ".weather-by-hour__container"
);

// ******************************** Self Invoke Function ******************************** //
//! To Make Section of Today's weather in Js
(() => {
  let weatherByHourContainerListCartona = ``;
  let time = 3;
  let timeperiod = "am";
  for (let i = 0; i < 7; i++) {
    if (time < 11) {
      weatherByHourContainerListCartona += ` <div class="weather-by-hour__item">
    <div class="weather-by-hour__hour">${time}${timeperiod}</div>
    <div class="weather-by-hour__hour-image" id="_${time}${timeperiod}"></div>

    <div id="_${time}${timeperiod}TempText"></div>
    <div id="_${time}${timeperiod}Temp"></div>
  </div>`;
      time += 3;
    } else if (time == 12) {
      timeperiod = "pm";
      weatherByHourContainerListCartona += ` <div class="weather-by-hour__item">
    <div class="weather-by-hour__hour">${time}${timeperiod}</div>
    <div class="weather-by-hour__hour-image" id="_${time}${timeperiod}"></div>

    <div id="_${time}${timeperiod}TempText"></div>
    <div id="_${time}${timeperiod}Temp"></div>
  </div>`;
      time = 3;
    } else {
      weatherByHourContainerListCartona += ` <div class="weather-by-hour__item">
    <div class="weather-by-hour__hour">${time}${timeperiod}</div>
    <div class="weather-by-hour__hour-image" id="_${time}${timeperiod}"></div>

    <div id="_${time}${timeperiod}TempText"></div>
    <div id="_${time}${timeperiod}Temp"></div>
  </div>`;
    }
  }
  weatherByHourContainerList.innerHTML = weatherByHourContainerListCartona;
})();
// ******************************** Self Invoke Function ******************************** //

// ******************************** Today's Weather  ******************************** //

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
// ******************************** Today's Weather  ******************************** //

// ******************************** Next 5 Days Weather  ******************************** //

const nextDaysList = weatherApplication.querySelectorAll(".next-5-days__date");
const nextDaysListLowTemp =
  weatherApplication.querySelectorAll(".next-5-days__low");

const nextDaysListHighTemp =
  weatherApplication.querySelectorAll(".next-5-days__high");

const nextDaysListRain =
  weatherApplication.querySelectorAll(".next-5-days__rain");

const nextDaysListIcon =
  weatherApplication.querySelectorAll(".next-5-days__icon");

const nextDaysListWind =
  weatherApplication.querySelectorAll(".next-5-days__wind");

// ******************************** Next 5 Days Weather  ******************************** //

const forecastHTTP = new XMLHttpRequest();

// ******************************** Main Entry Point To Application ******************************** //

(async function () {
  let searchedCity = "";
  //? When User Start Typing in Search Input
  searchInput.addEventListener("input", async function (e) {
    searchedCity = searchInput.value;
    await getweatherData(searchedCity || "alex");
  });
  //? When User Start Typing in Search Input

  // searchCity();
  await getweatherData(searchedCity || "alex");
})();

async function getweatherData(city) {
  let weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=47941096b86d4f388bc140500232202&q=${city}&days=6&aqi=no&alerts=no`
  );
  let weatherData = await weather.json();
  await displayweather(weatherData);
}

function displayweather(weatherData) {
  if (weatherData.location) {
    console.log(weatherData);
    const dayObject = new Date(weatherData.location.localtime);

    currentDay = {
      city: weatherData.location.name,
      day: getDayName(dayObject.getDay()),
      country: weatherData.location.country,
      date: weatherData.location.localtime,
      temperatue: weatherData.current.temp_c,
      temperatueText: weatherData.current.condition.text,
      temperatueImage: weatherData.current.condition.icon,
      highestTemperatue: weatherData.forecast.forecastday[0].day.maxtemp_c,
      lowestTemperatue: weatherData.forecast.forecastday[0].day.mintemp_c,
      wind: weatherData.current.wind_mph,
      rainPercentage:
        weatherData.forecast.forecastday[0].day.daily_chance_of_rain,
      sunrise: weatherData.forecast.forecastday[0].astro.sunrise,
      sunset: weatherData.forecast.forecastday[0].astro.sunset,
      weather3am: {
        temperatue: weatherData.forecast.forecastday[0].hour[3].temp_c,

        temperatueText:
          weatherData.forecast.forecastday[0].hour[3].condition.text,
        temperatueImage:
          weatherData.forecast.forecastday[0].hour[3].condition.icon,
      },
      weather6am: {
        temperatue: weatherData.forecast.forecastday[0].hour[6].temp_c,

        temperatueText:
          weatherData.forecast.forecastday[0].hour[6].condition.text,
        temperatueImage:
          weatherData.forecast.forecastday[0].hour[6].condition.icon,
      },
      weather9am: {
        temperatue: weatherData.forecast.forecastday[0].hour[9].temp_c,

        temperatueText:
          weatherData.forecast.forecastday[0].hour[9].condition.text,
        temperatueImage:
          weatherData.forecast.forecastday[0].hour[9].condition.icon,
      },
      weather12pm: {
        temperatue: weatherData.forecast.forecastday[0].hour[12].temp_c,

        temperatueText:
          weatherData.forecast.forecastday[0].hour[12].condition.text,
        temperatueImage:
          weatherData.forecast.forecastday[0].hour[12].condition.icon,
      },
      weather3pm: {
        temperatue: weatherData.forecast.forecastday[0].hour[15].temp_c,

        temperatueText:
          weatherData.forecast.forecastday[0].hour[15].condition.text,
        temperatueImage:
          weatherData.forecast.forecastday[0].hour[15].condition.icon,
      },
      weather6pm: {
        temperatue: weatherData.forecast.forecastday[0].hour[18].temp_c,

        temperatueText:
          weatherData.forecast.forecastday[0].hour[18].condition.text,
        temperatueImage:
          weatherData.forecast.forecastday[0].hour[18].condition.icon,
      },
      weather9pm: {
        temperatue: weatherData.forecast.forecastday[0].hour[21].temp_c,

        temperatueText:
          weatherData.forecast.forecastday[0].hour[21].condition.text,
        temperatueImage:
          weatherData.forecast.forecastday[0].hour[21].condition.icon,
      },
    };
    nextDays = {
      days: weatherData.forecast.forecastday,
    };

    for (let i = 0; i < nextDays.days.length - 1; i++) {
      let dayObject = new Date(nextDays.days[i + 1].date)
        .toDateString()
        .split(" ");

      nextDaysList[i].innerText = dayObject[0];
      nextDaysListLowTemp[i].innerText = `${
        nextDays.days[i + 1].day.mintemp_c
      }\u00B0`;
      nextDaysListHighTemp[i].innerText = `${
        nextDays.days[i + 1].day.maxtemp_c
      }\u00B0`;
      nextDaysListRain[i].innerText = `${
        nextDays.days[i + 1].day.daily_chance_of_rain
      }%`;
      nextDaysListIcon[i].innerHTML = `<img src="${
        nextDays.days[i + 1].day.condition.icon
      }" class =""img-fluid></img>
      `;
      nextDaysListWind[i].innerText = `${
        nextDays.days[i + 1].day.maxwind_mph
      }mph`;
    }
    currentTemperatureIconContainer.innerHTML = `<img src="${currentDay.temperatueImage}" class="w-100"/>`;
    cityLocation.innerText = `${currentDay.city}, ${currentDay.country}`;
    currentDate.innerHTML = `${currentDay.day}, ${currentDay.date}`;
    currentTemperature.innerText = `${currentDay.temperatue}\u00B0`;
    currentTemperatureText.innerText = `${currentDay.temperatueText}`;
    currentHighestTemperature.innerText = `${currentDay.highestTemperatue} \u00B0`;
    currentLowestTemperature.innerText = `${currentDay.lowestTemperatue} \u00B0`;
    currentWind.innerText = `${currentDay.wind}mph`;
    currentRainPercentage.innerText = `${currentDay.rainPercentage}%`;
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
  }
  //** */
  // console.log(weatherData);
}

function getDayName(num) {
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
