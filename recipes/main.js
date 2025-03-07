// main.js

// Hide / Show the recipe description
const description = document.querySelector('.recipe-description');
function handleResize() {
    if (window.innerWidth >= 600) {
        description.classList.remove('hide');
    } else {
        description.classList.add('hide');
    }
}

window.addEventListener("resize", handleResize);

// Run once on page load to set initial state
window.addEventListener("load", handleResize);