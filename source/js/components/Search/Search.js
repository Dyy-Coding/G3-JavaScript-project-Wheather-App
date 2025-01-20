// // const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
// // const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
// // const WEATHER_API_KEY = 'bd1b0d9c907f21d41c7e880436ab3832'; // Your API key

// // const GEO_API_OPTIONS = {
// //   method: 'GET',
// //   headers: {
// //     'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
// //     'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
// //   },
// // };

// // async function fetchWeatherData(lat, lon) {
// //   try {
// //     const [weatherPromise, forecastPromise] = await Promise.all([
// //       fetch(
// //         `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
// //       ),
// //       fetch(
// //         `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
// //       ),
// //     ]);

// //     if (!weatherPromise.ok || !forecastPromise.ok) {
// //       throw new Error('Failed to fetch weather data');
// //     }

// //     const weatherResponse = await weatherPromise.json();
// //     const forecastResponse = await forecastPromise.json();

// //     localStorage.setItem('weatherData', JSON.stringify(weatherResponse));
// //     localStorage.setItem('forecastData', JSON.stringify(forecastResponse));

// //     return [weatherResponse, forecastResponse];
// //   } catch (error) {
// //     console.error('Error fetching weather data:', error);
// //   }
// // }

// // async function fetchCities(input) {
// //   try {
// //     const response = await fetch(
// //       `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
// //       GEO_API_OPTIONS
// //     );

// //     if (!response.ok) {
// //       throw new Error('Failed to fetch cities data');
// //     }

// //     const data = await response.json();

// //     localStorage.setItem('citiesData', JSON.stringify(data));

// //     return data;
// //   } catch (error) {
// //     console.error('Error fetching cities:', error);
// //     return null;
// //   }
// // }

// // function getStoredWeatherData() {
// //   const data = localStorage.getItem('weatherData');
// //   return data ? JSON.parse(data) : null;
// // }

// // function getStoredForecastData() {
// //   const data = localStorage.getItem('forecastData');
// //   return data ? JSON.parse(data) : null;
// // }

// // function getStoredCitiesData() {
// //   const data = localStorage.getItem('citiesData');
// //   return data ? JSON.parse(data) : null;
// // }

// // document.addEventListener("DOMContentLoaded", () => {
// //   const searchInput = document.getElementById("search-input");
// //   const searchButton = document.getElementById("search-button");
// //   const weatherInfo = document.getElementById("weather-info");
// //   const forecastInfo = document.getElementById("forecast-info");
// //   const suggestionsContainer = document.getElementById("suggestions");

// //   const fetchLocations = async () => {
// //     const response = await fetch('source/locations.json');
// //     if (!response.ok) {
// //       throw new Error('Failed to load locations data');
// //     }
// //     return response.json();
// //   };

// //   const fetchAndStoreWeather = async (location) => {
// //     const url = `${WEATHER_API_URL}/weather?q=${location}&appid=${WEATHER_API_KEY}&units=metric`;
// //     console.log(`Fetching weather from URL: ${url}`);

// //     const response = await fetch(url);
// //     if (!response.ok) {
// //       throw new Error(`Failed to load weather data: ${response.status} ${response.statusText}`);
// //     }

// //     const data = await response.json();
// //     if (!data || !data.weather) {
// //       throw new Error('No weather data found for the specified location.');
// //     }

// //     localStorage.setItem(location, JSON.stringify(data));
// //     return data;
// //   };

// //   const displayWeather = (weatherData) => {
// //     weatherInfo.innerHTML = '';
// //     forecastInfo.innerHTML = '';

// //     const currentWeatherCard = document.createElement('div');
// //     currentWeatherCard.classList.add('weather-card');
// //     currentWeatherCard.innerHTML = `
// //       <h2>${weatherData.name}</h2>
// //       <p>Temperature: ${weatherData.main.temp} °C</p>
// //       <p>Condition: ${weatherData.weather[0].description}</p>
// //       <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].description}">
// //     `;
// //     weatherInfo.appendChild(currentWeatherCard);
// //   };

