// main.js

import { renderSidebar } from "./templates.js";

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  setupSidebarToggle();
});

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
