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

document.querySelector('.post-form').addEventListener('submit', (e) => {
  e.preventDefault();
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
