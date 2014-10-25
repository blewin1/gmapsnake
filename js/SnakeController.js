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
 	latitude: 0,
 	longitude: 0,
 	length: 1,
 	current: 0,
 	next: 0,
 	step: 0.001,

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
 		this.current = min;
 		//console.log(this);
 		this.latitude = Roads.nodes[min].lat;

 		this.longitude = Roads.nodes[min].lng;
 		//console.log(Roads.nodes[min])
 		//console.log(this)
 		//console.log(this.latitude);
 		//console.log(this.longitude);
 		this.setNextLocation();
 		//console.log(this);
 				//console.log(this.latitude);
 		//console.log(this.longitude);
 	},

 	run: function() {
 		this.init();
 		 	console.log(this.current);
 			console.log(this.next);
 		var self = this;
 		var interval = setInterval( function () {
 			SnakeDraw.drawNewHead(self.latitude, self.longitude, false/*eated*/);
 			self.setNextLocation();
 			if(this.lose) {
 				clearInterval(interval);
 			}
 		}, 500);
 	},

 	setNextLocation: function() {
 		// check direction of motion
 		// if at an interesection make decision of next intersection to move towards
 		//console.log(this.latitude);
 		if(this.latitude == Roads.nodes[this.next].lat && this.longitude == Roads.nodes[this.next].lng) {
 			//find next "next"
 			//	goto index of "next"
 			//  disregard current
 			//  for each related node:
 			//		find the angle. (arctan(distance longitude/ distance latitude))
 			//		find minimum angle
 			var min = -1;
 			var minangle = 0;
 			 		//console.log(this.latitude);
 			var location = this;
 			 		//console.log(this.latitude);
 			$.each(Roads.nodes[this.next].neighbors, function (i) {
 				var angle = 0;
 
 				if(Roads.nodes[location.next].neighbors[i] != location.current) {

 					angle = Math.atan2(Roads.nodes[Roads.nodes[location.next].neighbors[i]].lng - location.longitude, Roads.nodes[Roads.nodes[location.next].neighbors[i]].lat - location.latitude);

 					/*if (angle < 0) {angle = angle + 2*Math.PI}
 					angle = angle * 180 / Math.PI;*/

 					if(min == -1) {
 						min = i;
 						minangle = Math.abs(location.direction - angle);
 						motion = angle;
 					}
 					else {
 						if (Math.abs(location.direction-angle) < minangle) { 
 							min = i;
 							minangle = Math.abs(location.direction - angle);
 							location.motion = angle;
 						}
 					}
 				}
 			});

 			//	set minimum angle to next

 			this.current = this.next;
 			this.next = min;


 		} 
 		//Move toward next node

 		var latdiff = (this.latitude - Roads.nodes[this.next].lat)
 		var lngdiff = (this.longitude - Roads.nodes[this.next].lng)
 		var D = Math.sqrt(latdiff*latdiff + lngdiff*lngdiff)


 		if (D < this.step) {
 			this.latitude = Roads.nodes[this.next].lat;
 			this.longitude = Roads.nodes[this.next].lng;
 		}

 		else {
 			this.latitude = this.latitude + this.step * Math.cos(this.motion/* 2 * Math.PI / 360*/);
 			this.longitude = this.longitude + this.step * Math.sin(this.motion /* 2 * Math.PI / 360*/);
 		}
 		console.log(D);
 		var test = Math.atan2(Roads.nodes[this.next].lng - Roads.nodes[this.current].lng, Roads.nodes[this.next].lat - Roads.nodes[this.current].lat)* 180 / Math.PI;
 		if (test < 0) {
 			test = test + 360;
 		}
 		// otherwise increment direction (long = long + stepsize*cos(direction_of_movement), lat = lat + stepsize*sin(direction_of_movement))
 		//  if moves past destination node snap back to node
 		//  --
 	},



 	setDirection: function(theta) {
 		this.direction = theta;
 	}
}