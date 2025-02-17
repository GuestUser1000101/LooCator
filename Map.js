

let slider = document.getElementById("rangeslider");
let output = document.getElementById("sliderValue");
let valueP = document.createElement('p');
let pText = document.createTextNode(slider.value);
valueP.appendChild(pText);
output.appendChild(valueP);
slider.oninput = function() {
    pText.textContent = this.value;
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

var map = L.map('map').setView([-25.2744, 133.7751], 5);

const SampleRestrooms = [
    {
        "name": "Sydney Central Restroom",
        "lat": -33.8688,
        "long": 151.2093,
        "description": "Public restroom near Sydney Opera House"
    },
    {
        "name": "Melbourne CBD Restroom",
        "lat": -37.8136,
        "long": 144.9631,
        "description": "Clean and accessible restroom in the city center"
    },
    {
        "name": "Brisbane Park Restroom",
        "lat": -27.4698,
        "long": 153.0251,
        "description": "Located in South Bank Parklands"
    },
    {
        "name": "Perth Beach Restroom",
        "lat": -31.9505,
        "long": 115.8605,
        "description": "Near Cottesloe Beach"
    },
    {
        "name": "Adelaide Mall Restroom",
        "lat": -34.9285,
        "long": 138.6007,
        "description": "Inside Rundle Mall"
    }
];

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

var lastMarker = null;
function AddMyMarker(lat, lng) {
    if(lastMarker) {
        map.removeLayer(lastMarker);
    }
    var singleMarker = L.marker([lat, lng], { icon: myIcon, draggable: true });
    var popup = singleMarker.bindPopup('You are here at ' + singleMarker.getLatLng()).openPopup()
    popup.addTo(map);

    lastMarker = singleMarker;
}

var restroomIcon = L.icon({ iconUrl: 'Imgs/BathroomIcon.jpg', // Public restroom icon
    iconSize: [50, 50], // Adjust size as needed
    iconAnchor: [15, 30], 
    popupAnchor: [0, -30]})

function addAllToilets(Toilets) {
    Toilets.forEach(restroom => {
        var toiletMarker = L.marker([restroom.lat, restroom.long], {icon: restroomIcon, draggable: false});
         var popup = toiletMarker.bindPopup();
         popup.addTo(map);
    });
}
addAllToilets(SampleRestrooms);

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

var ClickedLat;
var ClickedLong;
function onMapClick(e) {
    ClickedLat = e.latlng.lat;
    latitude.value = e.latlng.lat;
    ClickedLong = e.latlng.lng;
    longitude.value = e.latlng.lng;

    AddMyMarker(ClickedLat, ClickedLong);
    console.log("New coordinates: Latitude: " + ClickedLat + ", Longitude: " + ClickedLong);
}
map.on('click', onMapClick)
