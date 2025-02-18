let slider = document.getElementById("rangeslider");
let SliderOutput = document.getElementById("sliderValue");
let valueP = document.createElement('p');
let pText = document.createTextNode(slider.value);
let latInput = document.getElementById("latitude");
let lngInput = document.getElementById("longitude");
valueP.appendChild(pText);
SliderOutput.appendChild(valueP);
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
var radiusCircle = null;
function AddMyMarker(lat, lng) {
    if(lastMarker) {
        map.removeLayer(lastMarker);
    }
    if (radiusCircle) {
        map.removeLayer(radiusCircle);
    }
    var singleMarker = L.marker([lat, lng], { icon: myIcon, draggable: true });
    var popup = singleMarker.bindPopup('You are here at ' + singleMarker.getLatLng()).openPopup()
    popup.addTo(map);
    lastMarker = singleMarker;
    radiusCircle = L.circle([lat, lng], {
        color: "blue",
        fillColor: "lightblue",
        fillOpacity: 0.3,
        radius: 20000
    }).addTo(map);
}


slider.oninput = function() {
    SliderOutput.textContent = this.value; 
    if (radiusCircle) {
        radiusCircle.setRadius(parseInt(this.value));
    }
};

const locationButton = document.getElementById('userLocation');
locationButton.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(geoSuccess);
});

function geoSuccess(position) {
    let { coords } = position; 
    console.log(coords);
    latInput.value = coords.latitude;
    lngInput.value = coords.longitude;
    AddMyMarker(coords.latitude, coords.longitude);
    map.setView([coords.latitude, coords.longitude], 10);
} 

