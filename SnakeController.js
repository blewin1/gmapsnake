/*
 * SnakeController.js
 *
 * Deals with motion of snake, snaps to roads
 */


 var SnakeController = {
 	//initialize data

 	//direction is in degrees
 	direction: 90,
 	latatude: 0,
 	longitude: 0,
 	length: 1,
 	requestURI: "http://api.openstreetmap.org/api/0.6/map?bbox=";

 	getData: function(minlong, minlat, maxlong, maxlat) {

 	},

 	setNextLocation: function() {

 	},

 	setDirection: function(theta) {
 		this.direction = theta;
 	}
}