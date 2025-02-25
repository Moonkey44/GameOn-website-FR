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
const content = document.querySelector(".content");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  //Partie Melvin - Redéfinis le background du modal et affiche la navigation pour la partie mobile
  modalbg.style.background = "white";
  if(screen.width <= 800){ 
    modalbg.insertBefore(topNav,content);
    topNav.style.top ="0";
    topNav.style.left="5%";
    topNav.style.right="5%";
  }
}

