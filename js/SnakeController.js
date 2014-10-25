/*
 * SnakeController.js
 *
 * Deals with motion of snake, snaps to roads
 */


 var SnakeController = {
 	//initialize data

 	//direction is in degrees
 	direction: 90,
 	motion: 90,
 	latatude: 0,
 	longitude: 0,
 	length: 1,
 	current: 0,
 	next: 0,
 	step: 0.00001,

 	coveredNodes: [],
 	lose : false,

 	init: function() {
 		//start
 		var min = -1;
 		var minDistance = 0;
 		for(i = 0; i < Roads.nodes.length; i++){
 			var latdiff = (map.getCenter().lat - Roads.nodes[i].lat);
 			var lngdiff = (map.getCenter().lng - Roads.nodes[i].lng);
 			var D = Math.sqrt(latdiff*latdiff + lngdiff*lngdiff);

 			if(min == -1){
 				minDistance = D;
 				min = i;
 			}
 			else {
 				if(D < minDistance){
 					minDistance = D;
 					min = i;
 				}
 			}
 		}
 		latatude = Roads.nodes[min].lat;
 		longitude = Roads.nodes[min].lng;
 		this.setNextLocation();
 	},

 	run: function() {
 		this.init();
 		var self = this;
 		var interval = setInterval( function () {
 			SnakeDraw.drawNewHead(latatude, longitude, false/*eated*/);
 			self.setNextLocation();
 			if(this.lose) {
 				clearInterval(interval);
 			}
 		}, 500);
 	},

 	setNextLocation: function() {
 		// check direction of motion
 		// if at an interesection make decision of next intersection to move towards
 		if(this.latatude == Roads.nodes[this.next].lat && this.longitude == Roads.nodes[this.next].lng) {
 			//find next "next"
 			//	goto index of "next"
 			//  disregard current
 			//  for each related node:
 			//		find the angle. (arctan(distance longitude/ distance lattitude))
 			//		find minimum angle
 			var min = -1;
 			var minangle = 0;
 			var location = this;
 			Roads.nodes[this.next].neighbors.each(function () {
 				var angle = 0;
 				if($(this) != current) {

 					angle = Math.atan2(Roads.nodes[$(this)].lng - location.longitude, Roads.nodes[$(this)].lat - location.latatude);
 					if (angle < 0) {angle = angle + 2*Math.PI}
 					angle = angle * 180 / Math.PI;

 					if(min == -1) {
 						min = $(this);
 						minangle = abs(direction - angle);
 						motion = angle;
 					}
 					else {
 						if (abs(direction-angle) < minangle) { 
 							min = $(this);
 							minangle = abs(direction-angle);
 							motion = angle;
 						}
 					}
 				}
 			});
 			//	set minimum angle to next
 			current = this.next;
 			this.next = min;
 		} 
 		//Move toward next node
 		var latdiff = (latatude-Roads.nodes[this.next].lat)
 		var lngdiff = (longitude-Roads.nodes[this.next].lng)
 		var D = Math.sqrt(latdiff*latdiff + lngdiff*lngdiff)

 		if (D < this.step) {
 			latatude = Roads.nodes[this.next].lat;
 			longitude = Roads.nodes[this.next].lng;
 		}
 		latatude = this.step * Math.cos(this.motion);
 		longitude = this.step * Math.sin(this.motion);
 		// otherwise increment direction (long = long + stepsize*cos(direction_of_movement), lat = lat + stepsize*sin(direction_of_movement))
 		//  if moves past destination node snap back to node
 		//  --
 	},



 	setDirection: function(theta) {
 		this.direction = theta;
 	}
}