/**
*Sam Swanke
*Map Controller
*/


var map;

function initialize() {
  var mapOptions = {
    zoom: 15
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
  hideControls();
  showControls();
}
function hideControls () {
	if (map != null){
		map.setOptions({disableDefaultUI: true, draggable: false, scrollwheel: false,
			styles: [{featureType: "transit", elementType: "labels",stylers: [{visibility: "off"}]},
			{featureType: "poi", elementType: "labels",stylers: [{visibility: "off"}]},
			{featureType: "administrative", elementType: "labels",stylers: [{visibility: "off"}]}]});
	}
}
function showControls () {
	if (map != null){
		map.setOptions({disableDefaultUI: false, draggable: true, scrollwheel: true,
			styles: [{featureType: "transit", elementType: "labels",stylers: [{visibility: "on"}]},
			{featureType: "poi", elementType: "labels",stylers: [{visibility: "on"}]},
			{featureType: "administrative", elementType: "labels",stylers: [{visibility: "on"}]}]});
	}
}
function dropFood () {
	var isFood = false;
	if (isFood){}
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }
  
    var options = {
        map: map,
        position: new google.maps.LatLng(40.758955, -73.978868),
        content: content
    };
  
    //var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);


var MapController = { 
/*	hideControls: function () {
		console.log(map);
		map.mapOptions(disableDefaultUI);
	},
	showControls: function () {
		map.mapOptions(disableDefaultUI);
	}*/

}
