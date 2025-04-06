// templates.js

export function sidebarTemplate() {
  return `
  <div id="sidebar-spacer"></div>
  <div class="sidebar collapsed">
    <button class="toggle-btn">
      <span class="material-symbols-outlined">menu</span>
      <span class="label">Uptown</span>
    </button>
    <nav class="nav-items" aria-label="Main navigation">
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
      <p>&copy; 2025 - Aaron Alexander - Rexburg, ID - WDD 131</p>
      <a href="site-plan.html">Site Plan </a>
  `;
}

export function slideshowTemplate() {
  return `
    <div 
      class="help-slideshow-content" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="slideshow-title"
    >
      <h2 id="slideshow-title" class="visually-hidden">Task Help Slideshow</h2>

      <button 
        class="help-slideshow-close" 
        aria-label="Close help slideshow"
      >
        ✕
      </button>

      <img src="" alt="" />

      <p aria-live="polite"></p>

      <div class="help-slideshow-controls">
        <button class="prev-slide" aria-label="Previous slide">Prev</button>
        <button class="next-slide" aria-label="Next slide">Next</button>
      </div>
    </div>
  `;
}

export function taskTemplate(taskList) {
  return `
    <ul aria-label="To-Do Task List">
      ${taskList
        .map(
          (task) => `
        <li class="todo-item">
          <input 
            type="checkbox" 
            id="task-${task.id}" 
            ${task.completed ? "checked" : ""}
            aria-describedby="label-task-${task.id}"
          >
          <label 
            for="task-${task.id}" 
            id="label-task-${task.id}" 
            class="todo-label ${task.completed ? "checked" : ""}"
          >
            ${task.text}
          </label>
          <div class="todo-actions">
            <button 
              type="button" 
              data-edit-id="${task.id}" 
              aria-label="Edit task: ${task.text}"
            >
              ✏️
            </button>
            <button 
              type="button" 
              data-delete-id="${task.id}" 
              aria-label="Delete task: ${task.text}"
            >
              🗑️
            </button>
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
      <td>
        <button 
          type="button" 
          class="edit-icon" 
          aria-label="Edit ${staff.first} ${staff.last}'s information"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24" 
            fill="currentColor" 
            aria-hidden="true"
            >
            <circle cx="5" cy="12" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="19" cy="12" r="2"/>
          </svg>
        </button>
      </td>
    </tr>
  `;
}
