$(document).ready(function() {
  var long;
  var lat;
  var tempF;
  var tempC;
  var tempSwap;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      $("#data").html("latitude: " + lat + "<br>longitude: " + long);
      var api = 'https://api.darksky.net/forecast/26f81532eb94fc6b7191b1a3607c9475/'+lat+','+long;
      var apitown='https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=true';
      $.getJSON(apitown,function(town){
        var city=town.results[0].address_components[3].short_name;
        $("#city").html(city);
      });
      $.getJSON(api,function(data){
        var tempF=data.currently.temperature; // in Kelvin
        var wind=data.currently.windSpeed;//meter per second
        var windDeg=data.currently.windBearing;
        var weather=data.currently.summary;
        var tempC=Math.round((tempF-32)*(5/9));
        $("#weather").html(weather);
        $("#tempC").html(tempF+" C");
        //Change background-images and som styling depending on weather
        if(weather==="Clear"){
          $("body").css({"background":"url(images/clear.jpg)","background-size":"100% auto","color":"#2D4059"});
          $("h1").css({"color":"#EA5455"})
        }
        else if(weather==="Snow") {
          $("body").css({"background":"url(images/snow.jpg)","background-size":"auto auto","color":"#2D4059","background-position":"center","color":"#3F72AF"});
          $("h1").css({"color":"#112D4E"})
        }
        else if(weather==="Rain"){
          $("body").css({"background":"url(images/rain.jpg)","background-size":"100% auto","color":"white"});
          $("h1").css({"color":"#EAEAEA"})
        }
        else if (weather==="Clouds"){
          $("body").css({"background":"url(images/cloudy.jpg)","background-size":"100% auto","color":"#303841"});
          $("h1").css({"color":"#47555E"})
        }
        //switch from C to F
        $("#tempC").click(function(){
          if(tempSwap===false){
            $("#tempC").html(tempF+" F")
            tempSwap=true;
          }
          else{
            $("#tempC").html(tempC+" C");
            tempSwap=false;
          }
        });

        //$("#wind").html(wind+" m/s");


      });
    });
  }

});
