
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
	
	
	for (var i=0; i < relationships.length; i++) {
		var relationshipCoordinates = [
		    new google.maps.LatLng(relationships[i].couple.lat_1, relationships[i].couple.long_1),
		    new google.maps.LatLng(relationships[i].couple.lat_2, relationships[i].couple.long_2)
		  ];
		
		  var relationshipPath = new google.maps.Polyline({
		    path: relationshipCoordinates,
			 geodesic: true,
			 strokeColor: "#9C1A31",
		    strokeOpacity: 0.8,
		    strokeWeight: 4
		  });
		
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
			
			bounds.extend(relationshipCoordinates[0]);
			bounds.extend(relationshipCoordinates[1]);
	};
	map.fitBounds(bounds);
}

// function getCoordinates(address, map) {
// 	geocoder = new google.maps.Geocoder();
// 	geocoder.geocode( { 'address': address}, function(results, status) {		
// 	if (status == google.maps.GeocoderStatus.OK) {
// 		var marker = new google.maps.Marker({
//           map: map, 
//           position: results[0].geometry.location
//       });
//       marker.setMap(map);
// 	}
// 	});
// }
