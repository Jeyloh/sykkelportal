$(document).ready(function () {
  var map = new GMaps({
      div: '#map',
      lat: 58.1479053,
      lng: 7.9973585
  });

    for (var i = 0; i++; i < 10){
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

    }

});

var POI_list = [];
var POI_by_distance = [];
var currentPosition;

function updateBikeMapPOI() {
    $.getJSON( "./data/Sykkelkart_interessepunkt.json", function( data ) {
        for(var bikeMap in data.features){

            var bikeMapObject = {
                x: bikeMap.geometry.x,
                y: bikeMap.geometry.y,
                route: bikeMap.attributes.Rute,
                desc: bikeMap.attributes.Beskrivelse,
                distance: null,
            }
            POI_list.push(bikeMapObject);
        }
    });
}


function updateCulturePOI() {

    $.getJSON( "./data/Kultur.json", function( data ) {

        for(var culturePOI in data.features){
            console.log(data);

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
    });
}

function updateCultureMemoryPOI() {
    $.getJSON( "./data/Lokale_kulturminner.json", function( data ) {
        for(var cultureMemories in data.features){
            var cultureMemoryObject = {
                x: cultureMemories.geometry.x,
                y: cultureMemories.geometry.y,
                name: cultureMemories.attributes.Navn,
                desc: cultureMemories.attributes.Beskrivelse,
                distance: null,
            }
            POI_list.push(cultureMemoryObject);
        }
    });
}

// Get User's Coordinate from their Browser
function LinkGeoData() {
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
