const apiKey = "2581791d99f34ca0bc260840202008";
const cityName = document.querySelector(".city-name");
const submitBTN = document.querySelector(".submitBTN");

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}aqi=no`
    );
    if (!response.ok) {
      throw new Error("Could not fetch resources");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error fetching weater data: ", error);
  }
};

// add submitBTN
submitBTN.addEventListener("click", () => {
  getWeather(cityName.value);

  // clear city name
  cityName.value = "";
});
// map
let map = L.map("map").setView([51.505, -0.09,draggable= false], 13);
let marker = L.marker([51.5, -0.09]).addTo(map);
let popup = L.popup()
  .setLatLng([51.513, -0.09])
  .setContent("Click on the city")
  .openOn(map);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 8,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function onMapClick(e) {
  map.removeLayer(marker)
  // call function to get data
  getWeather(e.latlng.lat, e.latlng.lng)
console.log(e.latlng)
  marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

}

map.on("click", onMapClick);

map.on("click", onMapClick);
