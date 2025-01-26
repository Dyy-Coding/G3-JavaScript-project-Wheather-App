const API_KEY = "bd1b0d9c907f21d41c7e880436ab3832";

// Function to fetch and display weather data
async function fetchWeatherData(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        displayWeatherData(data);  // Display the fetched weather data

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to display weather data on the page
function displayWeatherData(data) {
    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.innerHTML = `
        <div class="city">${data.location.name}<br><small>${data.location.country}</small></div>
        <div class="temperature">${data.current.temp_c}°</div>
    `;
}

// Event listener to handle search input
document.getElementById('location-input').addEventListener('input', function() {
    const location = this.value.trim();
    if (location) {
        fetchWeatherData(location);
    }
});

// Example usage: Call the function with a default location initially
fetchWeatherData('Phnom Penh');
