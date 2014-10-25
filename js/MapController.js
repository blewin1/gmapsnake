/**
*Sam Swanke
*Map Controller
*/


var map;

function initialize() {
	console.log('init');
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
  google.maps.event.addListener(map,'bounds_changed', function() {
    var bounds = map.getBounds();
    ne = bounds.getNorthEast();
    console.log(ne);
    sw = bounds.getSouthWest();
    console.log(sw);
	mapBounds.minLat = Math.min(bounds.getNorthEast().lat(), bounds.getSouthWest().lat());
	mapBounds.maxLat = Math.max(bounds.getNorthEast().lat(), bounds.getSouthWest().lat());
	mapBounds.minLng = Math.min(bounds.getNorthEast().lng(), bounds.getSouthWest().lng());
	mapBounds.maxLng = Math.max(bounds.getNorthEast().lng(), bounds.getSouthWest().lng());
	UI.mapLoaded();
    }); // end of listener callbck


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

function hideControls () {
	if (map != null){
		map.setOptions({keyboardShortcuts: false, disableDefaultUI: true, draggable: false, scrollwheel: false,
			styles: [{featureType: "transit", elementType: "labels",stylers: [{visibility: "off"}]},
			{featureType: "poi", elementType: "labels",stylers: [{visibility: "off"}]},
			{featureType: "administrative", elementType: "labels",stylers: [{visibility: "off"}]}]});
	}
}

function showControls () {
	if (map != null){
		map.setOptions({keyboardShortcuts: true, disableDefaultUI: false, draggable: true, scrollwheel: true,
			styles: [{featureType: "transit", elementType: "labels",stylers: [{visibility: "on"}]},
			{featureType: "poi", elementType: "labels",stylers: [{visibility: "on"}]},
			{featureType: "administrative", elementType: "labels",stylers: [{visibility: "on"}]}]});
	}
}

function dropFood () {
	return;
	var isFood = true;
	var k = 1;
	if (isFood){
		var i = Math.floor((Math.random()*Roads.nodes.length)+1);
		var nodePos = new google.maps.LatLng(parseFloat(Roads.nodes[i].lat),
			parseFloat(Roads.nodes[i].lng));
		var img = 'images/food.png';
		var marker = new google.maps.Marker({
			position: nodePos,
			map: map,
			title: 'hello',
			icon: img
		});
		if (k>1) {
			UI.incrementScore();
		}
		isFood = false;
	} else {
		if (SnakeController.getPosition()= marker.position) {
			clearMarkers();
			isFood = true;
		}
	}
}

var mapBounds = {
	ne: null,
	sw: null,
	minLat: null,
	maxLat: null,
	minLng: null,
	maxLng: null
}

google.maps.event.addDomListener(window, 'load', initialize);
//window.setTimeout(dropFood,5000);