// //   const showSuggestions = (locations, inputValue) => {
// //     suggestionsContainer.innerHTML = '';
// //     const filteredLocations = locations.filter(location => 
// //       location.name.toLowerCase().startsWith(inputValue.toLowerCase())
// //     );

// //     filteredLocations.forEach(location => {
// //       const suggestionItem = document.createElement('div');
// //       suggestionItem.textContent = location.name;
// //       suggestionItem.classList.add('suggestion-item');
// //       suggestionItem.addEventListener('click', async () => {
// //         searchInput.value = location.name;
// //         suggestionsContainer.innerHTML = '';

// //         const storedData = localStorage.getItem(location.name);
// //         let weatherData;

// //         if (storedData) {
// //           weatherData = JSON.parse(storedData);
// //           console.log("Data retrieved from localStorage:", weatherData);
// //         } else {
// //           try {
// //             weatherData = await fetchAndStoreWeather(location.name);
// //           } catch (error) {
// //             console.error("Error fetching weather data:", error);
// //             alert("An error occurred while fetching weather data: " + error.message);
// //             return;
// //           }
// //         }

// //         displayWeather(weatherData);
// //       });
// //       suggestionsContainer.appendChild(suggestionItem);
// //     });
// //   };

// //   const performSearch = async () => {
// //     const inputValue = searchInput.value;
// //     if (!inputValue) {
// //       alert("Please enter a location name.");
// //       return;
// //     }

// //     try {
// //       const locations = await fetchLocations();
// //       const location = locations.find(loc => loc.name.toLowerCase() === inputValue.toLowerCase());

// //       if (location) {
// //         const storedData = localStorage.getItem(location.name);
// //         let weatherData;

// //         if (storedData) {
// //           weatherData = JSON.parse(storedData);
// //           console.log("Data retrieved from localStorage:", weatherData);
// //         } else {
// //           weatherData = await fetchAndStoreWeather(location.name);
// //         }

// //         displayWeather(weatherData);
// //         searchInput.value = '';
// //         suggestionsContainer.innerHTML = '';
// //       } else {
// //         alert("Location not found.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //       alert("An error occurred while fetching data: " + error.message);
// //     }
// //   };

// //   searchButton.addEventListener("click", performSearch);
// //   searchInput.addEventListener("input", async () => {
// //     const inputValue = searchInput.value;
// //     if (inputValue) {
// //       const locations = await fetchLocations();
// //       showSuggestions(locations, inputValue);
// //     } else {
// //       suggestionsContainer.innerHTML = '';
// //     }
// //   });
// //   searchInput.addEventListener("keypress", (event) => {
// //     if (event.key === "Enter") {
// //       performSearch();
// //     }
// //   });
// // });

// const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
// const WEATHER_API_KEY = 'bd1b0d9c907f21d41c7e880436ab3832'; // Your Weather API key

// // Predefined cities data
// const citiesData = [
//     {
//       "CAM": [
//             "Phnom Penh",
//             "Kampong Cham",
//             "Siem Reap",
//             "Battambang",
//             "Preah Sihanouk",
//             "Kampot",
//             "Takeo",
//             "Koh Kong",
//             "Oddar Meanchey",
//             "Pursat",
//             "Banteay Meanchey",
//             "Svay Rieng",
//             "Prey Veng",
//             "Kandal",
//             "Tboung Khmum",
//             "Ratanakiri",
//             "Mondulkiri",
//             "Stung Treng",
//             "Kratie"
//         ]
//     },
//     {
//         "THA": [
//             "Bangkok",
//             "Chiang Mai",
//             "Phuket",
//             "Pattaya",
//             "Nakhon Ratchasima",
//             "Songkhla"
//         ]
//     },
//     {
//         "VNM": [
//             "Hanoi",
//             "Ho Chi Minh City",
//             "Da Nang",
//             "Hai Phong",
//             "Can Tho",
//             "Nha Trang"
//         ]
//     },
//     {
//         "LAO": [
//             "Vientiane",
//             "Luang Prabang",
//             "Pakse",
//             "Savannakhet",
//             "Thakhek",
//             "Xieng Khouang"
//         ]
//     },
//     {
//         "MYA": [
//             "Naypyidaw",
//             "Yangon",
//             "Mandalay",
//             "Bagan",
//             "Taunggyi",
//             "Pyin Oo Lwin"
//         ]
//     },
//     {
//         "IDN": [
//             "Jakarta",
//             "Bali",
//             "Surabaya",
//             "Medan",
//             "Bandung",
//             "Makassar"
//         ]
//     },
//     {
//         "PHL": [
//             "Manila",
//             "Cebu",
//             "Davao",
//             "Zamboanga",
//             "Baguio",
//             "Iloilo City"
//         ]
//     },
//     {
//         "SGP": [
//             "Singapore"
//         ]
//     },
//     {
//         "MYS": [
//             "Kuala Lumpur",
//             "George Town",
//             "Kota Kinabalu",
//             "Kuching",
//             "Malacca City",
//             "Ipoh"
//         ]
//     },
//     {
//         "BRN": [
//             "Bandar Seri Begawan",
//             "Kuala Belait",
//             "Tutong",
//             "Seria",
//             "Temburong"
//         ]
//     }
// ];

