import { renderSidebar } from "./templates.js";

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar(); // Injects the sidebar HTML

  // Now safely query and hook up sidebar toggle logic
  const toggleBtn = document.querySelector(".toggle-btn");
  const sidebar = document.querySelector(".sidebar");
  const sidebarSpacer = document.querySelector("#sidebar-spacer");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    sidebarSpacer.classList.toggle("expanded");
  });
});
