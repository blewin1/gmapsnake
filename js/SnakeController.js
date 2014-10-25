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
 	speed: 0.00001,

 	setNextLocation: function() {
 		// check direction of motion
 		// if at an interesection make decision of next intersection to move towards
 		if(this.latatude == next.latatude && this.longitude == next.longitude) {
 			//find next "next"
 			//	goto index of "next"
 			//  disregard current
 			//  for each related node:
 			//		find the angle. (arctan(distance longitude/ distance lattitude))
 			//		find minimum angle
 			//	set minimum angle to next
 		} 
 		//Move toward next node

 		// otherwise increment direction (long = long + stepsize*cos(direction_of_movement), lat = lat + stepsize*sin(direction_of_movement))
 		//  if moves past destination node snap back to node
 		//  --
 	},



 	setDirection: function(theta) {
 		this.direction = theta;
 	}
}