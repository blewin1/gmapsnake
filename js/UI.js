var UI = {

	userScore: 0,
	pointValue: 100,
	scoreDisplay: null,

	init: function() {
		this.userScore = 0;

		// 7-Segment Display - Premade Code
		this.scoreDisplay = new SegmentDisplay("score-display");
		this.scoreDisplay.pattern         = "######";
		this.scoreDisplay.displayAngle    = 10;
		this.scoreDisplay.digitHeight     = 20;
		this.scoreDisplay.digitWidth      = 12;
		this.scoreDisplay.digitDistance   = 2.5;
		this.scoreDisplay.segmentWidth    = 2.5;
		this.scoreDisplay.segmentDistance = 0.5;
		this.scoreDisplay.segmentCount    = 7;
		this.scoreDisplay.cornerType      = 3;
		this.scoreDisplay.colorOn         = "#24dd22";
		this.scoreDisplay.colorOff        = "#1b4105";
	},

	// Called by MapController to 
	incrementScore: function() {
		this.userScore += this.pointValue;
		this.scoreDisplay.setValue(this.userScore);
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

		bounds = getBounds();//getBounds();
		console.log(bounds);
		var minLat = Math.min(bounds.getNorthEast().lat(), bounds.getSouthWest().lat());
		var maxLat = Math.max(bounds.getNorthEast().lat(), bounds.getSouthWest().lat());
		var minLng = Math.min(bounds.getNorthEast().lng(), bounds.getSouthWest().lng());
		var maxLng = Math.max(bounds.getNorthEast().lng(), bounds.getSouthWest().lng());

		Roads.setBounds(minLat, minLng, maxLat, maxLng);

	},

	// Seconday Map Data Loaded
	overpassLoaded: function() {

		dropFood();				// via MapController
		console.log('done');



	},

	// Secondary Map Data Failure
	overpassLoadError: function() {
		alert('Error Loading Data');
	},

	userEndGame: function() {

	}

}