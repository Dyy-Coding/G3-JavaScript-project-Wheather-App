const API_KEY = "bd1b0d9c907f21d41c7e880436ab3832";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

// ---------------------------------------- Variable --------------------------------
const cityElement = document.querySelector(".day");
const conditionElement = document.querySelector(".condition");
const temperatureElement = document.querySelector(".temperature");
const weatherImage = document.querySelector(".imageBox img");
const weeklyForecastContainer = document.querySelector(".weekly-forecast");

const defaultCity = "Phnom Penh"; //default city

function fetchWeather(city) {
    const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
    fetch(url)
        .then((response) => response.json()) 
        .then((data) => {
            updateWeatherUI(data);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

// Function to update the current weather UI  //  note: I just copy it from stack overflow --------------------------------

function updateWeatherUI(data) {
    const {  weather, main } = data; 
    const temperature = Math.round(main.temp);
    console.log(data);

    const currentDate = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = daysOfWeek[currentDate.getDay()];

    cityElement.textContent = currentDay.toUpperCase()
    conditionElement.textContent = weather[0].description.toUpperCase();
    temperatureElement.innerHTML = `${temperature}°C <br>${Math.round((temperature * 9) / 5 + 32)}°F`;

    const tempImage = getImageByTemperature(temperature);
    weatherImage.src = tempImage;
}


// Function to choose an image based on the temperature
// ---------------------------------------- change image here --------------------------------
function getImageByTemperature(temp) {
    if (temp >= 30) {
        return "../../assets/image-icon/sun.png"; // Hot and sunny
    } else if (temp >= 20 && temp < 30) {
        return "../../assets/image-icon/sun.png"; // Warm and cloudy
    } else if (temp >= 10 && temp < 20) {
        return "../../assets/image-icon/sun.png"; // Cool and rainy
    } else {
        return "../../assets/image-icon/Lightning.png"; // Cold and snowy
    }
}

// Function to fetch weekly forecast data  to display data to the weekly forecast list
function fetchWeeklyForecast(city) {
    const url = `${FORECAST_URL}?q=${city}&units=metric&appid=${API_KEY}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            updateWeeklyForecastUI(data);
        })
        .catch((error) => {
            console.error("Error fetching weekly forecast:", error);
        });
}

// Function to update the weekly forecast UI // stack overflow

function updateWeeklyForecastUI(data) {
    const { list } = data;
    console.log("updateWeeklyForecastUI", data);

    weeklyForecastContainer.innerHTML = "";
    const dailyDataMap = new Map();
    list.forEach((entry) => {
        const date = new Date(entry.dt_txt);
        const day = date.toISOString().split("T")[0];
        // console.log(day);
        
        if (
            !dailyDataMap.has(day) ||
            Math.abs(date.getHours() - 12) < Math.abs(new Date(dailyDataMap.get(day).dt_txt).getHours() - 12)
        ) {
            dailyDataMap.set(day, entry);
        }
    });

    const dailyData = Array.from(dailyDataMap.values()).slice(1, 7);

    dailyData.forEach((day) => {
        const date = new Date(day.dt_txt);
        // console.log(date);

        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

        const temp = Math.round(day.main.temp);
        const tempMin = Math.round(day.main.temp_min);
        const tempMax = Math.round(day.main.temp_max);
        const weatherIcon = getImageByTemperature(temp);

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("day");
        forecastCard.innerHTML = `
            <p>${dayName}</p>
            <img src="${weatherIcon}" alt="${day.weather[0].description}">
            <p>${tempMax}°C - ${tempMin}°C</p>
        `;
        weeklyForecastContainer.appendChild(forecastCard);
    });
}

// call all that fucntion to make sure the weather is display
fetchWeather(defaultCity);
fetchWeeklyForecast(defaultCity);
