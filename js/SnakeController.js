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
 	next: -1,
 	step: 0.0001,

 	coveredNodes: [],
 	lose : false,

 	init: function() {
 		//start
 		var min = -1;
 		var minDistance = 0;
 		for(i = 0; i < Roads.nodes.length; i++){
 			if (Roads.nodes[i] == window) { continue; }
 			if (Roads.nodes[i] == undefined) { continue; }
 			var latdiff = (map.getCenter().lat() - Roads.nodes[i].lat);
 			var lngdiff = (map.getCenter().lng() - Roads.nodes[i].lng);
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
 		min = -1;
 		var location = this;
 		 	$.each(Roads.nodes[this.current].neighbors, function (i) {

 		 		if (Roads.nodes[location.current] == undefined) { console.log(i); return; }
 		 		//console.log(Roads.nodes[location.current]);
 		 		//console.log(Roads.nodes[location.current].neighbors);
 		 		//console.log(Roads.nodes[location.current].neighbors[i]);
 		 		if (Roads.nodes[Roads.nodes[location.current].neighbors[i]] == undefined) { return; }

 				var angle = 0;
 				var minangle = 0;
 					//console.log(Roads.nodes[location.current])
 					angle = Math.atan2(Roads.nodes[Roads.nodes[location.current].neighbors[i]].lng - location.longitude, Roads.nodes[Roads.nodes[location.current].neighbors[i]].lat - location.latitude);
 					angle = angle + Math.PI + .1;
					//angle = Math.atan2(location.longitude - Roads.nodes[Roads.nodes[location.next].neighbors[i]].lng , location.latitude - Roads.nodes[Roads.nodes[location.next].neighbors[i]].lat);
 					
 					/*if (angle < 0) {angle = angle + 2*Math.PI}
 					angle = angle * 180 / Math.PI;*/

 					if(min == -1) {
 						min = Roads.nodes[location.current].neighbors[i];
 						minangle = Math.abs(location.direction - angle);
 						location.motion = angle;
 					}
 					else {
 						if (Math.abs(location.direction-angle) < minangle) { 
 							min = Roads.nodes[location.current].neighbors[i];
 							minangle = Math.abs(location.direction - angle);
 							location.motion = angle;
 						}
 					}
 					location.next = min;
 				//	console.log(min);
 			});
 		//console.log(this);
 				//console.log(this.latitude);
 		console.log(this.next);
 	},

 	run: function() {
 		this.init();
 		var self = this;
 		var interval = setInterval( function () {
 			SnakeDraw.drawNewHead(self.latitude, self.longitude, false/*eated*/);
 			self.setNextLocation();
 			//console.log(self.next);
 			SnakeDraw.drawNewHead(Roads.nodes[self.next].lat, Roads.nodes[self.next].lng, false)
 			console.log(self.current);
 			console.log(self.next);
 			console.log(self.direction);
 			console.log(self.motion);
 			if(this.lose) {
 				clearInterval(interval);
 			}
 		}, 250);
 	},

 	setNextLocation: function() {
 		// check direction of motion
 		// if at an interesection make decision of next intersection to move towards
 		console.log(this.next );


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
// 				 	console.log(i);

 //					console.log(Roads.nodes[Roads.nodes[location.next].neighbors[i]]);
 				if(Roads.nodes[location.next].neighbors[i] != location.current) {


 					angle = Math.atan2(Roads.nodes[Roads.nodes[location.next].neighbors[i]].lng - location.longitude, Roads.nodes[Roads.nodes[location.next].neighbors[i]].lat - location.latitude);
 					
					//angle = Math.atan2(location.longitude - Roads.nodes[Roads.nodes[location.next].neighbors[i]].lng , location.latitude - Roads.nodes[Roads.nodes[location.next].neighbors[i]].lat);
 					
 					/*if (angle < 0) {angle = angle + 2*Math.PI}
 					angle = angle * 180 / Math.PI;*/

 					if(min == -1) {
 						min = Roads.nodes[location.current].neighbors[i];
 						minangle = Math.abs(location.direction - angle);
 						location.motion = angle;
 					}
 					else {
 						if (Math.abs(location.direction-angle) < minangle) { 
 							min = Roads.nodes[location.current].neighbors[i];
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


 		if (D < 2*this.step) {
 			this.latitude = Roads.nodes[this.next].lat;
 			this.longitude = Roads.nodes[this.next].lng;
 		}

 		else {
 			this.latitude = this.latitude - this.step * Math.cos(this.motion/* 2 * Math.PI / 360*/);
 			this.longitude = this.longitude - this.step * Math.sin(this.motion /* 2 * Math.PI / 360*/);
 		}
 		//console.log(D);
 		var test = Math.atan2(Roads.nodes[this.next].lng - Roads.nodes[this.current].lng, Roads.nodes[this.next].lat - Roads.nodes[this.current].lat);
 		//console.log(test);
 		//console.log(this.motion);
 		// otherwise increment direction (long = long + stepsize*cos(direction_of_movement), lat = lat + stepsize*sin(direction_of_movement))
 		//  if moves past destination node snap back to node
 		//  --
 	},



 	setDirection: function(theta) {
 		this.direction = theta;
 	}
}