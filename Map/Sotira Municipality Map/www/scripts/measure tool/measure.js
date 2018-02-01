    // Creation of Measure Tool Buttton
         /* var div = document.createElement('div');
          var label = document.createElement('label');
          var input = document.createElement('input');

          input.setAttribute('type','button');
          input.setAttribute('id','distance-button');
          input.setAttribute('class','button');

          label.appendChild(input);
          div.appendChild(label);

      insertAfter(div, document.getElementById('button-wrapper-upper').lastElementChild);
  */
      // Variables
          var MatCoord= new Array();
          var dS= 0;
          var i=0;
          // the axis and the eccentricity were calculated base WGS84 datum (4326)
          var axis=6378137;
          var eccentricity=0.0818191908426215;
    



    // Calculations of Ellipsoid
    //------------------------------------------------------------------
      // It calculates the radius of a parallel at a specific latitude
  		function parallelRadius(N,latitude){
  				var r =N*Math.cos(latitude*(Math.PI/180));
  			return r ;
  		}

  		// It calculates the radius of the main vertical section. This estimation is used at the calculation of the radius of curvature of the meridian
  		function radiusofMainVerticalSection (axis, eccentricity, latitude){
  				var N= axis/(Math.sqrt(1-Math.pow(eccentricity,2)*Math.pow(Math.sin(latitude*Math.PI/180),2)));
  				return N;
  		}

  		// It calculates the radius of curvature of a desirable meridian. 
  		function radiusofCurvatureoftheMeridian (axis, eccentricity,latitude){
  				var ρ=axis*(1-Math.pow(eccentricity,2))/(Math.sqrt(Math.pow(1-Math.pow(eccentricity,2)*Math.pow(Math.sin(latitude*Math.PI/180),2),3)));
  				return ρ;
  		}

  		// The geometrical approximation of the distance between two different geographical points (Pythagorean theorem)
	    function radiusEstimation(dm,dp,r,ρ){
	        dm2 = Math.pow(dm,2);
	        dp2=Math.pow(dp,2);
	        r2=Math.pow(r,2);
	        ρ2=Math.pow(ρ,2);
	        dS = Math.sqrt(dm2*ρ2+dp2*r2);
	        return dS;
	      }

      // Polyline and Marker construction 
      //-------------------------------------------------------------------------------------------------

	    var PolylineFeatureGroup = L.featureGroup([]).addTo(map); // the feature group which will contain the constructed polylines
	      function polylineConstruction(f1,l1,f2,l2){
	      		var line =L.polyline([[f1,l1],[f2,l2]]).setStyle({ weight : 2, dashArray: 4});
	      		PolylineFeatureGroup.addLayer(line);
            return line;
	      }

      var MarkerFeatureGroup = L.featureGroup([]).addTo(map);
        function markerAddition(geojson){
          var marker =L.circleMarker(geojson.latlng,{weight: 1});
          /*var marker=L.marker(geojson.latlng, {
              icon : L.mapbox.marker.icon({
              'marker-size': 'small',
              'marker-symbol': 'marker-stroked',
              'marker-color': '#a5bf16'})
              , riseOnHover: true});*/
            MarkerFeatureGroup.addLayer(marker);
          return marker;
      }

      // Further functions
      //-------------------------------------------------------------------------------------------------------------------
       
      function FormInteraction(listElement,targetElement,dS){
       if (listElement.selectedIndex ==0){
              targetElement.value = dS.toFixed(2);
      }else if (listElement.selectedIndex ==1){
              targetElement.value = (dS/1000).toFixed(2);
      }else if (listElement.selectedIndex ==2){
              targetElement.value = (dS/1609.34).toFixed(2);
                }
      }

      function insertAfter(element, targetElement){
        var parent = targetElement.parentNode;
        var nextelement = targetElement.nextElementSibling;
            parent.insertBefore(element, nextelement);
      }


      // Form construction  
      //-------------------------------------------------------------------------------------------------
        var form = document.createElement('form');
        form.className = 'form';
        form.id = 'form-measure';

        var p1 = document.createElement('p');
        p1.innerHTML = '<strong>Η υπολογιζόμενη απόσταση είναι: </strong>';
        form.appendChild(p1);

        var hr = document.createElement('hr');
        form.appendChild(hr);


        var p1 = document.createElement('p');
        var label1 = document.createElement('label');
            label1.innerHTML = '<em>Απόσταση Τμήματος :</em>';
        var inLength1 = document.createElement('input');
        inLength1.type = 'text';
        inLength1.value = 0;
        inLength1.className = 'text-container';

        var selectList1 = document.createElement('select');
        selectList1.size = 1;
        selectList1.name = 'distanceUnitList';

        var opt1 = document.createElement('option');
        opt1.name = 'meters';
        opt1.setAttribute('selected','selected')
        opt1.innerHTML = 'μέτρα';
        var opt2 = document.createElement('option');
        opt2.name = 'kilometers';
        opt2.innerHTML = 'χιλιόμετρα';
        var opt3 = document.createElement('option');
        opt3.name = 'miles';
        opt3.innerHTML = 'μίλια';

        selectList1.appendChild(opt1);
        selectList1.appendChild(opt2);
        selectList1.appendChild(opt3);

        var p2 = document.createElement('p');
        var label2 = document.createElement('label');
            label2.innerHTML = '<em>Συνολική Απόσταση :</em>';
        var inLength2 = document.createElement('input');
        inLength2.type = 'text';
        inLength2.value = 0;
        inLength2.className = 'text-container';

        var selectList2 = document.createElement('select');
        selectList2.size = 1;
        selectList2.name = 'areaUnitList';
         var opt1 = document.createElement('option');
        opt1.name = 'squared-meters';
        opt1.innerHTML = 'μέτρα';
        opt1.setAttribute('selected','selected')
        var opt2 = document.createElement('option');
        opt2.name = 'squared-kilometers';
       
        opt2.innerHTML = 'χιλιόμετρα';
        var opt3 = document.createElement('option');
        opt3.name = 'squared-miles';
        opt3.innerHTML = 'μίλια';

        selectList2.appendChild(opt1);
        selectList2.appendChild(opt2);
        selectList2.appendChild(opt3);

        var p3 = document.createElement('p');
        p3.innerHTML = '<em>Χρησιμοποιώντας το κουμπί ESC δύναται να ακυρωθεί η λειτουργία.</em>'
        p3.className = 'note';

        p1.appendChild(label1);
        p1.appendChild(inLength1);
        p1.appendChild(selectList1);
        form.appendChild(p1);

        p2.appendChild(label2);
        p2.appendChild(inLength2);
        p2.appendChild(selectList2);
        form.appendChild(p2);

        form.appendChild(p3);

      function addition(a,b){
        return a+b;
      }
      

      var first_textbox = form.elements[0];
      var first_list = form.elements[1];
      var second_textbox = form.elements[2];
      var second_list = form.elements[3];
      // Main Function
      //----------------------------------------------------------------------------------------------------------------------
      document.getElementById('distance-button').addEventListener("click" , function (){

      var MatCoord=[];
      var dS= 0;
      var sumdS=0;
      var i=0;
      var start=0;
      PolylineFeatureGroup.clearLayers();
      MarkerFeatureGroup.clearLayers();
      first_textbox.value=0; 
      second_textbox.value=0;
      
      // Addition of the form
      document.body.appendChild(form);
        
      // Map Event
      map.on('click', function (geojson){
      markerAddition(geojson); // marker function
      // console.log(marker);
          var coordinates = geojson.latlng.toString();
          long = parseFloat(coordinates.split(',')[1]);
          lat = parseFloat(coordinates.split('(')[1]);
          MatCoord[i]=[lat,long];

        
        if (MatCoord.length > 1){
          var index = i-1; 

              var latitude =MatCoord[index][0]; // the latitude of the first point -  Finding the mean of the specified latitudes, a better approximation can be done.

              // the radius of the main vertical section
              var N = radiusofMainVerticalSection(axis,eccentricity,latitude);

              // the radius of the parallel
              var r = parallelRadius(N,latitude);

              // the radius of curvature of the meridian
              var ρ = radiusofCurvatureoftheMeridian(axis,eccentricity,latitude);

              f1 = MatCoord[index][0];
              l1 = MatCoord[index][1];
              f2 = MatCoord[index+1][0];
              l2 = MatCoord[index+1][1];
              var dp = (l2-l1)*(Math.PI/180);
              var dm = (f2-f1)*(Math.PI/180);

              dS= radiusEstimation(dm,dp,r,ρ); //meters
              sumdS=addition(dS,start); // sum
              start+=dS; 

              // Calls polyline function which construct the polyline
              polylineConstruction(f1,l1,f2,l2);
              

              FormInteraction(first_list,first_textbox,dS);
              FormInteraction(second_list,second_textbox,sumdS);

              first_list.onchange = function(){
                  FormInteraction(this,first_textbox,dS)
              }

              second_list.onchange = function(){
                  FormInteraction(this,second_textbox,sumdS)
              }

              // pressing escape(ESC) button, the form will be substracted
              document.body.onkeyup = function(event){
                  if (event.keyCode ==27){ 
                      //form.reset()
                      map.off('click'); // it disables click event
                      form.remove();
                      PolylineFeatureGroup.clearLayers();
                      MarkerFeatureGroup.clearLayers();
                  }else {
                    return false;
                  }
                 }


              }
             
            i++
          }
        )
      });


