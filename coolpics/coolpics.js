const menuButton = document.querySelector('.menu-button');
const menuItems = document.querySelector('.menu-items');

menuButton.addEventListener('click', () => {
    console.log('Menu button clicked');
    menuItems.classList.toggle('show');
});