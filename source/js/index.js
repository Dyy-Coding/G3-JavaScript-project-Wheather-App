// add hovered class to selected list item
// ======================code front-end ==========================
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};


//================card-box run =====================

document.addEventListener('DOMContentLoaded', () => {
  const cardBox = document.querySelector('.cardBox'); // Select the card box
  const cards = document.querySelectorAll('.card'); // Select all cards

  // Add event listeners to each card for mouseover and mouseout
  cards.forEach(card => {
      card.addEventListener('mouseover', () => {
          for (let card of cards) {
            card.style.animationPlayState = 'paused'; // Pause animation on hover
            
          };
      });

      card.addEventListener('mouseout', () => {
            for (let card of cards) {
              card.style.animationPlayState = 'running'; // Resume animation when mouse leaves
              
            };
      });
  });
});

//=====================profile=================================//

document.querySelector('.post-form').addEventListener('click', () => {
  // e.preventDefault();
  const title = document.getElementById('post-title').value;
  const media = document.getElementById('post-media').files[0];
  const details = document.getElementById('post-details').value;

  if (title && media && details) {
      alert(`Post created successfully!\nTitle: ${title}`);
  } else {
      alert('Please fill out all fields!');
  }
});



const profile = document.querySelector(".profile");
const createPost = document.querySelector(".create-post");
const editContainer = document.querySelector(".edite-container");

document.getElementById("btn-edit-profile").addEventListener("click", () => {
  profile.classList.add("none-container");
  createPost.classList.add("none-container");
  editContainer.classList.add("display");
});
// Handle cancel button
document.querySelector(".cancel-btn").addEventListener("click", () => {
  profile.classList.remove("none-container");
  createPost.classList.remove("none-container");
  editContainer.classList.remove("display");
});

// Check if the elements exist
if (profile && createPost && editContainer) {
  editContainer.classList.add("none-container");
} else {
  console.error("One or more elements not found. Check your HTML structure.");
}

// Handle form submission
document.querySelector('.edit-profile-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const location = document.getElementById('location').value;

  if (name && email && location) {
      alert('Profile updated successfully!');
      // Add logic to save the changes (e.g., send data to server)
  } else {
      alert('Please fill out all fields!');
  }
});

// Handle profile picture preview
document.getElementById('profile-pic').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
          document.getElementById('profile-pic-preview').src = event.target.result;
      };
      reader.readAsDataURL(file);
  }
});




//=========================profile==========================//
//=========================Code back-end for search ==========================//
const apiKey = 'bd1b0d9c907f21d41c7e880436ab3832'; // Your OpenWeatherMap API key
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const weatherInfo = document.getElementById('weather-info');
const searchHistory = document.getElementById('search-history');

// Function to fetch weather data
async function fetchWeather(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        displayWeather(data);
        saveToHistory(location);
    } catch (error) {
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
    }
}

// Function to display weather data
function displayWeather(data) {
    const { name, main, wind, weather } = data;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
    weatherInfo.innerHTML = `
        <div class="weather-header">
            <img class="weather-icon" src="${iconUrl}" alt="${weather[0].description}">
            <div>
                <h2>${name}</h2>
                <p>Temperature: ${main.temp}°C</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Wind Speed: ${wind.speed} km/h</p>
                <p>Condition: ${weather[0].description}</p>
            </div>
        </div>
    `;
}

// Function to save search to localStorage
function saveToHistory(location) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.includes(location)) {
        history.push(location);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        displayHistory();
    }
}

// Function to display search history
function displayHistory() {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.innerHTML = '<h3>Search History:</h3>';
    history.forEach(location => {
        searchHistory.innerHTML += `<p>${location}</p>`;
    });
}

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const location = searchInput.value.trim();
    if (location) {
        fetchWeather(location);
        searchInput.value = ''; // Clear input
    }
});

// Display history on page load
document.addEventListener('DOMContentLoaded', displayHistory);
//===================================================//




