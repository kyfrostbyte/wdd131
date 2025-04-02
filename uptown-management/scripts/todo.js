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

function renderTasks() {
  container.innerHTML = "";
  const ul = document.createElement("ul");

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${task.id}`; // unique ID
    checkbox.checked = task.completed;
    checkbox.onchange = () => toggleTask(task.id);

    const label = document.createElement("label");
    label.setAttribute("for", checkbox.id);
    label.textContent = task.text;
    label.className = "todo-label";
    if (task.completed) label.classList.add("checked");

    const actions = document.createElement("div");
    actions.className = "todo-actions";
    actions.innerHTML = `
      <button onclick="editTask(${task.id})">✏️</button>
      <button onclick="deleteTask(${task.id})">🗑️</button>
    `;

    li.append(checkbox, label, actions);
    ul.appendChild(li);
  });

  container.appendChild(ul);
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text, completed: false });
  updateTasks();
  closeModal();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  updateTasks();
}

function updateTasks() {
  saveTasks();
  renderTasks();
  dispatchTaskUpdate();
}

window.editTask = function (id) {
  const current = tasks.find((t) => t.id === id);
  const newText = prompt("Edit task:", current.text);
  if (newText?.trim()) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText.trim() } : task
    );
    updateTasks();
  }
};

window.deleteTask = function (id) {
  tasks = tasks.filter((task) => task.id !== id);
  updateTasks();
};

function openAddTaskModal() {
  modal.classList.remove("hidden");
  input.value = "";
  input.focus();
}

function closeAddTaskModal() {
  modal.classList.add("hidden");
}

function dispatchTaskUpdate() {
  document.dispatchEvent(new CustomEvent("tasks-updated"));
}

function getTasks() {
  return tasks;
}

// Initial render
renderTasks();

export { renderTasks, addTask, getTasks, openAddTaskModal, closeAddTaskModal};