$(document).ready(function () {
  var map = new GMaps({
      div: '#map',
      lat: 58.1479053,
      lng: 7.9973585
  });

    for (var i = 0; i++; i < 10){
        map.addMarker({
        lat: -12.043333,
        lng: -77.028333,
        title: 'Lima',
        click: function(e) {
          infoWindow: {
            content: '<p>HTML Content</p>'
          }
        }

        });

    }

});

$.getJSON("./data/Kuldsadtur.json", function(_cultureData) {
    console.log(_cultureData.features.attributes.Navn);
});

var _localCultureMemData = $.getJSON("./data/Lokale_kulturminner.json");
console.log(_localCultureMemData.features.attributes.Navn);
var _bikemapsData = $.getJSON("./data/Sykkelkart_interessepunkt.json");
var _stationsData = $.getJSON("./data/sykkelstasjoner.json");
// get data from ./data/Lokale_kulturminner.json -> features.geometry.x && features.geometry.y

/**
    features[0].attributes.Navn = "GILLSVANNET 32 C3.1"
    features[0].features.x = 442577
    features[0].features.y = 6449945

<<<<<<< HEAD
  map.addMarker({
    lat: 58.1479053,
      lng: 7.9973585,
    title: 'Lima',
    click: function(e) {
      infoWindow: {
        content: '<p>HTML Content</p>'
      }
    }

  });

});
=======
    for
*/

var POI_list = [];
var POI_by_distance = [];
var currentPosition;

function updateBikeMapPOI() {
    var sykkelkart_data = "./data/Sykkelkart_interessepunkt.json";
    for(var bikeMap in sykkelkart_data.features){

        var bikeMapObject = {
            x: bikeMap.geometry.x,
            y: bikeMap.geometry.y,
            route: bikeMap.attributes.Rute,
            desc: bikeMap.attributes.Beskrivelse,
            distance: null,
        }
        POI_list.push(bikeMapObject);
    }
    return bike_POI_list;
}


function updateCulturePOI() {
    var kultur_data = "./data/Kultur.json";
    for(var culturePOI in kultur_data.features){

        var cultureObject = {
            x: culturePOI.geometry.x,
            y: culturePOI.geometry.y,
            name: culturePOI.attributes.Navn,
            type: culturePOI.attributes.Type,
            desc: culturePOI.attributes.Beskrivelse,
            homepage: culturePOI.attributes.Hjemmeside,
            category: culturePOI.attributes.Hovedkategori,
            distance: null,
        }
        POI_list.push(cultureObject);
    }
}

function updateCultureMemoryPOI() {
    var cm_data = "./data/Lokale_kulturminner.json";
    for(var cultureMemories in cm_data.features){
        var cultureMemoryObject = {
            x: cultureMemories.geometry.x,
            y: cultureMemories.geometry.y,
            name: cultureMemories.attributes.Navn,
            desc: cultureMemories.attributes.Beskrivelse,
            distance: null,
        }
        POI_list.push(cultureMemoryObject);
    }
}

// Get User's Coordinate from their Browser
window.onload = function() {
  // HTML5/W3C Geolocation
  if (navigator.geolocation) {
      updateCulturePOI();
      updateCultureMemoryPOI();
      updateBikeMapPOI();
      navigator.geolocation.getCurrentPosition(UserLocation);
      //sort_POI_by_distance();
  }
  // Default to Washington, DC
  else
    NearestPOI(0, 0);
}

// Callback function for asynchronous call to HTML5 geolocation
function UserLocation(position) {
  NearestPOI(position.coords.latitude, position.coords.longitude);
}
// Callback function for asynchronous call to HTML5 geolocation


// Convert Degress to Radians
function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var distance = Math.sqrt(x * x + y * y) * R;
  return distance;
}

function NearestPOI(latitude, longitude) {
  var mindif = 99999;
  var closest;

  for (index = 0; index < POI_list.length; ++index) {
    var dif = PythagorasEquirectangular(latitude, longitude, POI_list[index]['x'], POI_list[index]['y']);
    if (dif < mindif) {
      closest = index;
      mindif = dif;
      POI_list[index]['distance'] = dif;
      AddNearestPOI_List(10, closest);
    }
  }
}

/**
function sort_POI_by_distance() {
    for (index = 0; index < POI_list.length; ++index) {
        function sortNumber(POI_list[index]['distance']) {
            if(POI_list[index]['distance'] > POI_list[index-1]['distance']) {
                var filtered = [];
                filtered.push(POI_list[index]);
            }
        }
    }
    POI_list.forEach(function sortNumber(POI_list[index]['distance']) {

    });
}
*/

function sortNumber(a,b) {
    return a - b;
}

var numArray = [140000, 104, 99];
numArray.sort(sortNumber);
alert(numArray.join(","));


function GetUserX(position) {
  return position.coords.latitude;
}
function GetUserY(position) {
    return position.coords.longitude;
}

// user accepted being geomonitored
var watchingAccepted = true;

function UpdatedGeoLocation() {
    if("geolocation" in navigator && watchingAccepted)
        navigator.geolocation.watchPosition(function(position) {
            return position.coords;
        });
    else
        console.log("User didn't accept terms or geolocation wasn't activated");
}
>>>>>>> f5d79158c4298a079fb21c06c10edb9adc87ac23
