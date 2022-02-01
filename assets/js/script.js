var cityInputEl = document.querySelector('#city-name')
var cityFormEl = document.querySelector('#city-form')

var todaysWeatherEl = document.querySelector('#todays-weather')

var dayOneEl = document.querySelector('#day-one')

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
    console.log(weather)

    var todaysHeader = document.createElement('h5')
    todaysHeader.textContent = weather.city.name

    todaysWeatherEl.append(todaysHeader)

}

var renderForecast = function (forecast) {
    console.log(forecast)

    var tempEl = document.createElement('p')
    tempEl.textContent = 'Temp' + ': ' + forecast.list[1].main.temp

    dayOneEl.append(tempEl)

}

cityFormEl.addEventListener('submit', formSubmitHandler)