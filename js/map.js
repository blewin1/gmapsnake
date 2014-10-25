var Maps = function() {

}

Maps.prototype.init = function() {

	this.latitude = 0;
	this.longitude = 0;
	this.position = new google.maps.LatLng(this.latitude, this.longitude);
	settings = {
		zoom: 15,
		center: this.position,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	this.info = new google.maps.InfoWindow();
	this.marker;
	this.markers = [];
	this.dataReq;

	this.mappy = new google.maps.Map(document.getElementById("map"), settings);
	this.getPosition();

}

Maps.prototype.getPosition = function() {
	var content = "";

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			maps.latitude = position.coords.latitude;
			maps.longitude = position.coords.longitude;
			maps.position = new google.maps.LatLng(maps.latitude, maps.longitude);
			maps.mappy.setCenter(maps.position);

			maps.marker = new google.maps.Marker({
				position: maps.position,
				title: "Your Position"
			});
			maps.marker.setMap(maps.mappy);

			content = "<p class='title purple'>Your Position</p><p class='purple'>" + content + "</p>";

			google.maps.event.addListener(maps.marker, 'click', function() {
				maps.info.setContent(content);
				maps.info.open(maps.mappy, maps.marker);
			});


			maps.mappy.panTo(maps.position);

		});
	} else {
		alert("Geolocation is not supported by this web browser.");
	}

}

//loadAllPurchases(JSON)

Maps.prototype.helperLoad = function(purchase) {

	var location, cost, coords, type, tag;

	location = purchase["location"];
	cost = parseInt(purchase["cost"]);

	lat = purchase["lat"];
	long = purchase["lng"];
	coords = new google.maps.LatLng(lat, long);

	type = purchase["type"];

	if(type == "Food")
		tag = "../img/food.png";
	else if(type == "Shopping")
		tag = "../img/shopping.png";
	else if(type == "Entertainment")
		tag = "../img/entertainment.png";
	else if (type == "Drinks")
		tag = "../img/drinks.png";
	else
		tag = "../img/msc.png";
	var marker = new google.maps.Marker({
		map: maps.mappy,
		position: coords,
		icon: tag,
	});
	maps.markers.push(marker);
	var content = new String;
	content = location + "<br>" + "$" + cost;
	google.maps.event.addListener(marker, 'click', function() {
		maps.info.close();
		maps.info.setContent(content);
		maps.info.open(maps.mappy, this);
	});

}

Maps.prototype.loadAllPurchases = function(purchases) {

	for(var i = 0; i < maps.markers.length; i++){
		maps.markers[i].setMap(null);
	}
	maps.markers = [];

	for(var i in purchases) {
		maps.helperLoad(purchases[i]);
	}

}

//addPurchase(JSON)

Maps.prototype.addPurchase = function(purchase) {

	maps.helperLoad(purchase);

}

//filterPurchases(JSON)

Maps.prototype.filterPurchases = function(purchases) {

	for(var i = 0; i < maps.markers.length; i++){
		maps.markers[i].setMap(null);
	}
	maps.markers = [];

	for(var i in purchases) {
		maps.helperLoad(purchases[i]);
	}

}

//getAutoComplete(string)

Maps.prototype.getAutoComplete = function(word, textback) {

	var request = {
		location: maps.position,
		radius: '5000',
		name: word
	};


	var service = new google.maps.places.PlacesService(maps.mappy);
	service.nearbySearch(request, function(results, status) {
		if(status == google.maps.places.PlacesServiceStatus.OK){
			textback(results);
		}
	});

}

Maps.prototype.getLat = function() {
	
	return maps.latitude;

}

Maps.prototype.getLng = function() {

	return maps.longitude;

}

var maps = new Maps();





















