var LayerGroup = L.layerGroup([]).addTo(map);

		function foundLocation(layer){
				var coordinates = layer.latlng.toString();
				var long = parseFloat(coordinates.split(',')[1]);
				var lat = parseFloat(coordinates.split('(')[1]);
				var marker=L.marker(layer.latlng,{
				   icon: L.mapbox.marker.icon({
			        'marker-size': 'medium',
			        'marker-symbol': 'marker',
			        'marker-color': '#1898c8'
			   		})
			    }).bindPopup('<h2>Τοποθεσία Χρήστη</h2><hr><strong><em>Longitude : </em></strong>'+long+'&#176;<br> <strong><em>Latitude : </em></strong>'+lat+'&#176;');
			   
			var circle=L.circle(layer.latlng,{radius : 15, color : '#fb000c', fillColor: '#f87171', fillOpacity: 0.7});
			LayerGroup.addLayer(marker);
			LayerGroup.addLayer(circle);
		}

		function notfoundLocation(layer){
			return alert('Unable to find you location. You may need to enable geolocation.')
		}

		function CallGeolocation(){
		
		// Map Event
		var geolococationButton = document.getElementById('geolocation-button');
		
		geolococationButton.onclick = function (){
			map.on('locationfound', foundLocation);
			map.on('locationerror', notfoundLocation);
			map.locate({setView: true, maxZoom: 18});
		
			}
		document.onkeyup = function(event){
			if (event.keyCode ==27){
				LayerGroup.clearLayers();
				map.off('click')

				}		
			}
		}


		window.onload = CallGeolocation;