var map = L.map('map').setView([-25.2744, 133.7751], 4);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


//finding user's position
const locationButton = document.getElementById('userLocation');
locationButton.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(geoSuccess);
});

function geoSuccess(position) {
    let { coords } = position; 
    console.log(coords);
    latitude = document.getElementById("latitude");
    latitude.value = coords.latitude;
    longitude = document.getElementById("longitude");
    longitude.value = coords.longitude;
}
  