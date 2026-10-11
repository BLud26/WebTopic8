let weatherUrl = 'https://api.weather.gov/gridpoints/MPX/116,72/forecast'

let weatherTable = document.querySelector('#weather-forecast')

fetch(weatherUrl)
    .then( response => response.json()
    )
    .then( weatherJson => {
        displayWeatherTable(weatherJson)
    })
    .catch(error => {
        console.log(error)
        alert('Sorry, could not get weather forecast')
    })

function displayWeatherTable(weatherJson) {
    //console.log(weatherJson)
    let forecastArray = weatherJson.properties.periods
    console.log(forecastArray)

    // Get period name (day of the week) and add to the table
    forecastArray.forEach( forecastPeriodsData => {
        let tableRow = document.createElement('tr')
        console.log(forecastPeriodsData)
        let periodName = forecastPeriodsData.name
        console.log(periodName)

        let periodNameTableData = document.createElement('td')
        periodNameTableData.innerHTML = periodName

        tableRow.appendChild(periodNameTableData)

        //Get temperature, create td and add to table row
        let temperature = forecastPeriodsData.temperature
        let temperatureUnit = forecastPeriodsData.temperatureUnit
        let temperatureTableData = document.createElement('td')
        temperatureTableData.innerHTML = temperature + temperatureUnit
        tableRow.appendChild(temperatureTableData)

        // Add weather icon
        let weatherIconSource = forecastPeriodsData.icon
        let weatherIconTableData = document.createElement('td')
        let weatherIconImage = document.createElement('img')
        weatherIconImage.src = weatherIconSource
        weatherIconTableData.appendChild(weatherIconImage)
        tableRow.appendChild(weatherIconTableData)


        // Add weather description
        let detailedForecast = forecastPeriodsData.detailedForecast
        let detailedForecastTableDate = document.createElement('td')
        detailedForecastTableDate.innerHTML = detailedForecast
        tableRow.appendChild(detailedForecastTableDate)

        // Part two of lab

        // Add wind information

        let windSpeed = forecastPeriodsData.windSpeed
        let windDirection = forecastPeriodsData.windDirection
        let windDataInfo = windSpeed + ' ' + windDirection

        // Create the td and add it to the row
        let windTableData = document.createElement('td')
        windTableData.innerText = windDataInfo
        tableRow.appendChild(windTableData)

        // Add table row to the table
        weatherTable.appendChild(tableRow)

    })
}