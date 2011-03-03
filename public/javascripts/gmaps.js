
$(document).ready(function() {

	$("#form h1").toggle(
	  function () {
		// $('#form').css({"height" : "auto", "width" : "auto"});
		$('#form ul').fadeIn(900);
		$('#form').animate({"height" : "180px", "width" : "400px"}, 300);
	  },
	  function () {
		// $('#form').css({"height" : "11px", "width" : "114px"});
		$('#form ul').hide();
		$('#form').animate({"height" : "11px", "width" : "114px"}, 200);
	  }
	);
	
	$.getJSON("/couples/", function(data) {
		initialize2(data);
	});
});


function initialize2(relationships) {
	var image = "/images/marker_sprite.png";
	var ltlng = new google.maps.LatLng(32.318231, -86.902298);
	var myOptions = {
		zoom: 2,
		disableDefaultUI: true,
		center: ltlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map_canvas"),	myOptions);
	var bounds = new google.maps.LatLngBounds();
	var randomRelationship = relationships[rand(0, relationships.length-1)];
	var location_1 = new google.maps.LatLng(randomRelationship.couple.lat_1, randomRelationship.couple.long_1);
	var location_2 = new google.maps.LatLng(randomRelationship.couple.lat_2, randomRelationship.couple.long_2);
	
	bounds.extend(location_1);
	bounds.extend(location_2);
	
	for (var i=0; i < relationships.length; i++) {
		var relationshipCoordinates = [
		    new google.maps.LatLng(relationships[i].couple.lat_1, relationships[i].couple.long_1),
		    new google.maps.LatLng(relationships[i].couple.lat_2, relationships[i].couple.long_2)
		  ];
				
		// var color = '#'+('00000'+(Math.random()*16777216<<0).toString(16)).substr(-6);
		var color = "#A01B33";
		
		  var relationshipPath = new google.maps.Polyline({
		    path: relationshipCoordinates,
			 geodesic: true,
			 strokeColor: color,
		    strokeOpacity: 0.4,
		    strokeWeight: 3
		  });
		
		highlightPoly(relationshipPath);
		relationshipPath.normalStyle = color;
		
		  var marker = new google.maps.Marker({
		      position: relationshipCoordinates[0], 
		      title: relationships[i].couple.name_1,
				icon: image
		  });
		
		  var marker2 = new google.maps.Marker({
		      position: relationshipCoordinates[1], 
		      title: relationships[i].couple.name_2,
				icon: image
		  });

			marker.setMap(map);
			marker2.setMap(map);
			relationshipPath.setMap(map);
	};
	map.fitBounds(bounds);
}

function highlightPoly(poly) {
    google.maps.event.addListener(poly,"mouseover",function() {
      poly.setOptions({strokeOpacity: 1});
    });
    google.maps.event.addListener(poly,"mouseout",function() {
      poly.setOptions({strokeOpacity: 0.4});
    });
}


function rand(min, max) {
  var offset = min;
  var range = (max - min) + 1;
  var randomNumber = Math.floor( Math.random() * range) + offset;
  return randomNumber;
}