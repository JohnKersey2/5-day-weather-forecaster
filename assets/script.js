var searchBtn = document.querySelector('#searchBtn');
var cityInput = document.querySelector('#city');
var searchArea = document.querySelector('#search');
var currentWeather = document.querySelector('#currentWeather');
var forecast = document.querySelector('#forecast');

var today = dayjs().format('M/D/YYYY');

var citySelection = function (event) {
    event.preventDefault();
    
    var cityName = cityInput.value;
    
    console.log('this is my city', cityName);
    
    if (cityInput.clicked === true) {
        cityName;
    } 
    
    fetchCityData(cityName);            
    
    var cityArray = JSON.parse(localStorage.getItem('cityArray')) || [];
    if (cityArray.includes(cityName)) {
        return;
    } else {
        cityArray.push(cityName);
    }
    localStorage.setItem('cityArray', JSON.stringify(cityArray));
}

function fetchCityData(city) {
    var apiKey = '0a93a7893508c65e569c61c075959cba';
    var geoCodeUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&limit=1&appid=' + apiKey;
    currentWeather.innerHTML = '';
    forecast.innerHTML = '';
    fetch(geoCodeUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(weatherData) {
        console.log('this is my weather data', weatherData)
        var cityName = document.createElement('h2');
        var cityTemp = document.createElement('h2');
        var cityWind = document.createElement('h2');
        var cityHumidity = document.createElement('h2');
        var cityIconCode = weatherData.weather[0].icon;
        var latitude = weatherData.coord.lat;
        var longitude = weatherData.coord.lon;
        var weatherIcon = 'http://openweathermap.org/img/wn/' + cityIconCode + '@2x.png';
        
        var iconHouse = document.createElement('h2');
        iconHouse.innerHTML = '<img src="' + weatherIcon + '"' + '</img>';
        
        console.log(iconHouse)
        
        cityName.textContent = weatherData.name + ' (' + today + ')';
        currentWeather.append(cityName);
        currentWeather.append(iconHouse);
        
        cityTemp.textContent = 'Temperature: ' + Math.round((weatherData.main.temp-273.15) *9 /5 + 32) + '\xB0' + 'F';
        currentWeather.append(cityTemp);
        
        cityWind.textContent = 'Wind: ' + weatherData.wind.speed + ' MPH';
        currentWeather.append(cityWind);
        
        cityHumidity.textContent = 'Humidity: ' + weatherData.main.humidity + '%';
        currentWeather.append(cityHumidity);
        
        // get UV data
        var getUV = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude={part}&appid=' + 'f30dc0b71f772a037a522282770190be'
        fetch(getUV)
        .then(function (response) {
            return response.json();
        })
        .then(function(uvResponse) {
            console.log('this is the uv', uvResponse);
            
            for (var i = 0; i < 5; i++) {
                var weatherForecast = document.createElement('div');
                var forecastDate = document.createElement('h4');
                var forecastTemp = document.createElement('h4');
                var forecastWind = document.createElement('h4');
                var forecastHumidity = document.createElement('h4');
                var forecastIcon = uvResponse.daily[0].weather[0].icon;
                var iconURL = 'http://openweathermap.org/img/wn/' + forecastIcon + '@2x.png';
                console.log(forecastIcon);
                
                var iconHouse = document.createElement('h2');
                iconHouse.innerHTML = '<img src="' + iconURL + '"' + '</img>';
                console.log(iconHouse)
                
                forecast.append(weatherForecast);
                
                forecastDate.textContent = dayjs().add(i, 'day').format('M/D/YYYY');
                weatherForecast.append(forecastDate);
                weatherForecast.append(iconHouse);
                weatherForecast.classList.add('forecast-div');
                weatherForecast.classList.add('col');
                
                forecastTemp.textContent = 'Temp: ' + Math.round((uvResponse.daily[i].temp.day-273.15) *9 /5 + 32) + '\xB0' + 'F';
                weatherForecast.append(forecastTemp);
                
                forecastWind.textContent = 'Wind: ' + uvResponse.daily[i].wind_speed + ' MPH';
                weatherForecast.append(forecastWind);
                
                forecastHumidity.textContent = 'Humidity: ' + uvResponse.daily[i].humidity + '%';
                weatherForecast.append(forecastHumidity);
            }
        })
        
    })
    
}

// function createHistory() {
//     var searchedCity = cityInput.value
//     savedContainer = document.createElement('ul');
//     savedContainer.classList.add('previous-searches');
//     searchArea.removeChild(searchArea.lastChild);
//     searchArea.append(savedContainer);
//     if (searchedCity === '') {
//         alert('Please enter a city and click "Search"');
//         getCityHistory();
//         return;
//     }
    
//     var storage = JSON.parse(localStorage.getItem('cityArray'));
//     if(storage === null){
//         storage = [];
//     }
//     if (!storage.includes(searchedCity)) {
//         storage.push(searchedCity);
//     } else {
//         fetchCityData();
//     }
//     localStorage.setItem('cityArray', JSON.stringify(storage));
//     for (var i = 0; i < storage.length; i++) {
//         //create history buttons
//         var savedLi = document.createElement('button');
//         savedLi.textContent = storage[i];
//         savedLi.setAttribute('id', storage[i]);
//         savedContainer.append(savedLi);
//         savedLi.addEventListener('click', function (event) {
//             var clickedCity = event.target.id;
//             fetchCityData(clickedCity);
//         })
//     }
// }

// searchBtn.addEventListener('click', createHistory);
searchBtn.addEventListener('click', citySelection);