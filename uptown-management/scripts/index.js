// index.js

import { renderTasks, addTask, getTasks, openAddTaskModal, closeAddTaskModal, } from "./todo.js";
import { setupHelpSlideshow, setupHelpToggle } from "./main.js";

const todoSlides = [
  { img: "assets/images/slideshow/dashboard/slide1_addtaskbutton.webp", text: "Click '+ Add Task' to create a new task.", alt: "Add Task button screenshot" },
  { img: "assets/images/slideshow/dashboard/slide2_typetask.webp", text: "Type your task in the task box.", alt: "Typing a task in the input field" },
  { img: "assets/images/slideshow/dashboard/slide3_savetask.webp", text: "Click the save button.", alt: "Save task button" },
  { img: "assets/images/slideshow/dashboard/slide4_addedtask.webp", text: "You will now see your new task added to the list.", alt: "Task added to list view" },
  { img: "assets/images/slideshow/dashboard/slide5_sneakpeak.webp", text: "The sneak peak boxes will automatically show updated statistics!", alt: "Sneak peek statistics box" }
];

function init() {
  setupAddTaskModal();
  setupHelpToggle();
  setupHelpSlideshow(todoSlides, "todo-help-btn");
  document.addEventListener("tasks-updated", updateSneakPeekBoxes);
  renderTasks();
  updateSneakPeekBoxes();
}

document.addEventListener("DOMContentLoaded", init);

function setupAddTaskModal() {
  const openButton = document.getElementById("open-task-modal");
  const cancelButton = document.getElementById("cancel-task");
  const saveButton = document.getElementById("save-task");
  const input = document.getElementById("new-task");

  openButton?.addEventListener("click", () => {
    openAddTaskModal();
  });

  cancelButton?.addEventListener("click", () => {
    closeAddTaskModal();
  });

  saveButton?.addEventListener("click", () => {
    addTask();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });
}

function updateSneakPeekBoxes() {
  const taskList = getTasks();
  const finished = taskList.filter((task) => task.completed).length;
  const unfinished = taskList.length - finished;

  document.getElementById("finished-count").textContent = finished;
  document.getElementById("unfinished-count").textContent = unfinished;
}
