const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const navbarList = document.querySelector("#navbar__list");
const header = document.querySelector(".page__header");
const sections = document.querySelectorAll("section");
let scrollingTimeOut;




// helper function to call document loaded listeners 
function callAllWhenDocumentReady(){
  buildNavbar();
  document.addEventListener("click", event => collapseSections(event));
}


// helper function to call scroll listeners 
function callScrollListeners(){
  setActiveSection();
  setScrollBtnVisibility();
  hideFixedHeader();
}







// build the navbar
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


// Hide fixed header when user not scrolling 
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


// Reenable header hiding when not hovered over
function reenableHeaderHiding(){
  if(!(window.scrollY < 10))
    scrollingTimeOut = setTimeout(hideHeader, 1200)
}


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


// Build menu 
document.addEventListener("DOMContentLoaded", callAllWhenDocumentReady)


// Set sections as active
window.addEventListener("scroll", callScrollListeners)


// Return to the top of the document
scrollToTopBtn.addEventListener("click", scrollToTop)

// Reenable header hiding when not hovered over
header.addEventListener("mouseleave", reenableHeaderHiding)


// Header stay visible when hovered
header.addEventListener("mouseenter", () => clearTimeout(scrollingTimeOut))


// Show the header when the mouse near the top of the document 
document.addEventListener("mousemove", function(event) {
  if (event.clientY <= 15) {
      showHeader(); 
  }
});


// Scroll to section on link click
navbarList.addEventListener("click", (event) => {
  if(event.target.tagName === "A")
    scrollToSection(event);
})

