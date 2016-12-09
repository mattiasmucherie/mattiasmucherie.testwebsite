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
      var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=2d12979ca35fb09e69909e4a89ac1f2f';
      $.getJSON(api,function(data){
        var city=data.name;
        var tempK=data.main.temp; // in Kelvin
        var wind=data.wind.speed;//meter per second
        var windDeg=data.wind.deg;
        var weather=data.weather[0].main;
        tempF=Math.round(tempK*(9/5)-459.67);
        tempC=Math.round(tempK-272.15);
        $("#city").html(city);
        $("#weather").html(weather);
        $("#tempC").html(tempC+" C");
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

        $("#wind").html(wind+" m/s");


      });
    });
  }

});
