const defaultStaff = [
    { first: "John", last: "Doe", position: "Manager", phone: "555-123-4567", email: "john.doe@email.com" },
    { first: "Jane", last: "Smith", position: "Clerk", phone: "555-234-5678", email: "jane.smith@email.com" },
    { first: "Mike", last: "Brown", position: "Janitor", phone: "555-345-6789", email: "mike.brown@email.com" },
    { first: "Anna", last: "Lee", position: "Salesperson", phone: "555-456-7890", email: "anna.lee@email.com" },
    { first: "David", last: "Kim", position: "Manager", phone: "555-567-8901", email: "david.kim@email.com" },
    { first: "Sara", last: "Johnson", position: "Clerk", phone: "555-678-9012", email: "sara.johnson@email.com" },
    { first: "Chris", last: "Davis", position: "Salesperson", phone: "555-789-0123", email: "chris.davis@email.com" },
    { first: "Laura", last: "Wilson", position: "Janitor", phone: "555-890-1234", email: "laura.wilson@email.com" },
    { first: "Mark", last: "Taylor", position: "Salesperson", phone: "555-901-2345", email: "mark.taylor@email.com" },
    { first: "Emily", last: "Moore", position: "Clerk", phone: "555-012-3456", email: "emily.moore@email.com" },
    { first: "Paul", last: "Clark", position: "Manager", phone: "555-345-9876", email: "paul.clark@email.com" },
    { first: "Amy", last: "Hall", position: "Salesperson", phone: "555-456-8765", email: "amy.hall@email.com" },
    { first: "Steve", last: "Young", position: "Janitor", phone: "555-567-7654", email: "steve.young@email.com" },
    { first: "Rachel", last: "Allen", position: "Clerk", phone: "555-678-6543", email: "rachel.allen@email.com" },
    { first: "Luke", last: "King", position: "Salesperson", phone: "555-789-5432", email: "luke.king@email.com" },
  ];
  
  let staff = JSON.parse(localStorage.getItem("staff")) || defaultStaff;
  localStorage.setItem("staff", JSON.stringify(staff));
  
  const tableBody = document.getElementById("staff-body");
  const searchInput = document.getElementById("staff-search");
  const sortNameBtn = document.getElementById("sort-name");
  const sortPositionBtn = document.getElementById("sort-position");
  const filterSelect = document.getElementById("filter-position");
  
  // Populate filter dropdown
  const positions = [...new Set(staff.map(s => s.position))];
  positions.forEach(pos => {
    const option = document.createElement("option");
    option.value = pos;
    option.textContent = pos;
    filterSelect.appendChild(option);
  });
  
  function renderStaff(list = staff) {
    tableBody.innerHTML = "";
  
    list.forEach(member => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${member.first}</td>
        <td>${member.last}</td>
        <td>${member.position}</td>
        <td>${member.email}</td>
        <td>${member.phone}</td>
        <td><span class="material-symbols-outlined">more_vert</span></td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Event Listeners
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = staff.filter(s =>
      Object.values(s).some(val => val.toLowerCase().includes(query))
    );
    renderStaff(filtered);
  });
  
  sortNameBtn.addEventListener("click", () => {
    const sorted = [...staff].sort((a, b) => a.first.localeCompare(b.first));
    renderStaff(sorted);
  });
  
  sortPositionBtn.addEventListener("click", () => {
    const sorted = [...staff].sort((a, b) => a.position.localeCompare(b.position));
    renderStaff(sorted);
  });
  
  filterSelect.addEventListener("change", () => {
    const val = filterSelect.value;
    if (!val) return renderStaff();
    const filtered = staff.filter(s => s.position === val);
    renderStaff(filtered);
  });
  
  // Initial render
  renderStaff();



  // Help Section Toggle
const helpToggleBtn = document.querySelector(".help-toggle");
const helpContent = document.querySelector(".help-content");

if (helpToggleBtn && helpContent) {
  helpToggleBtn.addEventListener("click", () => {
    const isExpanded = helpToggleBtn.getAttribute("aria-expanded") === "true";
    helpToggleBtn.setAttribute("aria-expanded", String(!isExpanded));
    helpContent.classList.toggle("open");
  });
}