const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'bd1b0d9c907f21d41c7e880436ab3832'; // Your API key

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

async function fetchWeatherData(lat, lon) {
  try {
    const [weatherPromise, forecastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    if (!weatherPromise.ok || !forecastPromise.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherResponse = await weatherPromise.json();
    const forecastResponse = await forecastPromise.json();

    // Store in local storage
    localStorage.setItem('weatherData', JSON.stringify(weatherResponse));
    localStorage.setItem('forecastData', JSON.stringify(forecastResponse));

    return [weatherResponse, forecastResponse];
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null; // Return null or an appropriate error response
  }
}

async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    if (!response.ok) {
      throw new Error('Failed to fetch cities data');
    }

    const data = await response.json();

    // Store cities data in local storage
    localStorage.setItem('citiesData', JSON.stringify(data));
    
    return data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return null; // Return null or an appropriate error response
  }
}

// Function to retrieve weather data from local storage
function getStoredWeatherData() {
  const data = localStorage.getItem('weatherData');
  return data ? JSON.parse(data) : null;
}

// Function to retrieve forecast data from local storage
function getStoredForecastData() {
  const data = localStorage.getItem('forecastData');
  return data ? JSON.parse(data) : null;
}

// Function to retrieve cities data from local storage
function getStoredCitiesData() {
  const data = localStorage.getItem('citiesData');
  return data ? JSON.parse(data) : null;
}