// // Flatten citiesData into a single array of cities
// const cityList = citiesData.reduce((acc, country) => {
//     const countryCities = Object.values(country)[0]; // Get the cities array
//     return acc.concat(countryCities);
// }, []);

// // Fetch weather data based on city name
// async function fetchWeatherData(city) {
//     try {
//         const response = await fetch(
//             `${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
//         );

//         // Check for successful response
//         if (!response.ok) {
//             throw new Error('Failed to fetch weather data');
//         }

//         const weatherResponse = await response.json();

//         // Store response in local storage
//         localStorage.setItem('weatherData', JSON.stringify(weatherResponse));

//         return weatherResponse;
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//     }
// }

// // Display weather data
// function displayWeather(weatherData) {
//     const weatherInfo = document.getElementById("weather-info");
//     weatherInfo.innerHTML = '';

//     const currentWeatherCard = document.createElement('div');
//     currentWeatherCard.classList.add('weather-card');
//     currentWeatherCard.innerHTML = `
//         <h2>${weatherData.name}</h2>
//         <p>Temperature: ${weatherData.main.temp} °C</p>
//         <p>Condition: ${weatherData.weather[0].description}</p>
//         <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].description}">
//     `;
//     weatherInfo.appendChild(currentWeatherCard);
// }

// // Event listener for search input
// document.getElementById("search-button").addEventListener("click", async () => {
//     const input = document.getElementById("search-input").value;

//     if (!input) {
//         alert("Please enter a city name.");
//         return;
//     }

//     if (cityList.includes(input)) {
//         const weatherData = await fetchWeatherData(input);
//         displayWeather(weatherData);
//     } else {
//         alert("City not found in the predefined list.");
//     }
// });

// // Optional: Display suggestions as the user types
// document.getElementById("search-input").addEventListener("input", (event) => {
//     const input = event.target.value.toLowerCase();
//     const suggestionsContainer = document.getElementById("suggestions");
//     suggestionsContainer.innerHTML = '';

//     if (input.length > 2) {
//         const filteredCities = cityList.filter(city => city.toLowerCase().startsWith(input));
//         filteredCities.forEach(city => {
//             const suggestionItem = document.createElement('div');
//             suggestionItem.textContent = city;
//             suggestionItem.classList.add('suggestion-item');
//             suggestionItem.addEventListener('click', () => {
//                 document.getElementById("search-input").value = city;
//                 suggestionsContainer.innerHTML = ''; // Clear suggestions
//             });
//             suggestionsContainer.appendChild(suggestionItem);
//         });
//     }
// });

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = 'bd1b0d9c907f21d41c7e880436ab3832'; // Replace with your API key

