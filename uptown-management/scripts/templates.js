// templates.js

export function sidebarTemplate(){
  return `
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
}

export function footerTemplate() {
  return `
    <div class="site-footer">
      <p>&copy; 2025 - Aaron Alexander - Rexburg, ID - WDD 131</p>
      <a href="site-plan.html">Site Plan </a>
    </div>
  `;
}

export function slideshowTemplate() {
  return `
    <div class="help-slideshow-content">
      <button class="help-slideshow-close">✕</button>
      <img src="" alt="" />
      <p></p>
      <div class="help-slideshow-controls">
        <button class="prev-slide">Prev</button>
        <button class="next-slide">Next</button>
      </div>
    </div>
  `;

}

export function taskTemplate(taskList) {
  return `
    <ul>
      ${taskList
        .map(
          (task) => `
        <li class="todo-item">
          <input type="checkbox" id="task-${task.id}" ${
            task.completed ? "checked" : ""
          }>
          <label for="task-${task.id}" class="todo-label ${
            task.completed ? "checked" : ""
          }">${task.text}</label>
          <div class="todo-actions">
            <button data-edit-id="${task.id}">✏️</button>
            <button data-delete-id="${task.id}">🗑️</button>
          </div>
        </li>`
        )
        .join("")}
    </ul>
  `;
}

export function staffRowTemplate(staff) {
  return `
    <tr data-id="${staff.id}">
      <td>${staff.first}</td>
      <td>${staff.last}</td>
      <td>${staff.position}</td>
      <td>${staff.email}</td>
      <td>${staff.phone}</td>
      <td><span class="material-symbols-outlined edit-icon">more_horiz</span></td>
    </tr>
  `;
}
