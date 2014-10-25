var SnakeDraw = {

	markers: [],

	drawOnMap: function(coords) {

		// Remove Old Markers
		for (var i in markers) {
			markers[i].setMap(null);
		}
		markers = [];

		// Draw New Markers
		for (var i in coords) {
			var marker =  new google.maps.Marker({
			    position: coords[i],
			    map: map,
			});
			markers.push(marker);

		}
	}

}