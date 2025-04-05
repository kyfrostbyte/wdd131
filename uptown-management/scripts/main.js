// main.js

import { sidebarTemplate, footerTemplate, slideshowTemplate } from "./templates.js";

function init () {
  renderSidebar();
  renderFooter();
  setupSidebarToggle();
}

document.addEventListener("DOMContentLoaded", init);

// Sidebar Functions
function setupSidebarToggle() {
  const toggleBtn = document.querySelector(".toggle-btn");
  const sidebar = document.querySelector(".sidebar");
  const spacer = document.querySelector("#sidebar-spacer");

  if (toggleBtn && sidebar && spacer) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      spacer.classList.toggle("expanded");
    });
  }
}

function renderSidebar(target = document.body) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = sidebarTemplate;
  const sidebarElements = Array.from(wrapper.children);
  sidebarElements.forEach((el) => target.insertBefore(el, target.firstChild));
}

// Footer functions
function renderFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;

  footer.innerHTML = footerTemplate();
}

// Slideshow Functions
export function setupHelpSlideshow(todoSlides, elementId) {
  const todoHelpModal = createHelpSlideshow(todoSlides);
  document.getElementById(elementId).addEventListener("click", () => {
    todoHelpModal.open();
  });
}

function createHelpSlideshow(slides) {
  const modal = document.createElement("div");
  modal.innerHTML = slideshowTemplate();
  modal.classList.add("help-slideshow-modal");
  document.body.appendChild(modal);
  const { open } = attachSlideshowEvents(modal, slides);
  return { open };
}

export function attachSlideshowEvents(modal, slides) {
  const imageElement = modal.querySelector("img");
  const textElement = modal.querySelector("p");
  const closeButton = modal.querySelector(".help-slideshow-close");
  const nextButton = modal.querySelector(".next-slide");
  const previousButton = modal.querySelector(".prev-slide");

  let current = 0;

  const updateSlide = () => {
    imageElement.src = slides[current].img;
    imageElement.alt = slides[current].alt;
    textElement.textContent = slides[current].text;
  };

  nextButton.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    updateSlide();
  });

  previousButton.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
  });

  closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  return {
    updateSlide,
    open: () => {
      current = 0;
      updateSlide();
      modal.classList.add("active");
    },
  };
}

// Expandable Help Section Functions
export function setupHelpToggle() {
  const helpToggleBtn = document.querySelector(".help-toggle");
  const helpContent = document.querySelector(".help-content");

  if (helpToggleBtn && helpContent) {
    helpToggleBtn.addEventListener("click", () => {
      const isExpanded = helpToggleBtn.getAttribute("aria-expanded") === "true";
      helpToggleBtn.setAttribute("aria-expanded", String(!isExpanded));
      helpContent.classList.toggle("open");
    });
  }
}



