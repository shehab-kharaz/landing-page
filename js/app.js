/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/







// Define Global Variables

const navbarList = document.querySelector("#navbar__list")
const sections = document.querySelectorAll("section")




/*
  End Global Variables
  Start Helper Functions
*/



/*
  End Helper Functions
  Begin Main Functions 
*/






// build the nav
function buildNavbar(){
  sections.forEach(section => {
   
    const listItem = document.createElement("li");
    const anchor = document.createElement("a");

    const anchorTarget = section.id;
    const anchorTitle = section.dataset.nav;

    anchor.textContent = anchorTitle;
    anchor.href = `#${anchorTarget}`;

    listItem.appendChild(anchor);
    navbarList.appendChild(listItem);

  })
}



// Add class 'active' to section when near top of viewport
function setActiveSection(){
  sections.forEach(section => {
    const boundingRect = section.getBoundingClientRect();
    if(boundingRect.top < 0.25*window.innerHeight && boundingRect.bottom > 0.25*window.innerHeight){
      section.classList.add("your-active-class")
    }
    else{
      section.classList.remove("your-active-class")
    }
  })
}



// Scroll to anchor ID using scrollTO event
function scrollToSection(event){
  event.preventDefault();
  const targetId = event.target.getAttribute("href");
  const targetSection = document.querySelector(targetId);
  window.scrollTo({
    top: targetSection.offsetTop,
    behavior: "smooth"
  })
}




/*
  End Main Functions
  Begin Events
*/



// Build menu 
document.addEventListener("DOMContentLoaded", buildNavbar)



// Scroll to section on link click
navbarList.addEventListener("click", (event) => {
  if(event.target.tagName === "A")
    scrollToSection(event);
})



// Set sections as active
window.addEventListener("scroll", setActiveSection)
