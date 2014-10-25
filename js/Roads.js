//var GLOBAL_START = new Date().getTime();

var Roads = {

	setBounds: function(minLat, minLng, maxLat, maxLng) {

		//console.log(new Date().getTime() - GLOBAL_START);

		var query = "node("+minLat+","+minLng+","+maxLat+","+maxLng+")[highway];out;way(bn);out;";
		
		$.ajax({
			url: "http://overpass-api.de/api/interpreter?data="+query,
			type: "GET",
			dataType: "xml",
			success: function(xml) {
				Roads.parseXml(xml);
			},
			error: function(e) {
				UI.overpassLoadError();
			}
		})

	},

	nodes: [],

	parseXml: function(xml) {
		//console.log(new Date().getTime() - GLOBAL_START);

		// Maps Crazy Long Open Data IDs to Short Custom IDs
		var usedIDs = [];
		var nextId = 0;
		var nodeToUniqueId = function(bigId) {
			ourId = usedIDs.indexOf(bigId);
			if (ourId == -1) {
				usedIDs[nextId] = bigId;
				nextId++;
				return nextId-1;
			} else {
				return ourId;
			}
		}

		$(xml).find('node').each(function() {
			var node = $(this);

			// New Node Object to Store
			var nodeData = {
				id: 0,
				neighbors: [],
				lat: 0,
				lng: 0
			};

			// Set Id Using Custom Mapping Function
			nodeData.id = nodeToUniqueId(node.attr('id'));
			nodeData.lat = node.attr('lat');
			nodeData.lng = node.attr('lon');

			// Find Neighbors
			$(xml).find('way').each(function() {
				var way = $(this);

				ndRefs = way.find('nd');
				for (var i = 0; i < ndRefs.length; i++) {

					if ($(ndRefs[i]).attr('ref') == node.attr('id')) {
						if (i > 0) {
							nodeData.neighbors.push(nodeToUniqueId($(ndRefs[i-1]).attr('ref')));
						}
						if (i < ndRefs.length-1) {
							nodeData.neighbors.push(nodeToUniqueId($(ndRefs[i+1]).attr('ref')));
						}
					}

				}

			})

			Roads.nodes.push(nodeData);

		})

		UI.overpassLoaded();

		//console.log(new Date().getTime() - GLOBAL_START);

	}



}