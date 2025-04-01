import { renderTasks, addTask, getTasks } from "./todo.js";
import { createHelpSlideshow } from "./templates.js";


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("task-modal");
  const openModalBtn = document.getElementById("open-task-modal");
  const cancelBtn = document.getElementById("cancel-task");
  const saveBtn = document.getElementById("save-task");
  const input = document.getElementById("new-task");

  openModalBtn?.addEventListener("click", () => {
    modal.classList.remove("hidden");
    input.focus();
  });

  cancelBtn?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  saveBtn?.addEventListener("click", () => {
    addTask(); 
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  document.addEventListener("tasks-updated", updateSneakPeekBoxes);

  renderTasks();
  updateSneakPeekBoxes();

  const helpToggleBtn = document.querySelector(".help-toggle");
  const helpContent = document.querySelector(".help-content");

if (helpToggleBtn && helpContent) {
  helpToggleBtn.addEventListener("click", () => {
    const isExpanded = helpToggleBtn.getAttribute("aria-expanded") === "true";
    helpToggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    helpContent.classList.toggle("open");
  });
}
});

function updateSneakPeekBoxes() {
  const taskList = getTasks();
  const finished = taskList.filter(task => task.completed).length;
  const unfinished = taskList.length - finished;

  document.getElementById("finished-count").textContent = finished;
  document.getElementById("unfinished-count").textContent = unfinished;
}


const todoSlides = [
  { img: "assets/images/dashboard.png", text: "Click '+ Add Task' to create a new task." },
  { img: "assets/images/dashboard_wireframe.png", text: "Check off tasks to mark them complete." },
  { img: "assets/images/staff.jpg", text: "Edit or delete tasks with the icons." },
  { img: "assets/images/scheduling.jpg", text: "Tasks update the Sneak Peek boxes live." },
  { img: "assets/images/dashboard.png", text: "Everything is saved in your browser automatically." },
];

const todoHelpModal = createHelpSlideshow(todoSlides);

document.getElementById("todo-help-btn").addEventListener("click", () => {
  todoHelpModal.open();
});