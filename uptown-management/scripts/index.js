import { renderTasks, addTask, getTasks, openAddTaskModal, closeAddTaskModal } from "./todo.js";
import { createHelpSlideshow } from "./templates.js";

document.addEventListener("DOMContentLoaded", () => {
  setupAddTaskModal();
  setupHelpToggle();
  setupHelpSlideshow();
  document.addEventListener("tasks-updated", updateSneakPeekBoxes);
  renderTasks();
  updateSneakPeekBoxes();
});

function setupAddTaskModal() {
  const modal = document.getElementById("task-modal");
  const openBtn = document.getElementById("open-task-modal");
  const cancelBtn = document.getElementById("cancel-task");
  const saveBtn = document.getElementById("save-task");
  const input = document.getElementById("new-task");

  openBtn?.addEventListener("click", () => {
    openAddTaskModal();
  });

  cancelBtn?.addEventListener("click", () => {
    closeAddTaskModal();
  });

  saveBtn?.addEventListener("click", () => {
    addTask();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });
}

function updateSneakPeekBoxes() {
  const taskList = getTasks();
  const finished = taskList.filter(task => task.completed).length;
  const unfinished = taskList.length - finished;

  document.getElementById("finished-count").textContent = finished;
  document.getElementById("unfinished-count").textContent = unfinished;
}

function setupHelpToggle() {
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

function setupHelpSlideshow() {
  const todoSlides = [
    { img: "assets/images/slideshow/slide1_addtaskbutton.webp", text: "Click '+ Add Task' to create a new task.", alt: "Add Task button screenshot" },
    { img: "assets/images/slideshow/slide2_typetask.webp", text: "Type your task in the task box.", alt: "Typing a task in the input field" },
    { img: "assets/images/slideshow/slide3_savetask.webp", text: "Click the save button.", alt: "Save task button" },
    { img: "assets/images/slideshow/slide4_addedtask.webp", text: "You will now see your new task added to the list.", alt: "Task added to list view" },
    { img: "assets/images/slideshow/slide5_sneakpeak.webp", text: "The sneak peak boxes will automatically show updated statistics!", alt: "Sneak peek statistics box" }
  ];

  const todoHelpModal = createHelpSlideshow(todoSlides);
  document.getElementById("todo-help-btn").addEventListener("click", () => {
    todoHelpModal.open();
  });
}