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


// Slideshow Modal Logic
export function createHelpSlideshow(slides) {
  // Create base elements
  const modal = document.createElement("div");
  modal.classList.add("help-slideshow-modal");

  modal.innerHTML = `
    <div class="help-slideshow-content">
      <button class="help-slideshow-close">✕</button>
      <img src="" alt="Help Slide" />
      <p></p>
      <div class="help-slideshow-controls">
        <button class="prev-slide">Prev</button>
        <button class="next-slide">Next</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const imgEl = modal.querySelector("img");
  const textEl = modal.querySelector("p");
  const closeBtn = modal.querySelector(".help-slideshow-close");
  const nextBtn = modal.querySelector(".next-slide");
  const prevBtn = modal.querySelector(".prev-slide");

  let current = 0;

  const updateSlide = () => {
    imgEl.src = slides[current].img;
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

  // Return an open method
  return {
    open: () => {
      current = 0;
      updateSlide();
      modal.classList.add("active");
    }
  };
}
