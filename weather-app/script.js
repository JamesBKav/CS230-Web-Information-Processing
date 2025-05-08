let weatherData = [];

async function loadWeatherData() {
    const response = await fetch('sample.json');
    weatherData = await response.json();
}

function fetchWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const cityData = weatherData.find(data => data.cityName.toLowerCase() === city.toLowerCase());

    if (cityData) {
        localStorage.setItem("weatherData", JSON.stringify(cityData));
        alert("Weather data loaded! Navigate to the respective pages.");
    } else {
        alert("City not found.");
    }
}

function displayWeatherData() {
    const cityData = JSON.parse(localStorage.getItem("weatherData"));

    if (!cityData) return;

    // Update temperature
    if (document.getElementById('temperature')) {
        document.getElementById('temperature').textContent = `${cityData.temperatureCelsius}°C`;
        
        document.getElementById('thermometerFill').setAttribute(
            'fill',
            cityData.temperatureCelsius > 20 ? 'yellow' : 'blue'
        );
        
        if (cityData.temperatureCelsius > 20) {
            document.body.style.backgroundColor = "yellow"; // Color for numbers > 20
        } else {
            document.body.style.backgroundColor = "blue"; // Color for numbers ≤ 20
        }
    }

    // Update humidity
    if (document.getElementById('humidity')) {
        document.getElementById('humidity').textContent = `${cityData.humidity * 100}%`;
        document.getElementById('dropIcon').style.color = cityData.humidity > 0.7 ? 'blue' : 'gray';
        if(cityData.humidity > 0.7){
            document.body.style.backgroundColor = "blue";
        }else{
            document.body.style.backgroundColor = "grey";
        }
    }

    // Update UV Index
    if (document.getElementById('uvIndex')) {
        document.getElementById('uvIndex').textContent = cityData.uvIndex;
        document.getElementById('uvFill').setAttribute(
            'fill',
            cityData.uvIndex > 5 ? 'red' : 'orange'
        );
        if(cityData.uvIndex > 5){
            document.body.style.backgroundColor = "red";
        }else{
            document.body.style.backgroundColor = "Orange";
        }
    }

    // Update wind speed
    if (document.getElementById('windSpeed')) {
        document.getElementById('windSpeed').textContent = cityData.windSpeed;
        document.getElementById('windIcon').style.color = parseInt(cityData.windSpeed) > 20 ? 'red' : 'gray';
        console.log(cityData.windSpeed)
        if(parseInt(cityData.windSpeed) > 20){
            document.body.style.backgroundColor = "red";
        }else{
            document.body.style.backgroundColor = "grey";
        }
    }
}

function toggleTemperature() {
    const tempElement = document.getElementById('temperature');
    const tempText = tempElement.textContent;
    const checkbox = document.querySelector('.cb'); // Select the toggle switch

    // Retrieve the stored temperature in Celsius from localStorage
    const cityData = JSON.parse(localStorage.getItem("weatherData"));
    if (!cityData) return;

    let temperatureC = cityData.temperatureCelsius;

    if (checkbox.checked) {
        // Convert to Fahrenheit
        const temperatureF = (temperatureC * 9/5) + 32;
        tempElement.textContent = `${temperatureF.toFixed(1)}°F`;
    } else {
        // Display Celsius
        tempElement.textContent = `${temperatureC}°C`;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    loadWeatherData();
    displayWeatherData();
});
