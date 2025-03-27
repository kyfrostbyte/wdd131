import { renderSidebar } from "./templates.js";

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();

  // Sidebar toggle
  const toggleBtn = document.querySelector(".toggle-btn");
  const sidebar = document.querySelector(".sidebar");
  const sidebarSpacer = document.querySelector("#sidebar-spacer");

  toggleBtn?.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    sidebarSpacer.classList.toggle("expanded");
  });

  // Help section toggle
  const helpToggleBtn = document.querySelector(".help-toggle");
  const helpContent = document.querySelector(".help-content");

  helpToggleBtn?.addEventListener("click", () => {
    const isExpanded = helpToggleBtn.getAttribute("aria-expanded") === "true";
    helpToggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    helpContent.classList.toggle("open", !isExpanded);
  });
});
