var button = document.getElementById("btn")
var input = document.getElementById("input")

button.addEventListener("click", function(){
    var city = input.value
    var geoUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=6b71a8d8c70f361a926ff11e14b5abf8"
    fetch(geoUrl).then(function(response){
        return response.json()
    }).then(function(data){
        var lat = data[0].lat
        var lon = data[0].lon
    var oneUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=6b71a8d8c70f361a926ff11e14b5abf8&units=imperial"
    fetch(oneUrl).then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
        document.getElementById("city-name").innerText=city
        document.getElementById("temp").innerText=data.current.temp
        document.getElementById("wind").innerText=data.current.wind_speed
        document.getElementById("humidity").innerText=data.current.humidity
        document.getElementById("uv-index").innerText=data.current.uvi
    function fiveDay (data) {
        for (var i = 0; i < 5; i++) {
            var fiveDay = {
                date: convertUnixTime(data, i), 
                icon: "http://openweathermap.org/img/wn/" + data.daily[i + 1].weather[0].icon + "@2x.png",
                temp: data.daily[i + 1].temp.day.toFixed(1),
                humidity: data.daily[i +1].humidity
            }
    }
    }
    })
})