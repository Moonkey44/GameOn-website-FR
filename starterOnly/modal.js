function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const topNav = document.querySelector(".topnav");
const heroSection = document.querySelector(".hero-section");
const heroContent = document.querySelector(".hero-content");
const footer = document.querySelector("footer");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  /*topNav.style.display = "none";
  heroSection.style.display = "none";
  footer.style.display = "none";*/
}
