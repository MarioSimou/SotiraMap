// Routing
      var routingButton = document.getElementById('routing-button');

      var i=0;
 	  var coordArray = new Array();
      routingButton.onclick = function(){
      	map.openPopup('<h2>Οδηγίες λειτουργίας</h2><hr> <p>Η εξής λειτουργία είναι ικανή να εντοπίση την <em>διαδρομή μεταξύ δύο σημείων</em>. Επομένως, κάνοντας κλικ σε δύο <strong>διαφορετικές</strong> τοποθεσίες, η εφαρμογή εντοπίζει την κατάλληλη διαδρομή για την μετάβαση από το ένα σημείο στο άλλο.</p><p>Μετακινώντας τα σημεία δύναται να μεταβληθούν οι θέσεις τους.</p>',[35.00947, 33.90329]);
 			

      		map.on('click', function(e){
      			
	          var coordinates = e.latlng.toString();
	          long = parseFloat(coordinates.split(',')[1]);
	          lat = parseFloat(coordinates.split('(')[1]);
	          MatCoord[i]=[lat,long];
	

	         i++ 

	          if (MatCoord.length == 2){
      			index = i-2;

      			var RoutingControl=L.Routing.control({
					waypoints: [
					    L.latLng(MatCoord[index][0],MatCoord[index][1]),
					    L.latLng(MatCoord[index+1][0], MatCoord[index+1][1])
					  ],
					  geocoder: L.Control.Geocoder.nominatim(),
			          routeWhileDragging: true
					}).addTo(map);
			      		}else {
			      			return false;
			      		}
			    // remove of Routing Control
			    document.onkeyup = function(event){
      			if (event.keyCode == 27){
      				map.removeControl(RoutingControl);	
      				location.reload();
      			}
      		}

      		});


     		
      }