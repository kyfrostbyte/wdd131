import { renderTasks, addTask, getTasks } from "./todo.js";

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
    addTask(); // also triggers sneak peek update
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });

  document.addEventListener("tasks-updated", updateSneakPeekBoxes);

  renderTasks();
  updateSneakPeekBoxes();
});

function updateSneakPeekBoxes() {
  const taskList = getTasks();
  const finished = taskList.filter(task => task.completed).length;
  const unfinished = taskList.length - finished;

  document.getElementById("finished-count").textContent = finished;
  document.getElementById("unfinished-count").textContent = unfinished;
}
