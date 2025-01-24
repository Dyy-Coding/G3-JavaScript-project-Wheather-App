const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'bd1b0d9c907f21d41c7e880436ab3832';

// Fetch weather data and display results
async function fetchWeatherData(city) {
    const response = await fetch(`${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    return data;
}

async function fetchForecastData(lat, lon) {
    const response = await fetch(`${WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    return data;
}

async function fetchCitySuggestions(query) {
    const response = await fetch(`${WEATHER_API_URL}/find?q=${query}&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    return data.list || [];
}

async function displayWeather(city) {
    const mainContainer = document.querySelector('.main');
    mainContainer.innerHTML = ''; // Clear the main content

    const weatherData = await fetchWeatherData(city);

    if (weatherData.cod !== 200) {
        mainContainer.innerHTML = `<h2>City not found. Please try again.</h2>`;
        return;
    }

    // Extracting necessary data
    const { coord, main, weather } = weatherData;

    // Display today's weather with city name
    const todayWeather = `
        <div class="weather-card">
            <div class="weather-header">
                <h2>Weather in ${weatherData.name}</h2> <!-- Added city name here -->
                <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div class="temperature">
                <span class="temp">${main.temp}°C</span>
                <span class="condition">${weather[0].description}</span>
            </div>
            <div class="feels-like">
                <span>Feels like <strong>${main.feels_like}°C</strong></span>
            </div>
            <div class="details">
                <p>The skies will be partly cloudy. The low will be 22°.</p>
                <div class="info">
                    <div><strong>Wind:</strong> ${weatherData.wind.speed} km/h</div>
                    <div><strong>Humidity:</strong> ${main.humidity}%</div>
                    <div><strong>Visibility:</strong> ${weatherData.visibility / 1000} km</div>
                    <div><strong>Pressure:</strong> ${main.pressure} mb</div>
                    <div><strong>Dew point:</strong> ${main.dew_point}°</div>
                </div>
            </div>
        </div>
    `;

    // Display today's weather and 7-day forecast
    mainContainer.innerHTML += todayWeather;

    const forecastContainer = document.createElement('div');
    forecastContainer.classList.add('forecast-container');
    forecastContainer.innerHTML = `<h3>7-Day Forecast</h3>`;

    forecastData.daily.slice(1, 8).forEach((day) => {
        const forecastCard = `
            <div class="forecast-card">
                <h4>${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</h4>
                <p>Temp: High ${day.temp.max}°C / Low ${day.temp.min}°C</p>
                <p>Condition: ${day.weather[0].description}</p>
                <p>Humidity: ${day.humidity}%</p>
                <p>Wind: ${day.wind_speed} km/h</p>
            </div>
        `;
        forecastContainer.innerHTML += forecastCard;
    });

    mainContainer.appendChild(forecastContainer);
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('search-input').value.trim();
    if (city) {
        displayWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Event listener for input changes in the search bar
document.getElementById('search-input').addEventListener('input', async (event) => {
    const query = event.target.value.trim();
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    if (query.length > 0) {
        const suggestions = await fetchCitySuggestions(query);
        suggestions.forEach(city => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = `${city.name}, ${city.sys.country}`;
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.onclick = () => {
                document.getElementById('search-input').value = city.name; // Set input value
                displayWeather(city.name); // Fetch weather for the selected city
                suggestionsContainer.innerHTML = ''; // Clear suggestions
            };
            suggestionsContainer.appendChild(suggestionItem);
        });
    }
});