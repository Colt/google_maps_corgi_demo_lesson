  function initialize() {

    var mapOptions = {
      center: { lat: 37.7597727, lng: -122.427063},
      zoom: 12
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

      var request = $.ajax({
		  	url: "/pins",
		  	type: "GET",
		  	dataType: "json"
	  	});

	  request.done(function(data){
	  	console.log(data)
	  	addPins(data);
	  });

	  function addPins(data){
	  	for(var i = 0; i < data.length; i++){
	  		var myLatlng = new google.maps.LatLng(data[i].lat, data[i].lng);
	  		createPin(myLatlng)
	  	}
	  }

	  function createPin(myLatlng){
	  	var marker = new google.maps.Marker({
		    position: myLatlng,
		    map: map,
		    title:"Hello World!",
		    icon: "http://img3.wikia.nocookie.net/__cb20120603114524/hiddenchronicles/images/e/ed/HO_DogPark_Corgi-icon.png"
			});

	  }

	  google.maps.event.addListener(map, 'click', function(event) {
	  	console.log(event.latLng.B)
	  	var click_lat = event.latLng.k;
	  	var click_lng = event.latLng.B

	  	var loc = {"pin" : {lat: click_lat , lng: click_lng }}
	  	 var request = $.ajax({
		  	url: "/create",
		  	type: "POST",
		  	data: loc,
		  	dataType: "json"
	  	});

	  	 request.done(function(data){
	  	 	console.log(data)
	  	 	var myLatlng = new google.maps.LatLng(data.lat, data.lng);
	  	 	createPin(myLatlng);
	  	 })
  	});

  	$('button').click(function(e){
  		var address = $('input').val();
  		// e.preventDefault();
  		// alert(address);
// 1600+Amphitheatre+Parkway,+Mountain+View,+CA
	var geo_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=YOUR_API_KEY"

  		var request = $.ajax({
		  	url: geo_url,
		  	type: "GET",
		  	dataType: "json"
	  	});

	  	request.done(function(data){
	  		console.log(data)
	  		if(data.results.length == 0){
	  			alert("INVALID ADDRESS")
	  		}
	  		else{
		  		var geo_lat = data.results[0].geometry.location.lat;
		  		var geo_lng = data.results[0].geometry.location.lng;

		  		var loc = {"pin" : {lat: geo_lat , lng: geo_lng }};
		  	 	var request = $.ajax({
				  	url: "/create",
				  	type: "POST",
				  	data: loc,
				  	dataType: "json"
		  		});

		  		request.done(function(data){
		  			console.log("CREATING PIN");
		  			var myLatlng = new google.maps.LatLng(data.lat, data.lng);
		  	 		createPin(myLatlng);
		  		});
		  	}
	  	})
  	});
  }

  google.maps.event.addDomListener(window, 'load', initialize);