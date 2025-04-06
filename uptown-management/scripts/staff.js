// staff.js

import { staffRowTemplate } from "./templates.js";
import { setupHelpSlideshow, setupHelpToggle } from "./main.js";

const defaultStaff = [
  { id: 1, first: "John", last: "Doe", position: "Manager", phone: "555-123-4567", email: "john.doe@email.com" },
  { id: 2, first: "Jane", last: "Smith", position: "Clerk", phone: "555-234-5678", email: "jane.smith@email.com" },
  { id: 3, first: "Mike", last: "Brown", position: "Janitor", phone: "555-345-6789", email: "mike.brown@email.com" },
  { id: 4, first: "Anna", last: "Lee", position: "Salesperson", phone: "555-456-7890", email: "anna.lee@email.com" },
  { id: 5, first: "David", last: "Kim", position: "Manager", phone: "555-567-8901", email: "david.kim@email.com" },
  { id: 6, first: "Sara", last: "Johnson", position: "Clerk", phone: "555-678-9012", email: "sara.johnson@email.com" },
  { id: 7, first: "Chris", last: "Davis", position: "Salesperson", phone: "555-789-0123", email: "chris.davis@email.com" },
  { id: 8, first: "Laura", last: "Wilson", position: "Janitor", phone: "555-890-1234", email: "laura.wilson@email.com" },
  { id: 9, first: "Mark", last: "Taylor", position: "Salesperson", phone: "555-901-2345", email: "mark.taylor@email.com" },
  { id: 10, first: "Emily", last: "Moore", position: "Clerk", phone: "555-012-3456", email: "emily.moore@email.com" },
  { id: 11, first: "Paul", last: "Clark", position: "Manager", phone: "555-345-9876", email: "paul.clark@email.com" },
  { id: 12, first: "Amy", last: "Hall", position: "Salesperson", phone: "555-456-8765", email: "amy.hall@email.com" },
  { id: 13, first: "Steve", last: "Young", position: "Janitor", phone: "555-567-7654", email: "steve.young@email.com" },
  { id: 14, first: "Rachel", last: "Allen", position: "Clerk", phone: "555-678-6543", email: "rachel.allen@email.com" },
  { id: 15, first: "Luke", last: "King", position: "Salesperson", phone: "555-789-5432", email: "luke.king@email.com" }
];

const staffSlides = [
  { img: "assets/images/slideshow/staff/slide1_fulltable.webp", text: "The staff directory displays information about all current staff members including name, email, phone and position.", alt: "Screenshot of the full staff table" },
  { img: "assets/images/slideshow/staff/slide2_filters.webp", text: "Use the search bar to find staff by name or details, and filter or sort the table by position to quickly narrow down your view.", alt: "Table with arrows pointing to search, filter, and sort controls" },
  { img: "assets/images/slideshow/staff/slide3_editbutton.webp", text: "Click the three-dot edit icon next to any staff member to open their profile where you can update their information.", alt: "Edit icon highlighted with a red arrow" },
  { img: "assets/images/slideshow/staff/slide4_editmodal.webp", text: "The edit modal allows you to modify the staff member's name, position, email, or phone number.", alt: "Edit modal with a highlighted input field" },
  { img: "assets/images/slideshow/staff/slide5_saveedit.webp", text: "After making changes, click the save button to update the staff record. Your changes will be immediately reflected in the table.", alt: "Edit modal with a red arrow pointing at the save button" }
];


function init() {
  setupHelpSlideshow(staffSlides, "position-help-btn");
  setupHelpToggle();
  renderStaff();
}
document.addEventListener("DOMContentLoaded", init);

// Initialize staff list from localStorage or default
let staff = JSON.parse(localStorage.getItem("staff")) || defaultStaff;
localStorage.setItem("staff", JSON.stringify(staff));

const tableBody = document.getElementById("staff-body");
const searchInput = document.getElementById("staff-search");
const filterSelect = document.getElementById("filter-position");
const sortSelect = document.getElementById("sort-by");

// Populate filter dropdown with unique positions
const positions = [...new Set(staff.map((s) => s.position))];
positions.forEach((pos) => {
  const option = document.createElement("option");
  option.value = pos;
  option.textContent = pos;
  filterSelect.appendChild(option);
});

// Render table rows
function renderStaff(list = staff) {
  tableBody.innerHTML = list.map(staffRowTemplate).join("");
}

// Filter by position
function filterStaffByPosition(list, position) {
  return position ? list.filter((s) => s.position === position) : list;
}

// Search by any field
function searchStaff(list, query) {
  return query
    ? list.filter((s) =>
        Object.values(s).some((val) =>
          String(val).toLowerCase().includes(query)
        )
      )
    : list;
}

// Sort by first name or position
function sortStaff(list, sortValue) {
  if (sortValue === "name") {
    return [...list].sort((a, b) => a.first.localeCompare(b.first));
  } else if (sortValue === "position") {
    return [...list].sort((a, b) => a.position.localeCompare(b.position));
  }
  return list;
}

// Combined filtering, searching, and sorting
function updateStaffView() {
  const query = searchInput.value.toLowerCase();
  const positionFilter = filterSelect.value;
  const sortValue = sortSelect.value;

  let updatedList = staff;
  updatedList = searchStaff(updatedList, query);
  updatedList = filterStaffByPosition(updatedList, positionFilter);
  updatedList = sortStaff(updatedList, sortValue);

  renderStaff(updatedList);
}

// Event Listeners
searchInput.addEventListener("input", updateStaffView);
filterSelect.addEventListener("change", updateStaffView);
sortSelect.addEventListener("change", updateStaffView);

// Edit Staff Modal Logic
const editModal = document.getElementById("edit-modal");
const editForm = document.getElementById("edit-form");
const cancelButton = document.getElementById("edit-cancel");

const editId = document.getElementById("edit-id");
const editFirst = document.getElementById("edit-first");
const editLast = document.getElementById("edit-last");
const editPosition = document.getElementById("edit-position");
const editEmail = document.getElementById("edit-email");
const editPhone = document.getElementById("edit-phone");

function openEditModal(staffMember) {
  editId.value = staffMember.id;
  editFirst.value = staffMember.first;
  editLast.value = staffMember.last;
  editPosition.value = staffMember.position;
  editEmail.value = staffMember.email;
  editPhone.value = staffMember.phone;

  editModal.classList.remove("hidden");
}

function closeEditModal() {
  editModal.classList.add("hidden");
}

function getStaffFromRow(row) {
  const id = parseInt(row.dataset.id, 10);
  return staff.find((s) => s.id === id);
}

function handleEditClick(event) {
  // Make sure its an edit icon
  const button = event.target.closest(".edit-icon");
  if (!button) return;

  const row = event.target.closest("tr");
  const staffMember = getStaffFromRow(row);
  if (staffMember) openEditModal(staffMember);
}

function handleEditSave(event) {
  event.preventDefault();

  const id = Number(editId.value);
  const index = staff.findIndex((s) => s.id === id);

  if (index !== -1) {
    staff[index] = {
      ...staff[index],
      first: editFirst.value,
      last: editLast.value,
      position: editPosition.value,
      email: editEmail.value,
      phone: editPhone.value,
    };

    localStorage.setItem("staff", JSON.stringify(staff));
    renderStaff();
    closeEditModal();
  }
}

// Modal Event Listeners
document.addEventListener("click", handleEditClick);
editForm.addEventListener("submit", handleEditSave);
cancelButton.addEventListener("click", closeEditModal);
