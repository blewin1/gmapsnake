var SnakeDraw = {

	markers: [],

	drawNewHead: function(lat, lng, hasGrown) {

		var coord = new google.maps.LatLng(lat, lng);

		var marker =  new google.maps.Marker({
			position: coord,
			map: map,
		});
		markers.push(marker);

		// If Snake Has Not Grown, Remove Last Point
		if (!hasGrown && markers.length > 0) {
			markers.pop().setMap(null)
		}

	}

}