var SnakeDraw = {

	markers: [],

	drawNewHead: function(lat, lng, hasGrown) {

		var coord = new google.maps.LatLng(lat, lng);

		var marker =  new google.maps.Marker({
			position: coord,
			map: map,
		});
		this.markers.push(marker);

		// If Snake Has Not Grown, Remove Last Point
		if (!hasGrown && this.markers.length > 0) {
			this.markers.pop().setMap(null)
		}

	}

}