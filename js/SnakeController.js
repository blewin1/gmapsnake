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

 	setNextLocation: function() {
 		// check direction of motion
 		// if at an interesection make decision of next intersection to move towards
 		if(this.latatude == Roads.nodes[next].lat && this.longitude == Roads.nodes[next].lng) {
 			//find next "next"
 			//	goto index of "next"
 			//  disregard current
 			//  for each related node:
 			//		find the angle. (arctan(distance longitude/ distance lattitude))
 			//		find minimum angle
 			var min = -1;
 			var minangle = 0;
 			var location = this;
 			Roads.nodes[next].neighbors.each(function () {
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
 			current = next;
 			next = min;
 		} 
 		//Move toward next node
 		var latdiff = (latatude-Roads.nodes[next].lat)
 		var lngdiff = (longitude-Roads.nodes[next].lng)
 		var D = Math.sqrt(latdiff*latdiff + lngdiff*lngdiff)

 		if (D < step) {
 			latatude = Roads.nodes[next].lat;
 			longitude = Roads.nodes[next].lng;
 		}
 		latatude = step * Math.cos(motion);
 		longitude = step * Math.sin(motion);
 		// otherwise increment direction (long = long + stepsize*cos(direction_of_movement), lat = lat + stepsize*sin(direction_of_movement))
 		//  if moves past destination node snap back to node
 		//  --
 	},

 	

 	setDirection: function(theta) {
 		this.direction = theta;
 	}
}