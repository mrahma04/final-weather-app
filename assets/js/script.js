var cityInputEl = document.querySelector('#city-name')
var cityFormEl = document.querySelector('#city-form')

var todaysWeatherEl = document.querySelector('#todays-weather')

// var dayOneEl = document.querySelector('#day-one')
var forecastSectionEl = document.querySelector('#weather-section')
var forecastRowEl = document.querySelector('#forecast-row')

var apiKey = 'a08a76e0b432a1339ec48baaa41272b8'

var formSubmitHandler = function (event) {
    event.preventDefault()
    var city = cityInputEl.value.trim()

    if (city) {
        getWeather(city)
        cityInputEl.value = ''
    } else {
        alert('Please enter a City name')
    }
}

var getWeather = function (city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&units=imperial&appid=${apiKey}`
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            renderTodaysWeather(data)
            renderForecast(data)
        })
    })
}

var renderTodaysWeather = function (weather) {

    todaysWeatherEl.textContent = ''

    var todaysHeader = document.createElement('h5')
    todaysHeader.textContent = weather.city.name

    var temp = weather.list[0].main.temp
    var tempEl = document.createElement('p')
    tempEl.textContent = 'Temp: ' + temp + " \u2109"

    var windSpeed = weather.list[0].wind.speed
    var windEl = document.createElement('p')
    windEl.textContent = 'Wind: ' + windSpeed + ' MPH'

    var humidity = weather.list[0].main.humidity
    var humidityEl = document.createElement('p')
    humidityEl.textContent = 'Humidity: ' + humidity + '%'

    if (temp < 35) {
        todaysWeatherEl.style.backgroundColor = '#94d2bd'
    } else {
        todaysWeatherEl.style.backgroundColor = '#ee9b00'
    }

    todaysWeatherEl.classList.add('border', 'border-dark')
    todaysWeatherEl.append(todaysHeader, tempEl, windEl, humidityEl)

}

var renderForecast = function (forecast) {

    forecastRowEl.textContent = ''

    for (let i = 1; i < forecast.list.length; i++) {
        var parentDivEl = document.createElement('div')
        parentDivEl.classList.add('col')

        var childDivEl = document.createElement('div')
        childDivEl.classList.add('card', 'text-white', 'bg-dark')
        childDivEl.setAttribute('style', 'max-width: 12rem; min-height: 10rem')

        var tempEl = document.createElement('p')
        tempEl.textContent = 'Temp: ' + forecast.list[i].main.temp + " \u2109"

        var windEl = document.createElement('p')
        windEl.textContent = 'Wind: ' + forecast.list[i].wind.speed + ' MPH'

        var humidityEl = document.createElement('p')
        humidityEl.textContent = 'Humidity: ' + forecast.list[i].main.humidity + '%'

        childDivEl.append(tempEl, windEl, humidityEl)
        parentDivEl.append(childDivEl)

        forecastRowEl.append(parentDivEl)
    }
}

cityFormEl.addEventListener('submit', formSubmitHandler)