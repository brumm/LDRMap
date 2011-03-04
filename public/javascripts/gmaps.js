
$(document).ready(function() {
		
	$("form").live("submit", function() {
		$("input[type=submit]").attr('disabled', 'disabled');
		console.log("should be disabled");
	});

	$("#form h1").toggle(
	  function () {
		$('#form ul').fadeIn(900);
		$('#form').animate({"height" : "180px", "width" : "400px"}, { "duration" : "300", "easing" : "easeOutCubic"});
		$('#form h1').addClass("closeButton");
		$('#form h1').animate({"margin-right" : "18px"}, { "duration" : "300", "easing" : "easeOutCubic"});
		
		$('#list').animate({"bottom" : "10px"}, { "duration" : "300", "easing" : "easeOutCubic"});
	  },
	  function () {
		$('#form ul').hide();
		$('#form h1').removeClass("closeButton");
		$('#form h1').animate({"margin-right" : "0px"}, { "duration" : "300", "easing" : "easeOutCubic"});
		$('#form').animate({"height" : "11px", "width" : "114px"}, { "duration" : "300", "easing" : "easeOutCubic"});
		$('#list').animate({"bottom" : "-130px"}, { "duration" : "300", "easing" : "easeOutCubic"});
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
		panControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		center: ltlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var map = new google.maps.Map(document.getElementById("map_canvas"),	myOptions);
	var bounds = new google.maps.LatLngBounds();
	var randomRelationship = relationships[rand(0, relationships.length-1)];
	var location_1 = new google.maps.LatLng(randomRelationship.couple.lat_1, randomRelationship.couple.long_1);
	var location_2 = new google.maps.LatLng(randomRelationship.couple.lat_2, randomRelationship.couple.long_2);
	
	var infowindow = new google.maps.InfoWindow();
	
	bounds.extend(location_1);
	bounds.extend(location_2);
	
	list = $('#list ol');
	
	for (var i=0; i < relationships.length; i++) {
		var relationshipCoordinates = [
			new google.maps.LatLng(relationships[i].couple.lat_1, relationships[i].couple.long_1),
			new google.maps.LatLng(relationships[i].couple.lat_2, relationships[i].couple.long_2)
		];

		var relationshipPath = new google.maps.Polyline({
			path: relationshipCoordinates,
			geodesic: true,
			strokeColor: "#607082",
			strokeOpacity: 0.5,
			strokeWeight: 4
		});
				
		content = relationships[i].couple.name_1 + " & " + relationships[i].couple.name_2 + "<br />" + relationships[i].couple.address_1 + " & " + relationships[i].couple.address_2 + "<br />" + relationships[i].couple.distance + " miles";
			
			highlightPoly(relationshipPath);
			pantoPoly(relationshipPath, map, relationshipCoordinates[0], relationshipCoordinates[1], infowindow, content)
			relationshipPath.setMap(map);
	};
	map.fitBounds(bounds);
	
	google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
   });
}

function	pantoPoly(poly, map, ltlng1, ltlng2, infowindow, content) {
	var bounds = new google.maps.LatLngBounds();
	bounds.extend(ltlng1);
	bounds.extend(ltlng2);

	google.maps.event.addListener(poly, "click", function() {
		
		infowindow.setOptions({
			content: content,
			position: bounds.getCenter()
		});
		
		infowindow.open(map);
		
		map.fitBounds(bounds);
		poly.setOptions({"strokeColor" : "#9F1B32", "strokeOpacity" : "1"});
   });
}

// function highlightPoly(poly, marker, marker2) {
function highlightPoly(poly) {
    google.maps.event.addListener(poly, "mouseover", function() {
		// marker.setVisible(true);
		// marker2.setVisible(true);
      poly.setOptions({"strokeColor" : "#9F1B32", "strokeOpacity" : "1"});
    });
    google.maps.event.addListener(poly,"mouseout",function() {
		// marker.setVisible(false);
		// marker2.setVisible(false);
      poly.setOptions({"strokeColor" : "#607082", "strokeOpacity" : "0.5"});
    });
}


function rand(min, max) {
  var offset = min;
  var range = (max - min) + 1;
  var randomNumber = Math.floor( Math.random() * range) + offset;
  return randomNumber;
}