function trackManualInput() {

    function handleInput() {
        let lat = latInput.value;
        let lng = lngInput.value;

        if (lat && lng) {
            AddMyMarker(lat, lng); // Automatically add marker
            map.setView([lat,lng], 10);
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
    latInput.value = e.latlng.lat;
    ClickedLong = e.latlng.lng;
    lngInput.value = e.latlng.lng;

    AddMyMarker(ClickedLat, ClickedLong);
    map.setView([ClickedLat, ClickedLong], 11);
    console.log("New coordinates: Latitude: " + ClickedLat + ", Longitude: " + ClickedLong);
}
map.on('click', onMapClick)

function request (lat, long, searchResults, time, parking = false, parkingAccessible = false, 
    MLAK24 = false, paymentRequired = false, changingPlaces = false, shower = false,
     babyChange = false, babyCareRoom = false, 
     dumpPoint = false, unisex = false, accessible = false,
      sharpsDisposal = false, drinkingWater = false, sanitaryDisposal = false) {
        this.lat = lat;
        this.long = long;
        this.searchResults = searchResults;
        this.time = time;
        this.requirementJson = {};
        this.requirementJson.Parking = parking;
        this.requirementJson.ParkingAccessible = parkingAccessible;
        this.requirementJson.MLAK24 = MLAK24;
        this.requirementJson.PaymentRequired = paymentRequired;
        this.requirementJson.ChangingPlaces = changingPlaces;
        this.requirementJson.Shower = shower;
        this.requirementJson.BabyChange = babyChange;
        this.requirementJson.BabyCareRoom = babyCareRoom;
        this.requirementJson.DumpPoint = dumpPoint;
        this.requirementJson.Unisex = unisex;
        this.requirementJson.Accessible = accessible
        this.requirementJson.SharpsDisposal = sharpsDisposal;
        this.requirementJson.DrinkingWater = drinkingWater;
        this.requirementJson.SanitaryDisposal = sanitaryDisposal;
     }
  console.log(JSON.stringify(new request(100.0, 100.0, 100, 10)));
  

async function getData(lat, long, searchResults, time = "", parking = false, parkingAccessible = false, 
  MLAK24 = false, paymentRequired = false, changingPlaces = false, shower = false,
   babyChange = false, babyCareRoom = false, 
   dumpPoint = false, unisex = false, accessible = false,
    sharpsDisposal = false, drinkingWater = false, sanitaryDisposal = false) {
       if (isNaN(lat) || isNaN(long)) {
            console.error("Invalid latitude or longitude values");
            return;
          }
  looRequest = new request(lat, long, searchResults, time, parking, parkingAccessible, MLAK24, 
    paymentRequired, changingPlaces, shower, babyChange, babyCareRoom, dumpPoint, unisex, accessible, 
   sharpsDisposal, drinkingWater, sanitaryDisposal);

   console.log(looRequest);
  const url = "http://127.0.0.1:5000/search"
  try {
    const response = await fetch(url, {
      method: "POST",
      body:  JSON.stringify(looRequest),
      headers : {
        "Content-Type": "application/json",
      },
  });
    if(!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    addAllToilets(json);
    console.log("WE ARE HERE NOW BB")
  } catch (error) {
    console.error(error.message);
  }
}

var timeHTML = document.getElementById("Time");
var toiletButton = document.getElementById("ToiletButton");
var ParkingHTML = document.getElementById('parking');
var AccessibleParkingHTML = document.getElementById('accessibleParking');
var MLAK24HTML = document.getElementById('MLAK24');
var FreeHTML = document.getElementById('Free');
var ChangingPlacesHTML = document.getElementById('ChangingPlaces');
var ShowerHTML = document.getElementById('Shower');
var BabyChangeHTML = document.getElementById('BabyChange');
var BabyCareRoomHTML = document.getElementById('BabyCareRoom');
var DumpPointHTML = document.getElementById('DumpPoint');
var UnisexHTML = document.getElementById('Unisex');
var WheelchairHTML = document.getElementById('Accessible');
var SharpsDisposalHTML = document.getElementById('SharpsDisposal');
var DrinkingWaterHTML= document.getElementById('DrinkingWater');
var SanitaryDisposalHTML = document.getElementById('SanitaryDisposal');
toiletButton.addEventListener("click", () => {
    console.log(typeof(timeHTML.value));
    console.log(timeHTML.value);
    getData(parseFloat(latInput.value), parseFloat(lngInput.value), 10, time= timeHTML.value,
    parking= ParkingHTML.checked, 
    parkingAccessible = AccessibleParkingHTML.checked, 
    MLAK24 = MLAK24HTML.checked, 
    paymentRequired = FreeHTML.checked, 
    changingPlaces = ChangingPlacesHTML.checked, 
    shower = ShowerHTML.checked, 
    babyChange= BabyChangeHTML.checked, 
    babyCareRoom = BabyCareRoomHTML.checked, 
    dumpPoint= DumpPointHTML.checked, 
    unisex = UnisexHTML.checked, 
    accessible = WheelchairHTML.checked, 
    sharpsDisposal = SharpsDisposalHTML.checked, 
    drinkingWater = DrinkingWaterHTML.checked, 
    sanitaryDisposal= SanitaryDisposalHTML.checked);
})


var restroomIcon = L.icon({ iconUrl: 'Imgs/BathroomIcon.jpg', // Public restroom icon
    iconSize: [50, 50], // Adjust size as needed
    iconAnchor: [15, 30], 
    popupAnchor: [0, -30]})
var lastToilets = [];
function addAllToilets(Toilets) {
    lastToilets.forEach(marker => map.removeLayer(marker));
    lastToilets = []; // Clear the array

    const requiredFeatures = {
        Parking: ParkingHTML.checked,
        ParkingAccessible: AccessibleParkingHTML.checked,
        Accessible: WheelchairHTML.checked,
        BabyChange: BabyChangeHTML.checked,
        BabyCareRoom: BabyCareRoomHTML.checked,
        DrinkingWater: DrinkingWaterHTML.checked,
        SanitaryDisposal: SanitaryDisposalHTML.checked,
        Shower: ShowerHTML.checked,
        DumpPoint: DumpPointHTML.checked
    };

    let filteredToilets = Toilets.filter(restroom => {
        return Object.keys(requiredFeatures).every(feature => {
            return !requiredFeatures[feature] || restroom[feature] === "True"; 
            // If feature is checked, restroom must have it; otherwise, ignore it
        });
    });

    filteredToilets.forEach(restroom => {
        var toiletMarker = L.marker([restroom.lat, restroom.long], {icon: restroomIcon, draggable: false});
        var popupContent = `
        <b>${restroom.name}</b><br>
        ${restroom.notes || "No description available"}<br>
        ${restroom.time} <br>
        <b>Features:</b>
        <ul>
            ${restroom.Parking === "True" ? "<li>Parking Available</li>" : ""}
            ${restroom.ParkingAccessible === "True" ? "<li>Accessible Parking</li>" : ""}
            ${restroom.Accessible === "True" ? "<li>Wheelchair Accessible</li>" : ""}
            ${restroom.BabyChange === "True" ? "<li>Baby Change Facility</li>" : ""}
            ${restroom.BabyCareRoom === "True" ? "<li>Baby Care Room</li>" : ""}
            ${restroom.DrinkingWater === "True" ? "<li>Drinking Water</li>" : ""}
            ${restroom.SanitaryDisposal === "True" ? "<li>Sanitary Disposal</li>" : ""}
            ${restroom.Shower=== "True"  ? "<li>Shower Available</li>" : ""}
            ${restroom.DumpPoint === "True" ? "<li>Dump Point</li>" : ""}
        </ul>
    `;
         toiletMarker.bindPopup(popupContent);
         toiletMarker.addTo(map);
         lastToilets.push(toiletMarker);
    });
}


