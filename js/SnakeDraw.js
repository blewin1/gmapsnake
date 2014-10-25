var SnakeDraw = {

	markers: [],

	drawNewHead: function(coord, hasGrown) {
		var marker =  new google.maps.Marker({
			position: coords[i],
			map: map,
		});
		markers.push(marker);

		// If Snake Has Not Grown, Remove Last Point
		if (!hasGrown && markers.length > 0) {
			markers.pop().setMap(null)
		}

	}

}