// City data
const citiesData = [
    {
        "CAM": [
            "Phnom Penh", "Kampong Cham", "Siem Reap", "Battambang", "Preah Sihanouk",
            "Kampot", "Takeo", "Koh Kong", "Oddar Meanchey", "Pursat",
            "Banteay Meanchey", "Svay Rieng", "Prey Veng", "Kandal", "Tboung Khmum",
            "Ratanakiri", "Mondulkiri", "Stung Treng", "Kratie"
        ]
    },
    {
        "THA": [
            "Bangkok", "Chiang Mai", "Phuket", "Pattaya", "Nakhon Ratchasima", "Songkhla"
        ]
    },
    {
        "VNM": [
            "Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho", "Nha Trang"
        ]
    },
    {
        "LAO": [
            "Vientiane", "Luang Prabang", "Pakse", "Savannakhet", "Thakhek", "Xieng Khouang"
        ]
    },
    {
        "MYA": [
            "Naypyidaw", "Yangon", "Mandalay", "Bagan", "Taunggyi", "Pyin Oo Lwin"
        ]
    },
    {
        "IDN": [
            "Jakarta", "Bali", "Surabaya", "Medan", "Bandung", "Makassar"
        ]
    },
    {
        "PHL": [
            "Manila", "Cebu", "Davao", "Zamboanga", "Baguio", "Iloilo City"
        ]
    },
    {
        "SGP": [
            "Singapore"
        ]
    },
    {
        "MYS": [
            "Kuala Lumpur", "George Town", "Kota Kinabalu", "Kuching", "Malacca City", "Ipoh"
        ]
    },
    {
        "BRN": [
            "Bandar Seri Begawan", "Kuala Belait", "Tutong", "Seria", "Temburong"
        ]
    }
];

// Flatten the cities data for easier searching
const cityList = citiesData.flatMap(country => Object.values(country)[0]);

// Function to fetch current weather and 7-day forecast
async function fetchWeatherData(city) {
    const loadingIndicator = document.getElementById("loading-indicator");
    loadingIndicator.style.display = "block"; // Show loading indicator

    try {
        const weatherResponse = await fetch(`${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');

        const weatherData = await weatherResponse.json();

        // Fetch 7-day forecast
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;
        const forecastResponse = await fetch(`${WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${WEATHER_API_KEY}&units=metric`);
        const forecastData = await forecastResponse.json();

        return { weatherData, forecastData };
    } catch (error) {
        console.error('Error fetching weather data:', error);
    } finally {
        loadingIndicator.style.display = "none"; // Hide loading indicator
    }
}

// Function to display weather and forecast on the main page
function displayWeather(weatherData, forecastData) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = '';

    const currentWeatherCard = document.createElement('div');
    currentWeatherCard.classList.add('weather-card');
    currentWeatherCard.innerHTML = `
        <h2>${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp} °C</p>
        <p>Condition: ${weatherData.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].description}">
    `;
    weatherInfo.appendChild(currentWeatherCard);

    // Display 7-day forecast
    forecastData.daily.forEach((day, index) => {
        if (index < 7) { // Limit to 7 days
            const forecastCard = document.createElement('div');
            forecastCard.classList.add('weather-card');
            forecastCard.innerHTML = `
                <h3>${new Date(day.dt * 1000).toLocaleDateString()}</h3>
                <p>Temperature: ${day.temp.day} °C</p>
                <p>Condition: ${day.weather[0].description}</p>
            `;
            weatherInfo.appendChild(forecastCard);
        }
    });
}

// Function to display city suggestions based on user input
function showSuggestions(input) {
    const suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = '';

    if (input) {
        const filteredCities = cityList.filter(city => city.toLowerCase().includes(input.toLowerCase()));
        filteredCities.forEach(city => {
            const suggestionItem = document.createElement('div');
            suggestionItem.innerText = city;
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.onclick = () => {
                document.getElementById("search-input").value = city;
                suggestions.innerHTML = '';
            };
            suggestions.appendChild(suggestionItem);
        });
    }
}

// Event listener for search input to show suggestions
document.getElementById("search-input").addEventListener("input", (event) => {
    showSuggestions(event.target.value);
});

// Event listener for search button on the main page
document.getElementById("search-button").addEventListener("click", async () => {
    const input = document.getElementById("search-input").value;
    if (!input) {
        alert("Please enter a city name.");
        return;
    }

    // Redirect to detailed weather page
    window.location.href = `weather-detail.html?city=${input}`;
});

// Call displayWeatherDetail on page load if on the detail page
if (window.location.pathname.endsWith('weather-detail.html')) {
    displayWeatherDetail();
}
