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

const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const navbarList = document.querySelector("#navbar__list");
const header = document.querySelector(".page__header");
const sections = document.querySelectorAll("section");
let scrollingTimeOut;




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
    anchor.classList.add("menu__link");
    
    listItem.appendChild(anchor);
    navbarList.appendChild(listItem);

  })
}



// Add class 'active' to section when near top of viewport
function setActiveSection(){
  sections.forEach(section => {
    const boundingRect = section.getBoundingClientRect();
    const navLink = document.querySelector(`a[href="#${section.id}"]`);

    if (boundingRect.top < 0.25 * window.innerHeight && boundingRect.bottom > 0.25 * window.innerHeight) {
      section.classList.add("your-active-class");
      navLink.classList.add("menu__link__active");
    } else {
      section.classList.remove("your-active-class");
      navLink.classList.remove("menu__link__active");
    }
  });
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



// show header
function showHeader(){
  header.style.top = "0";
}


// hide header
function hideHeader(){
  const headerHeight = header.getBoundingClientRect().height;
  header.style.top = `-${headerHeight}px`;
}




// Toggle the visibility of the scroll to top button 
function setScrollBtnVisibility(){
  if(window.scrollY > 200)
    scrollToTopBtn.style.display = "block";
  else
    scrollToTopBtn.style.display = "none";
}


// Scroll to the top when button is clicked
function scrollToTop(){
  window.scrollTo({
    top: 0,
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


// Hide fixed header when user not scrolling 
window.addEventListener("scroll", () => {
  if(window.scrollY < 10){
    showHeader();
    clearTimeout(scrollingTimeOut);
  }
  else{
    showHeader();
    clearTimeout(scrollingTimeOut);
    scrollingTimeOut = setTimeout(hideHeader, 1200)
  }
  
})


// Prevent header from disappearing when hovered over
header.addEventListener("mouseenter", () => clearTimeout(scrollingTimeOut))

// Reenable header hiding when not hovered over
header.addEventListener("mouseleave", () => {
  if(!(window.scrollY < 10))
    scrollingTimeOut = setTimeout(hideHeader, 1200)
})

// Show the header when the mouse near the top of the document 
document.addEventListener('mousemove', function(event) {
  if (event.clientY <= 15) {
      showHeader(); 
  }
});


// Trigger the scroll to up button 
window.addEventListener('scroll', setScrollBtnVisibility);

// Return to the top of the document
scrollToTopBtn.addEventListener("click", scrollToTop)



// Collapse logic 
document.addEventListener('DOMContentLoaded', function () {

  const toggleButtons = document.querySelectorAll('.toggle-section');
  toggleButtons.forEach(function (toggleButton) {
    toggleButton.addEventListener('click', function () {
      const content = this.nextElementSibling; 
      const symbol = this.querySelector('.toggle_symbol'); 
      content.classList.toggle('open');
      if (content.classList.contains('open')) {
        symbol.innerHTML = '&#43;'; 
      } else {
        symbol.innerHTML = '&#8722;'; 
      }
    });
  });

});

