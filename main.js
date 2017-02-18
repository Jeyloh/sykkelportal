$(document).ready(function () {
  var map = new GMaps({
      div: '#map',
      lat: -12.043333,
      lng: -77.028333
  });

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

});

// get data from ./data/Lokale_kulturminner.json -> features.geometry.x && features.geometry.y

/**
    features[0].attributes.Navn = "GILLSVANNET 32 C3.1"
    features[0].features.x = 442577
    features[0].features.y = 6449945

    for
*/

function getBikeMaps() {
    var bike_POI_list = [];
    var jsonPath = "./data/Sykkelkart_interessepunkt.json";
    for(var bikeMap in jsonPath.features.){


        var bikeMapObject = {
            x = bikeMap.geometry.x;
            y = bikeMap.geometry.y;
            name = bikeMap.attributes.Navn;
        }

        bike_POI_list[bikeMapObject];
    }
    return bike_POI_list;
}

function getCurrentLocation() {
    var currentPosition;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
      do_something(position.coords.latitude, position.coords.longitude);
    });
    } else {
      console.log("geolocation is not available");
    }

}
