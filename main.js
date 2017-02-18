$(document).ready(function () {
  var map = new GMaps({
      div: '#map',
      lat: 58.1479053,
      lng: 7.9973585
  });

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
