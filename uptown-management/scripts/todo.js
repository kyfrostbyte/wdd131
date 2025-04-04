// todo.js

import { taskTemplate } from "./templates.js";
const initialTasks = [
  { id: 1, text: "Finish next weeks schedule", completed: false },
  { id: 2, text: "Approve time cards", completed: false },
  { id: 3, text: "Send out paychecks", completed: false },
];

let tasks = JSON.parse(localStorage.getItem("tasks")) || initialTasks;
saveTasks();

const container = document.querySelector(".todo-container");
const modal = document.getElementById("task-modal");
const input = document.getElementById("new-task");
let editingTaskId = null;



function renderTasks() {
  container.innerHTML = taskTemplate(tasks);

  container.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    const id = parseInt(checkbox.id.replace("task-", ""));
    checkbox.addEventListener("change", () => toggleTask(id));
  });

  container.querySelectorAll("button[data-edit-id]").forEach((btn) => {
    const id = parseInt(btn.dataset.editId);
    btn.addEventListener("click", () => editTask(id));
  });

  container.querySelectorAll("button[data-delete-id]").forEach((btn) => {
    const id = parseInt(btn.dataset.deleteId);
    btn.addEventListener("click", () => deleteTask(id));
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  if (editingTaskId !== null) {
    tasks = tasks.map(task =>
      task.id === editingTaskId ? { ...task, text } : task
    );
    editingTaskId = null;
  } else {
    tasks.push({ id: Date.now(), text, completed: false });
  }

  updateTasks();
  closeAddTaskModal();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  updateTasks();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    openAddTaskModal(task);
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  updateTasks();
}

function updateTasks() {
  saveTasks();
  renderTasks();
  dispatchTaskUpdate();
}

function openAddTaskModal(task = null) {
  modal.classList.remove("hidden");
  input.value = task ? task.text : "";
  input.focus();
  editingTaskId = task ? task.id : null;
}

function closeAddTaskModal() {
  modal.classList.add("hidden");
  editingTaskId = null;
}

function dispatchTaskUpdate() {
  document.dispatchEvent(new CustomEvent("tasks-updated"));
}

function getTasks() {
  return tasks;
}

// Initial render
renderTasks();

export { renderTasks, addTask, getTasks, openAddTaskModal, closeAddTaskModal };