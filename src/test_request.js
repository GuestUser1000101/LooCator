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
  //console.log(JSON.stringify(new request(100.0, 100.0, 100, 10)));
  

async function getData(lat, long, searchResults, time, parking = false, parkingAccessible = false, 
  MLAK24 = false, paymentRequired = false, changingPlaces = false, shower = false,
   babyChange = false, babyCareRoom = false, 
   dumpPoint = false, unisex = false, accessible = false,
    sharpsDisposal = false, drinkingWater = false, sanitaryDisposal = false) {
      
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
    console.log("WE ARE HERE NOW BB")
  } catch (error) {
    console.error(error.message);
  }
}
getData(100, 100, 5, 100, parking = true);


async function addToilet(latIn, longIn, nameIn, featuresIn) {
  var newToilet = new Object();
  newToilet.Name = nameIn;
  newToilet.Latitude = latIn;
  newToilet.Longitude = longIn;
  
  for (key in featuresIn) {
    newToilet[key] = featuresIn[key];
  } 
  console.log(newToilet);
  const url = "http://127.0.0.1:5000/add"
  try {
    const response = await fetch(url, {
      method: "POST",
      body:  JSON.stringify(newToilet),
      headers : {
        "Content-Type": "application/json",
      },
  });
  if(!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
    const json = await response.json();
    console.log(json);
    console.log("WE ARE HERE NOW BB")
  } catch (error) {
    console.error(error.message);
  }
}

addToilet(20.0, 20.0, "hello", {'BabyChange':false});