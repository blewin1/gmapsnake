//UserControler.js

var UserController = {

	mode: 0, //Default

	//Direction is in degrees
	//0 is right
	//counter clockwise increases.

	init: function(){
		var keys = [];

		var keyhandle = function(e){
		//	console.log("KEYSTROKE!")
			keys[e.keyCode] = (e.type == 'keydown');
		
			var arrows = {DOWN: 40, UP: 38, LEFT: 37, RIGHT: 39};
			//Set Direction based on arrow keys
			if(keys[arrows.UP]){
				if(keys[arrows.LEFT]){
					SnakeController.setDirection(5 * Math.PI / 4);  //135
		//			console.log("UP LEFT");
				} else if(keys[arrows.RIGHT]){
					SnakeController.setDirection(3 * Math.PI / 4);  //45
		//			console.log("UP RIGHT");
				} else {
					SnakeController.setDirection(Math.PI);  //90
		//			console.log("UP");
				}
			} else if(keys[arrows.DOWN]){
				if(keys[arrows.LEFT]){
					SnakeController.setDirection(7 * Math.PI / 4);  //225
				} else if(keys[arrows.RIGHT]){
					SnakeController.setDirection(Math.PI / 4); //305
				} else {
					SnakeController.setDirection(0); //270
				}
			} else if(keys[arrows.LEFT]){
				SnakeController.setDirection(3 * Math.PI / 2);  //180
			} else if(keys[arrows.RIGHT]){
				SnakeController.setDirection(Math.PI / 2);
			}
		}

		$(document).keydown(keyhandle);
		$(document).keyup(keyhandle);
	}
};