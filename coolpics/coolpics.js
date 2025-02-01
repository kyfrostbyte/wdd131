// Hide/show menu items upon menu button press
const menuButton = document.querySelector('.menu-button');
const menuItems = document.querySelector('.menu-items');

menuButton.addEventListener('click', toggleMenuItems);

function toggleMenuItems() {
    menuItems.classList.toggle('hide');
}

// Ensure webpage is sized properly, regardless of window size when opened
window.addEventListener("resize", handleResize);

function handleResize() {
    if (window.innerWidth > 1000) {
        menuItems.classList.remove('hide');
    } else {
        menuItems.classList.add('hide');
    }
}

// Run once on page load to set initial state
window.addEventListener("load", handleResize);

// Logic for opening and closing the viewer
const gallery = document.querySelector('.gallery');

gallery.addEventListener('click', viewHandler);

function viewHandler(event) {
    const element = event.target;
    if (element.tagName === "IMG"){
        const srcParts = element.src.split('-');
        const largerImageSrc = srcParts[0] + '-full.jpeg';
        document.body.insertAdjacentHTML('afterbegin', viewerTemplate(largerImageSrc, 'A larger version of the pretty nature picture.'))
    
        const closeViewerButton = document.querySelector('.close-viewer')
    
        closeViewerButton.addEventListener('click', closeViewer);
    }
}

function closeViewer() {
    const viewer = document.querySelector('.viewer');
    viewer.remove();
}

// Viewer Template
function viewerTemplate(image, alt) {
    return `
        <div class="viewer">
            <button class="close-viewer">X</button>
            <img src="${image}" alt="${alt}">
        </div>
    `;
}