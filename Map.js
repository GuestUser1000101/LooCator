
let slider = document.getElementById("rangeslider");
let output = document.getElementById("sliderValue");
let valueP = document.createElement('p');
let pText = document.createTextNode(slider.value);
valueP.appendChild(pText);
output.appendChild(valueP);
slider.oninput = function() {
    pText.textContent = this.value;
}

var map = L.map('map').setView([-25.2744, 133.7751], 5);

// Add OpenStreetMap tile layer
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
osm.addTo(map);
// marker      
var myIcon = L.icon({   
    iconUrl: 'Imgs/red_marker.png',
    iconSize: [40, 40],
}); 
function AddMyMarker(lat, lng) {
    var singleMarker = L.marker([lat, lng], { icon: myIcon, draggable: true });
    var popup = singleMarker.bindPopup('You are here at ' + singleMarker.getLatLng()).openPopup()
    popup.addTo(map);
}

function addRestroom(lat,lng) {
    var restroomIcon = L.icon({ iconUrl: 'Imgs/BathroomIcon.jpg', // Public restroom icon
        iconSize: [50, 50], // Adjust size as needed
        iconAnchor: [15, 30], 
        popupAnchor: [0, -30]})
    var toiletMarker = L.marker([lat, lng], {icon: restroomIcon, draggable: false});
    var popup = toiletMarker.bindPopup("Toilets!! ");
    popup.addTo(map);
}

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
    AddMyMarker(coords.latitude, coords.longitude);
} 

function trackManualInput() {
    let latInput = document.getElementById("latitude");
    let lngInput = document.getElementById("longitude");

    function handleInput() {
        let lat = latInput.value;
        let lng = lngInput.value;

        if (lat && lng) {
            AddMyMarker(lat, lng); // Automatically add marker
        }
    }

    latInput.addEventListener("input", handleInput);
    lngInput.addEventListener("input", handleInput);
}
trackManualInput();
