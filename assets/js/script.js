var button = document.getElementById('btn');
var input = document.getElementById('input');
var fiveDayEl = document.getElementById('fiveDay');

var getWeatherData = function () {
  var city = input.value;
  var geoUrl =
    'http://api.openweathermap.org/geo/1.0/direct?q=' +
    city +
    '&limit=1&appid=6b71a8d8c70f361a926ff11e14b5abf8';
  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      var oneUrl =
        'https://api.openweathermap.org/data/2.5/onecall?lat=' +
        lat +
        '&lon=' +
        lon +
        '&appid=6b71a8d8c70f361a926ff11e14b5abf8&units=imperial';
      fetch(oneUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var uvIndex = document.getElementById('uv-index');
          document.getElementById('city-name').innerText = city;
          document.getElementById('temp').innerText =
            'Temp: ' + data.current.temp;
          document.getElementById('wind').innerText =
            'Wind: ' + data.current.wind_speed;
          document.getElementById('humidity').innerText =
            'Humidity: ' + data.current.humidity;
          var uvi = data.current.uvi;
          if (uvi <= 2) {
            uvIndex.style.backgroundColor = 'green';
          }
          if (uvi >= 3 && data.current.uvi <= 5) {
            uvIndex.style.backgroundColor = 'yellow';
          }
          if (uvi >= 6 && data.current.uvi <= 7) {
            uvIndex.style.backgroundColor = 'orange';
          }
          if (uvi > 7) {
            uvIndex.style.backgroundColor = 'red';
          }

          uvIndex.innerText = 'UVI: ' + uvi;
          document.getElementById('icon').src =
            'http://openweathermap.org/img/wn/' +
            data.current.weather[0].icon +
            '@2x.png';
          fiveDay(data.daily);
        });
    });
};

function fiveDay(data) {
  console.log(data);
  for (let index = 1; index < 6; index++) {
    var div = document.createElement('div');
    var date = document.createElement('p');
    var temp = document.createElement('p');
    var wind = document.createElement('p');
    var humidity = document.createElement('p');
    var uvIndex = document.createElement('p');
    var img = document.createElement('img');

    date.textContent = moment.unix(data[index].dt).format('[Date:] MM/DD/YYYY');
    temp.textContent = 'Temp: ' + data[index].temp.day;
    wind.textContent = 'Wind: ' + data[index].wind_speed;
    humidity.textContent = 'Humidity: ' + data[index].humidity;
    console.log(data[index].uvi);
    if (data[index].uvi <= 2) {
      uvIndex.style.backgroundColor = 'green';
    }
    if (data[index].uvi >= 3 && data[index].uvi <= 5) {
      uvIndex.style.backgroundColor = 'yellow';
    }
    if (data[index].uvi >= 6 && data[index].uvi <= 7) {
      uvIndex.style.backgroundColor = 'orange';
    }
    if (data[index].uvi > 7) {
      uvIndex.style.backgroundColor = 'red';
    }

    uvIndex.textContent = 'UVI: ' + data[index].uvi;
    img.src =
      'http://openweathermap.org/img/wn/' +
      data[index].weather[0].icon +
      '@2x.png';
    div.append(date, temp, wind, humidity, uvIndex, img);
    fiveDayEl.append(div);
  }
}

button.addEventListener('click', getWeatherData);
