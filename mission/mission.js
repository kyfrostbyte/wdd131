const selectElement = document.getElementById('theme-select');
const logoImage = document.getElementById('logo-image');
selectElement.addEventListener('change', changeTheme);

// Change the theme of the page based on the value of the select element
function changeTheme() {
    const theme = selectElement.value;

    // Remove dark class and set logo image to light theme logo
    if (theme === 'light') {
        logoImage.src = 'byui-logo_blue.webp';
        document.body.classList.remove('dark');
        selectElement.classList.remove('dark');
    } 
    // Add dark class and set logo image to dark theme logo
    else if (theme === 'dark') {
        logoImage.src = 'byui-logo_white.png';
        document.body.classList.add('dark');
        selectElement.classList.add('dark');
    }
}
