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

		// Temporary Until UI is Done
		this.mapLockAndLoad();

	},

	// User Has Specified Position, Call Load Seconday Data
	mapLockAndLoad: function() {

		hideControls();			// via MapController

		Roads.setBounds(mapBounds.minLat, mapBounds.minLng, 
			mapBounds.maxLat, mapBounds.maxLng);

	},

	// Seconday Map Data Loaded
	overpassLoaded: function() {

		dropFood();				// via MapController
		console.log('done');



	},

	// Secondary Map Data Failure
	overpassLoadError: function() {
		alert('Error Loading Data');
	}

}