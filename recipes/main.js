

const description = document.querySelector('.recipe-description');
function handleResize() {
    if (window.innerWidth >= 600) {
        description.classList.remove('hide');
    } else {
        description.classList.add('hide');
    }
}
// Ensure webpage is sized properly, regardless of window size when opened
window.addEventListener("resize", handleResize);

// Run once on page load to set initial state
window.addEventListener("load", handleResize);