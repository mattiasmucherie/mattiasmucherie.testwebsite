$(document).ready(function() {
  var long;
  var lat;
  var tempF;
  var tempC;
  var tempSwap;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lon = position.coords.longitude;
      var lat = position.coords.latitude;
      //$("#city").html("latitude: " + lat + "<br>longitude: " + long);
      weatherAPI(lat,lon);
    });
  }
});

function weatherAPI(lat, lon) {
	var site = "https://api.wunderground.com/api/";
	var api = "b6782fd8fe696886"
	var con = "/conditions/q/"
	var format = ".json"
	var url = site + api + con + lat + "," + lon + format;

	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		contentType: "application/json",
		dataType: 'jsonp',
		// On success, present local info/weather.
		success: function(jsonResponse) {
			json = jsonResponse;
			var gotLoc = json.current_observation.display_location.city;
      var gotType = json.current_observation.weather;
      var gotTempC = Math.round(json.current_observation.temp_c); // Celsius.
			var gotTempF = Math.round(json.current_observation.temp_f);
			$("#city").html(gotLoc); // Show location.
      $("#weather").html(gotType);
      degreeUnit=" C";
      $("#temp").html(gotTempC +degreeUnit);
      $("#temp").click(function() {
      	switch (degreeUnit) {
      		case (" C"):
      			degreeUnit = " F";
            $("#temp").html(gotTempF+" F");
      			break;
      		case (" F"):
      			degreeUnit = " C";
            $("#temp").html(gotTempC+" C");
      			break;
      	}
      });
      if(gotType==="Clear"){
        $("body").css({"background":"url(images/clear.jpg)","background-size":"100% auto","color":"#2D4059"});
        $("h1").css({"color":"#EA5455"})
      }
      else if(gotType==="Snow") {
        $("body").css({"background":"url(images/snow.jpg)","background-size":"auto auto","color":"#2D4059","background-position":"center","color":"#3F72AF"});
        $("h1").css({"color":"#112D4E"})
      }
      else if(gotType==="Rain"|| gotType==="Light Rain" || gotType==="Light Rain Showers" ){
        $("body").css({"background":"url(images/rain.jpg)","background-size":"100% auto","color":"white"});
        $("h1").css({"color":"#EAEAEA"})
      }
      else if (gotType==="Clouds"){
        $("body").css({"background":"url(images/cloudy.jpg)","background-size":"100% auto","color":"#303841"});
        $("h1").css({"color":"#47555E"})
      }


		}
	});
}
