// templates.js

// Sidebar/Nav Functions
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

// Slideshow Modal Functions
function createSlideshowTemplate() {
  const modal = document.createElement("div");
  modal.classList.add("help-slideshow-modal");
  modal.innerHTML = `
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
  return modal;
}

function attachSlideshowEvents(modal, slides) {
  const imgEl = modal.querySelector("img");
  const textEl = modal.querySelector("p");
  const closeBtn = modal.querySelector(".help-slideshow-close");
  const nextBtn = modal.querySelector(".next-slide");
  const prevBtn = modal.querySelector(".prev-slide");

  let current = 0;

  const updateSlide = () => {
    imgEl.src = slides[current].img;
    imgEl.alt = slides[current].alt;
    textEl.textContent = slides[current].text;
  };

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % slides.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlide();
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  return { updateSlide, open: () => {
    current = 0;
    updateSlide();
    modal.classList.add("active");
  }};
}

export function createHelpSlideshow(slides) {
  const modal = createSlideshowTemplate();
  document.body.appendChild(modal);
  const { open } = attachSlideshowEvents(modal, slides);
  return { open };
}


// Tasks Templates

export function taskTemplate(taskList) {
  return `
    <ul>
      ${taskList.map((task) => `
        <li class="todo-item">
          <input type="checkbox" id="task-${task.id}" ${task.completed ? "checked" : ""}>
          <label for="task-${task.id}" class="todo-label ${task.completed ? "checked" : ""}">${task.text}</label>
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