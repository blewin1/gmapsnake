var UI = {

	userScore: 0,
	pointValue: 100,

	init: function() {
		this.userScore = 0;
	},

	// Called by 
	incrementScore: function() {
		this.userScore += this.pointValue;
		$('#scoreValue').html(this.userScore);
	},

	// Visual Map Data Loaded
	mapLoaded: function() {

		showControls();		// via MapController

	},

	// User Has Specified Position, Call Load Seconday Data
	mapLockAndLoad: function() {

		hideCountrols();			// via MapController

		bounds = map.getBounds();
		var minLat = Math.min(bounds.getNorthEast().lat(), bounds.getSouthWest().lat());
		var maxLat = Math.max(bounds.getNorthEast().lat(), bounds.getSouthWest().lat());
		var minLng = Math.min(bounds.getNorthEast().lng(), bounds.getSouthWest().lng());
		var maxLng = Math.max(bounds.getNorthEast().lng(), bounds.getSouthWest().lng());

		Roads.setBounds(minLat, minLng, maxLat, maxLng);

	},

	// Seconday Map Data Loaded
	overpassLoaded: function() {

		dropFood();				// via MapController



	},

	// Secondary Map Data Failure
	overpassLoadError: function() {
		alert('Error Loading Data');
	}

}