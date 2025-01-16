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
