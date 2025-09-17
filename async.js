const apiKey = "2581791d99f34ca0bc260840202008";
const cityName = document.querySelector(".city-name");
const submitBTN = document.querySelector(".submitBTN");

const getWeather = async (lat, lang) => {
  console.log(lat, lang);
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat}, ${lang}&days=5aqi=no`
    );
    if (!response.ok) {
      throw new Error("Could not fetch resources");
    }
    const data = await response.json();
    console.log(data);
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
getWeather("34.2231026552273, -118.4499407360982");
// add submitBTN
submitBTN.addEventListener("click", () => {
  getWeather(cityName.value);

  // clear city name
  cityName.value = "";
});
// map
let map = L.map("map").setView([34.05686661570721, -118.24082839364304, (draggable = false)], 13);
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
  getWeather(e.latlng.lat, e.latlng.lng);
  console.log(e.latlng);
  marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
}

map.on("click", onMapClick);

