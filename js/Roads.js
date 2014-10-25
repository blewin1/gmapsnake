var Roads = {

	setBounds: function(minLat, minLng, maxLat, maxLng) {

		var query = "node("+minLat+","+minLng+","+maxLat+","+maxLng+")[highway];out;way(bn);out;";
		
		$.ajax({
			url: "http://overpass-api.de/api/interpreter?data="+query,
			type: "GET",
			dataType: "xml",
			success: function(xml) {
				console.log(xml);
			},
			error: function(e) {
				alert('Could Not Access API');
			}
		})

	},

	getIntersections: function() {

	}

}