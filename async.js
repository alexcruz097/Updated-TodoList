const apiKey = "2581791d99f34ca0bc260840202008";
const cityName = document.querySelector(".city-name");
const submitBTN = document.querySelector(".submitBTN");
const weatherContainer = document.querySelector(".weather-container");
let forecastContainer = document.querySelector(".forecast-date-container");
forecastContainer = "";
// template literal
const template = (data) => {
  return `<div class="name h3">${data.location.name}</div>
  <p class = "text-primary">${data.location.country}</p>
   <div class="condition row align-items-center">
            <div class="col-6">
              <p class = "condition-text h3">${data.current.condition.text}</p>
              <p>Chance of rain: ${
                data.forecast.forecastday[0].day.daily_chance_of_rain
              }%</p>
              <p class="temperature h2">${data.current.feelslike_f}F</p>
            </div>
            <div class="col-6">
              <img
                class="current-weather-img"
                src= ${data.current.condition.icon}
                alt=""
                srcset=""
              />
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <ul class="row hourly-container">
              <p>Todays Forecaset</p>
              <li class="col d-flex flex-column align-items-center border-end">
                <p>6:00AM</p>
                <img
                  src=${data.forecast.forecastday[0].hour[6].condition.icon}
                  alt=""
                  srcset=""
                />
                <p>${data.forecast.forecastday[0].hour[6].temp_f}F</p>
              </li>
              <li class="col d-flex flex-column align-items-center border-end">
                <p>9:00AM</p>
                <img
                  src=${data.forecast.forecastday[0].hour[9].condition.icon}
                  alt=""
                  srcset=""
                />
                <p>${data.forecast.forecastday[0].hour[9].temp_f}F</p>
              </li>
              <li class="col d-flex flex-column align-items-center border-end">
                <p>12:00PM</p>
                <img
                  src=${data.forecast.forecastday[0].hour[12].condition.icon}
                  alt=""
                  srcset=""
                />
                <p>${data.forecast.forecastday[0].hour[12].temp_f}F</p>
              </li>
              <li class="col d-flex flex-column align-items-center border-end">
                <p>3:00PM</p>
                <img
                  src=${data.forecast.forecastday[0].hour[15].condition.icon}
                  alt=""
                  srcset=""
                />
                <p>${data.forecast.forecastday[0].hour[15].temp_f}F</p>
              </li>
              <li class="col d-flex flex-column align-items-center">
                <p>9:00PM</p>
                <img
                  src=${data.forecast.forecastday[0].hour[21].condition.icon}
                  alt=""
                  srcset=""
                />
                <p>${data.forecast.forecastday[0].hour[21].temp_f}F</p>
              </li>
            </ul>
          </div>
          <div class="col d-flex justify-content-center">
            <div class="row condition-container">
              <p>Air condition</p>
              <div class="d-flex justify-content-between">
                
                <div class="text-center">
                  <p>Chance of Rain</p>
                  <h6>${
                    data.forecast.forecastday[0].day.daily_chance_of_rain
                  }%</h6>
                </div>
                <div class="text-center">
                  <p>Chance of Snow</p>
                  <h6>${
                    data.forecast.forecastday[0].day.daily_chance_of_snow
                  }%</h6>
                </div>

              </div>
              <div class="d-flex justify-content-between">
                <div class="text-center">
                  <p>Wind</p>
                  <h6>${data.current.gust_mph}/MPH</h6>
                </div>
                <div class="text-center">
                  <p>UV Index</p>
                  <h6>${data.current.uv}</h6>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 d-flex flex-column mt-3 forecast-container">
            <p>3-Day Forecast</p>
            ${data.forecast.forecastday.forEach((day, index) => {
              forecastContainer += ` <div
              class="border-bottom d-flex flex-fill justify-content-around align-items-center"
            >
              <p class="forecast-date">Date:${day.date}</p>
              <div class="d-flex flex-row align-items-center">
                <img
                  class="d-flex"
                  src=${day.day.condition.icon}
                />
                <p class="forcase-weather">Sunny</p>
              </div>
              <p>${day.day.maxtemp_f}/${day.day.mintemp_f}</p>
            </div>;`;
            })}
      ${(forecastContainer.innerHTML = forecastContainer)}
         </div>
            `
};

const getWeather = async (lat, lang) => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lang}&days=3&aqi=no&alerts=no`
    );
    if (!response.ok) {
      throw new Error("Could not fetch resources");
    }
    const data = await response.json();
    console.log(data);
    weatherContainer.textContent = "";
    weatherContainer.innerHTML = template(data);
    // add a pop up to show the city
    let popup = L.popup()
      .setLatLng([lat, lang])
      .setContent(`City: ${data.location.name}`)
      .openOn(map);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 11,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  } catch (error) {
    console.log("Error fetching weater data: ", error);
  }
};
getWeather("34.2231026552273,-118.4499407360982");
// add submitBTN
submitBTN.addEventListener("click", () => {
  forecastContainer = "";
  getWeather(cityName.value);

  // clear city name
  cityName.value = "";
});
// map
let map = L.map("map").setView(
  [34.05686661570721, -118.24082839364304, (draggable = false)],
  13
);
let marker = L.marker([34.05686661570721, -118.24082839364304]).addTo(map);
let popup = L.popup()
  .setLatLng([34.05686661570721, -118.24082839364304])
  .setContent("Click on the city")
  .openOn(map);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 11,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
// when map is clicked
function onMapClick(e) {
  map.removeLayer(marker);
  // call function to get data
  forecastContainer = "";

  getWeather(e.latlng.lat, e.latlng.lng);
  marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
}

map.on("click", onMapClick);
