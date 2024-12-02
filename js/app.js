const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const navbarList = document.querySelector("#navbar__list");
const header = document.querySelector(".page__header");
const sections = document.querySelectorAll("section");
let scrollingTimeOut;


// Helper functions

/**
 * @description Initializes event listeners when the document is ready.
 * Builds the navigation bar and sets up an event listener to collapse sections when a click event occurs.
 */
function callAllWhenDocumentReady(){
  buildNavbar();
  document.addEventListener("click", event => collapseSections(event));
}


/**
 * @description Sets up various scroll-related listeners and actions.
 * It initializes the active section, sets the visibility of the scroll button, and hides the fixed header.
 */
function callScrollListeners(){
  setActiveSection();
  setScrollBtnVisibility();
  hideFixedHeader();
}




// Main functions

/**
 * @description Builds the navigation bar dynamically based on the sections on the page.
 * Iterates through each section, creating a list item and anchor tag for each, and appends them to the navbar.
 */
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


/**
 * @description Sets the active section and updates the corresponding navigation link.
 * Iterates through each section and checks if it's in view. If the section is in view, it adds an active class; otherwise, it removes the class.
 */
function setActiveSection(){
  sections.forEach(section => {
    const boundingRect = section.getBoundingClientRect();
    const navLink = document.querySelector(`a[href="#${section.id}"]`);

    if (boundingRect.top < 0.25 * window.innerHeight 
        && boundingRect.bottom > 0.25 * window.innerHeight) {
      section.classList.add("your-active-class");
      navLink.classList.add("menu__link__active");
    } else {
      section.classList.remove("your-active-class");
      navLink.classList.remove("menu__link__active");
    }
  });
}


/**
 * @description Smoothly scrolls to the target section when a navigation link is clicked.
 * Prevents the default link behavior, retrieves the target section, and scrolls to it with smooth animation.
 * @param {Event} event - The click event triggered when a navigation link is clicked.
 */
function scrollToSection(event){
  event.preventDefault();
  const targetId = event.target.getAttribute("href");
  const targetSection = document.querySelector(targetId);
  window.scrollTo({
    top: targetSection.offsetTop,
    behavior: "smooth"
  })
}


/**
 * @description Displays the header by setting its top position to 0.
 */
function showHeader(){
  header.style.top = "0";
}


/**
 * @description Hides the header by moving it off-screen based on its height.
 * Retrieves the header's height and sets its top position to a negative value to hide it.
 */
function hideHeader(){
  const headerHeight = header.getBoundingClientRect().height;
  header.style.top = `-${headerHeight}px`;
}


/**
 * @description Toggles the visibility of the "scroll to top" button based on the scroll position.
 * Displays the button if the page is scrolled more than 200 pixels, otherwise hides it.
 */
function setScrollBtnVisibility(){
  if(window.scrollY > 200)
    scrollToTopBtn.style.display = "block";
  else
    scrollToTopBtn.style.display = "none";
}


/**
 * @description Smoothly scrolls the page to the top when called.
 */
function scrollToTop(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}


/**
 * @description Manages the visibility of the fixed header based on scroll position.
 * Shows the header when the scroll position is less than 10 pixels. If the scroll position is greater, 
 * it hides the header after a delay of 1200 milliseconds.
 */
function hideFixedHeader(){
  if(window.scrollY < 10){
    showHeader();
    clearTimeout(scrollingTimeOut);
  }
  else{
    showHeader();
    clearTimeout(scrollingTimeOut);
    scrollingTimeOut = setTimeout(hideHeader, 1200)
  }
}


/**
 * @description Re-enables the header hiding functionality if the scroll position is not less than 10 pixels.
 * Sets a timeout to hide the header after a 1200 millisecond delay if the scroll position is greater than or equal to 10 pixels.
 */
function reenableHeaderHiding(){
  if(!(window.scrollY < 10))
    scrollingTimeOut = setTimeout(hideHeader, 1200)
}


/**
 * @description Toggles the visibility of a section's content when a toggle button is clicked.
 * Changes the symbol of the button between "+" and "−" to indicate the section's state (expanded or collapsed).
 * @param {Event} event - The click event triggered when a toggle button is clicked.
 */

function collapseSections(event){
  if (event.target && event.target.classList.contains("toggle-section")){
    const toggleButton = event.target;
    const content = toggleButton.nextElementSibling;
    const symbol = toggleButton.querySelector(".toggle_symbol");

    content.classList.toggle("open");

    if (content.classList.contains("open")) {
      symbol.innerHTML = "&#43;";  
    } else {
      symbol.innerHTML = "&#8722;";  
    }
  }
}




// Events
document.addEventListener("DOMContentLoaded", callAllWhenDocumentReady)
window.addEventListener("scroll", callScrollListeners)
scrollToTopBtn.addEventListener("click", scrollToTop)
header.addEventListener("mouseleave", reenableHeaderHiding)
header.addEventListener("mouseenter", () => clearTimeout(scrollingTimeOut))
document.addEventListener("mousemove", function(event) {
  if (event.clientY <= 15) {
      showHeader(); 
  }
});
navbarList.addEventListener("click", (event) => {
  if(event.target.tagName === "A")
    scrollToSection(event);
})

