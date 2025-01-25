const apiKey = 'bd1b0d9c907f21d41c7e880436ab3832'; // Your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('search-input').value || 'Phnom Penh'; // Default to Phnom Penh if no input
    toggleLoading(true);
    try {
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);

        if (currentWeatherResponse.ok && forecastResponse.ok) {
            const currentWeather = await currentWeatherResponse.json();
            const forecast = await forecastResponse.json();

            displayCurrentWeather(currentWeather);
            displayForecast(forecast);

            // Store current weather and forecast data in localStorage
            storeWeatherData(currentWeather, forecast);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        alert('Failed to fetch weather data. Please try again later.');
    } finally {
        toggleLoading(false);
    }
}

function storeWeatherData(currentWeather, forecast) {
    const weatherData = {
        current: currentWeather,
        forecast: forecast,
        timestamp: new Date().getTime() // Save the timestamp of when data was stored
    };
    localStorage.setItem('weatherData', JSON.stringify(weatherData));
}

function loadStoredWeatherData() {
    const storedData = localStorage.getItem('weatherData');
    if (storedData) {
        const weatherData = JSON.parse(storedData);
        const currentWeather = weatherData.current;
        const forecast = weatherData.forecast;

        // Optionally check timestamp to see if data is still valid
        const now = new Date().getTime();
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        if (now - weatherData.timestamp < oneHour) {
            displayCurrentWeather(currentWeather);
            displayForecast(forecast);
        } else {
            console.log('Stored data is outdated. Fetching new data.');
            getWeather(); // Fetch new data if stored data is outdated
        }
    } else {
        console.log('No stored weather data found. Fetching default data.');
        getWeather(); // Fetch default weather data if nothing is in localStorage
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('weather-detail-today');
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; // Weather icon

    currentWeatherDiv.innerHTML = `
        <h2>Current Weather</h2>
        <p>
            <ion-icon name="location-outline"></ion-icon>
            Location: ${data.name}, ${data.sys.country}
        </p>
        <p>
            <ion-icon name="thermometer-outline"></ion-icon>
            Temperature: ${data.main.temp} °C
        </p>
        <p>
            <ion-icon name="partly-sunny-outline"></ion-icon>
            Weather: <img src="${weatherIcon}" alt="Weather icon" /> ${data.weather[0].description}
        </p>
        <p>
            <ion-icon name="water-outline"></ion-icon>
            Humidity: ${data.main.humidity}%
        </p>
        <p>
            <ion-icon name="wind-outline"></ion-icon>
            Wind Speed: ${data.wind.speed} m/s
        </p>
    `;
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('weather-detail-seven-day');
    forecastDiv.innerHTML = '<h2>7-Day Forecast</h2>';
    
    const dailyForecast = data.list.filter(item => item.dt_txt.includes("12:00:00")); // Get forecast at noon for each day

    dailyForecast.forEach(item => {
        const forecastIcon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`; // Weather icon
        forecastDiv.innerHTML += `
            <div class="forecast-card">
                <p>
                    <ion-icon name="calendar-outline"></ion-icon>
                    Date: ${new Date(item.dt * 1000).toLocaleDateString()}
                </p>
                <img src="${forecastIcon}" alt="Weather icon" />
                <p>
                    <ion-icon name="thermometer-outline"></ion-icon>
                    Temperature: ${item.main.temp} °C
                </p>
                <p>
                    <ion-icon name="partly-sunny-outline"></ion-icon>
                    Weather: ${item.weather[0].description}
                </p>
            </div>
        `;
    });
}

function toggleLoading(isLoading) {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
}

// Event Listeners
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
document.getElementById('search-button').addEventListener('click', getWeather); // Assuming there's a button to trigger search
document.getElementById('profile-icon').src = 'path/to/image.png';

// Load stored weather data on page load
document.addEventListener('DOMContentLoaded', loadStoredWeatherData);