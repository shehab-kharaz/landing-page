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






// Add class 'active' to section when near top of viewport






// Scroll to anchor ID using scrollTO event







/*
  End Main Functions
  Begin Events
*/







// Build menu 
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








// Scroll to section on link click







// Set sections as active
