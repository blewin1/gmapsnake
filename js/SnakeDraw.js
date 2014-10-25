var SnakeDraw = {

	markers: [],

	drawNewHead: function(lat, lng, hasGrown) {

		// If Snake Has Not Grown, Remove Last Point
		// Don't Be an Idiot and Put the New Element On First
		if (!hasGrown && this.markers.length > 0) {
			//this.markers.pop().setMap(null)
		}

		var coord = new google.maps.LatLng(lat, lng);

		var marker =  new google.maps.Marker({
			position: coord,
			map: map,
		});
		this.markers.push(marker);

	}

}