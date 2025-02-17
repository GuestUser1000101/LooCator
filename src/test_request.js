function request (lat, long, searchResults, time, parking = false, parkingAccessible = false, 
    MLAK24 = false, paymentRequired = false, changingPlaces = false, shower = false,
     babyChange = false, babyCareRoom = false, 
     dumpPoint = false, unisex = false, accessible = false,
      sharpsDisposal = false, drinkingWater = false, sanitaryDisposal = false) {
        this.lat = lat;
        this.long = long;
        this.searchResults = searchResults;
        this.Time = time;
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
  var toUse = JSON.stringify(new request(100.0, 100.0, 100, 10));
  console.log(toUse);
var url = ""
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

async function getData() {
  const url = "http://127.0.0.1:5000/search"
  try {
    const response = await fetch(url, {
      method: "POST",
      body:  toUse,
      headers : myHeaders
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
getData();
  