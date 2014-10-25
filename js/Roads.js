var Roads = {

	setBounds: function(minLat, minLng, maxLat, maxLng) {

		var query = "node("+minLat+","+minLng+","+maxLat+","+maxLng+")[highway];out;way(bn);out;";
		
		$.ajax({
			url: "http://overpass-api.de/api/interpreter?data="+query,
			type: "GET",
			dataType: "xml",
			success: function(xml) {
				Roads.parseXml(xml);
				// TODO Send Message to Interface
			},
			error: function(e) {
				alert('Could Not Access API');
				// TODO Send Message to Interface
			}
		})

	},

	nodes: [],

	parseXml: function(xml) {

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
				neighbors: []
			};

			// Set Id Using Custom Mapping Function
			nodeData.id = nodeToUniqueId(node.attr('id'));

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

	}



}