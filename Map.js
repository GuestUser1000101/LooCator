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

var singleMarker = L.marker([-26.58828, 139.490933], { icon: myIcon, draggable: true });
var popup = singleMarker.bindPopup('You are here at ' + singleMarker.getLatLng()).openPopup()
popup.addTo(map);

var secondMarker = L.marker([29.3949, 83.1240], { icon: myIcon, draggable: true });

function addRestroom(lat,lng) {
    var restroomIcon = L.icon({ iconUrl: 'Imgs/BathroomIcon.jpg', // Public restroom icon
        iconSize: [50, 50], // Adjust size as needed
        iconAnchor: [15, 30], 
        popupAnchor: [0, -30]})
    var toiletMarker = L.marker([lat, lng], {icon: restroomIcon, draggable: false});
    var popup = toiletMarker.bindPopup("Toilets!! ");
    popup.addTo(map);
}

addRestroom(-25.2744, 133.7751);