//UserControler.js

var UserControler = {

	Modes: {
			KEYBOARD = 0;
			MOUSE    = 1;
			TOUCH    = 2;
			},

	mode: Modes.KEYBOARD, //Default

	//Direction is in degrees
	//0 is right
	//counter clockwise increases.

	init: function(){
		var keys = []
		$("body").keydown = $("body").keyup = function(e){
			keys[e.keyCode] = (e.type == 'keydown');
		
			var arrows = {DOWN: 14; UP: 38; LEFT: 37; RIGHT: 39};
			if(mode != Modes.KEYBOARD){
				return;
			}
			//Set Direction based on arrow keys
			if(keys[arrows.UP]){
				if(keys[arrows.LEFT]){
					SnakeController.setDirection(3 * Math.PI / 4);  //135
				} else if(keys[arrows.RIGHT]){
					SnakeController.setDirection(Math.PI / 4);  //45
				} else {
					SnakeController.setDirection(Math.PI / 2);  //90
				}
			} else if(keys[arrows.DOWN]){
				if(keys[arrows.LEFT]){
					SnakeController.setDirection(5 * Math.PI / 4);  //225
				} else if(keys[arrows.RIGHT]){
					SnakeController.setDirection(7 * Math.PI / 4); //305
				} else {
					SnakeController.setDirection(3 * Math.PI / 2); //270
				}
			} else if(keys[arrows.LEFT]){
				SnakeController.setDirection(Math.PI);  //180
			} else if(keys[arrows.RIGHT]){
				SnakeController.setDirection(0);
			}
		}

		$("body").mousemove = function (e){

			if(mode != Modes.MOUSE){
				return;
			}
			
			var mapHeight = mapBounds.maxLat - mapBounds.minLat;
			var mapWidth = mapBounds.maxLng - mapBounds.minLng;
			
			var xScale = mapWidth / $("body").width();
			var yScale = mapHeight / $("body").height();

			var pixX = xScale * 

			var dx = e.pageX - Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale);
			var dy = e.pageY - Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale);

			var theta = Math.atan2(-dy, dx);
			if (theta < 0)
	   			theta += 2 * Math.PI;
			}
			SnakeController.setDirection(180 / Math.PI);  //translate to degrees
		}

	}
};