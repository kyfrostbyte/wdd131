// templates.js

export const sidebarTemplate = `
  <div id="sidebar-spacer"></div>
  <div class="sidebar collapsed">
    <button class="toggle-btn">
      <span class="material-symbols-outlined">menu</span>
      <span class="label">Uptown</span>
    </button>
    <nav class="nav-items">
      <a href="index.html" class="nav-item">
        <span class="material-symbols-outlined">home</span>
        <span class="label">Dashboard</span>
      </a>
      <a href="staff.html" class="nav-item">
        <span class="material-symbols-outlined">group</span>
        <span class="label">Contacts</span>
      </a>
      <a href="coming-soon.html" class="nav-item">
        <span class="material-symbols-outlined">calendar_month</span>
        <span class="label">Schedule</span>
      </a>
      <a href="coming-soon.html" class="nav-item">
        <span class="material-symbols-outlined">lists</span>
        <span class="label">Tasks</span>
      </a>
    </nav>
  </div>
`;

export function renderSidebar(target = document.body) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = sidebarTemplate;
  const sidebarElements = Array.from(wrapper.children);
  sidebarElements.forEach((el) => target.insertBefore(el, target.firstChild));
}
