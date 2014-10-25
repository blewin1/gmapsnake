var UI = {

	userScore: 0,
	pointValue: 100,
	scoreDisplay: null,

	init: function() {
		this.userScore = 0;

		// 7-Segment Display - Premade Code
		display = new SegmentDisplay("score-display");
		display.pattern         = "######";
		display.displayAngle    = 10;
		display.digitHeight     = 20;
		display.digitWidth      = 12;
		display.digitDistance   = 2.5;
		display.segmentWidth    = 2.5;
		display.segmentDistance = 0.5;
		display.segmentCount    = 7;
		display.cornerType      = 3;
		display.colorOn         = "#24dd22";
		display.colorOff        = "#1b4105";
		display.draw();

		display.setValue("000000");

		this.scoreDisplay = display;

	},

	// Called by MapController to 
	incrementScore: function() {
		this.userScore += this.pointValue;
		var pad = function(num, size) {
    		var s = "000" + num;
    		return s.substr(s.length-size);
		}
		this.scoreDisplay.setValue(pad(this.userScore));
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
		SnakeController.run();


	},

	// Secondary Map Data Failure
	overpassLoadError: function() {
		alert('Error Loading Data');
	},

	userEndGame: function() {

	}

}