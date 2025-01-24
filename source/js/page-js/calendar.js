const API_KEY = "bd1b0d9c907f21d41c7e880436ab3832";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const defaultCity = "Phnom Penh";
function fetchWeather(city) {
    const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
    fetch(url)
        .then((response) => response.json()) // Convert the response to JSON
        .then((data) => {
            updateWeatherUI(data);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

// Function to update the current weather UI
function updateWeatherUI(data) {
    const { name, weather, main, sys } = data;
    const temperature = Math.round(main.temp);
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    // Update the weather panel
    document.getElementById("weather-date").textContent = currentDate;
    document.getElementById("weather-temperature").textContent = `${temperature}°C`;
    // document.getElementById("weather-icon").src = getImageByTemperature(temperature);
    // document.getElementById("weather-icon").alt = weather[0].description;
    document.getElementById("sunrise-time").textContent = sunrise;
    document.getElementById("sunset-time").textContent = sunset;
}


// ---------------------------------------- change image here --------------------------------
function getImageByTemperature(temp) {
    if (temp >= 30) {
        return "../../assets/weathers/sun.png"; // Hot and sunny
    } else if (temp >= 20 && temp < 30) {
        return "../../assets/weathers/cloud.png"; // Warm and cloudy
    } else if (temp >= 10 && temp < 20) {
        return "../../assets/image-icon/sunrise.png"; // Cool and rainy
    } else {
        return "../../assets/image-icon/sunset.png"; // Cold and snowy
    }
}

// to Highlight current date that style in calendar.css line 456
document.addEventListener("DOMContentLoaded", function () {
    const today = new Date();
    const localDate = new Date(today.toLocaleString("en-US", { timeZone: "Asia/Phnom_Penh" })); // Get today's date in the Cambodia time zone (Asia/Phnom_Penh)

    // Extract the local date in "YYYY-MM-DD" format  from stack overflow
    const todayString = localDate.getFullYear().toString().padStart(4, '0') + '-' +
        (localDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
        localDate.getDate().toString().padStart(2, '0');
    const todayElement = document.querySelector(`[data-date="${todayString}"]`);
    if (todayElement) {
        todayElement.classList.add("active");
    }
});


fetchWeather(defaultCity);
