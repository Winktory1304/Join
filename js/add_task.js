/**
 * The key used to store the todos in local storage.
 * @type {string}
 */
let key = "todos";
let todos = [];
let subtask = [];
let subtaskdone = [];
let contacts = [];
let selectedContacts = [];
let priority = 2;
let status = "open";
let resultValidation = false;
let assignedPerson = [];
let allAssigned = [];
const htmlfields = ["assinedPersons", "task-list"];
var title = document.getElementById("addtask-input-title");
var date = document.getElementById("addtask-input-date");
var category = document.getElementById("addtask-input-category");
var createTaskButton = document.getElementById("addtask-button-create-task");
var description = document.getElementById("addtask-input-description");
var subtasks = document.getElementById("addtask-input-subtasks");

/**
 * Reads the todo tasks from the server.
 */
function readServerData() {
  readJSON("contacts", contacts);
  readJSON(key, todos);
}

function getReady() {
  setContacts(contacts);

  document.getElementById("addtask-input-assigned").classList.remove("d-none");

  // Ändere Event-Listener auf Klick-Ereignisse
  document
    .getElementById("addtask-input-assigned")
    .addEventListener("click", function () {
      document
        .getElementById("addtask-input-assigned")
        .classList.remove("d-none");
    });

  // Entferne den Event-Listener für mouseleave
  document
    .getElementById("addtask-input-assigned")
    .removeEventListener("mouseleave");

  // Optional: Füge eine Funktion hinzu, um das Dropdown-Menü zu schließen
  document.addEventListener("click", function (event) {
    var target = event.target;
    var assignedInput = document.getElementById("addtask-input-assigned");
    if (target !== assignedInput && !assignedInput.contains(target)) {
      assignedInput.classList.add("d-none");
    }
  });
}

function closeContactList() {
  document.getElementById("addtask-input-assigned").classList.remove("d-none");
}

function setContacts(array) {
  document.getElementById("addtask-input-assigned").innerHTML = "";
  array.forEach((element) => {
    document.getElementById(
      "addtask-input-assigned"
    ).innerHTML += `<div class="inputnew"> ${element.firstName} ${element.lastName} <input onchange="writeContactsintonewArray()" class="checkBox" type="checkbox" id="id-${element.id}" value=" ${element.firstName} ${element.lastName}"></div>`;
  });

  if (array.length === 0) {
    document.getElementById("addtask-input-assigned").innerHTML =
      "<option>No contacts available</option>";
  }
}

function writeContactsintonewArray() {
  let checkboxes = document.getElementsByClassName("checkBox");
  selectedContacts = [];
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedContacts.push(checkboxes[i].value);
    }
  }

  document.getElementById("test").innerHTML = "";

  selectedContacts.forEach((element) => {
    let contact = element.split(" ");
    let initials = contact.map((name) => name.charAt(0)).join("");

    document.getElementById("test").innerHTML += `
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="21" cy="21" r="20" fill=${randomColor()} stroke="white" stroke-width="2"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16px" fill="white">${initials}</text>
    </svg>
  `;

    if (todos.length === 0) return;
    else todos[todos.length - 1].contacts = selectedContacts;
  });
}

function initTask() {
  readServerData();
  validateInput();
  readServerData();
}

// Popup erstellen
function addTaskPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";

  setTimeout(function () {
    popup.style.display = "none";
  }, 1000);
}

/**
 * Clears the input fields.
 */
function clearInputs() {
  console.log("clear");
  title.value = "";
  description.value = "";
  subtasks.value = "";
  category.selectedIndex = 0;
  category.disabled = false;
  date.value = "";
}

/**
 * Validates the input fields and enables/disables the create task button accordingly.
 */
function validateInput() {
  resultValidation = validateForm();
  const button = document.getElementById("addtask-button-create-task");
  if (resultValidation) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

/**
 * Logs the input values and adds a new task to the todo list.
 */
function pushJSON() {
  debugger
  if (subtasks.value !== "") {
    subtask.push(subtasks.value);
    subtaskdone.push(0);
  }

  todos.push({
    id: checkId(),
    title: checkTitle(),
    task: description.value,
    subtasks: subtask,
    subtasksdone: subtaskdone,
    date: date.value,
    tag: category.value,
    priority: priority,
    contacts: selectedContacts,
    status: status,
  });

  setItem(key, todos);
}

/**
 * Checks if the title of the task already exists in the todo list and appends a number if necessary.
 * @returns {string} - The checked title value.
 */
function checkTitle() {
  let count = 1;
  todos.forEach((element) => {
    if (element.title === title.value) {
      title.value = title.value + count;
      count++;
    }
  });
  return title.value;
}

/**
 * Checks the id of the task to be added.
 * @returns {number} - The id of the task.
 */
function checkId() {
  if (todos.length === 0) {
    return 0;
  }
  return todos.length;
}

/**
 * Validates the form and returns true if all required fields are filled, false otherwise.
 * @returns {boolean} - The validation result.
 */
function validateForm() {
  if (title.value !== "" && date.value !== "" && category.value !== "") {
    return true;
  } else {
    return false;
  }
}
/**
 * selects the priority buttons and change classes
 * @param {String} prio
 */

function selectPrio(prio) {
  let containerUrgent = document.getElementById("addtaskButtonUrgent");
  let containerMedium = document.getElementById("addtaskButtonMedium");
  let containerLow = document.getElementById("addtaskButtonLow");

  containerUrgent.classList.remove("selected");
  containerMedium.classList.remove("selected");
  containerLow.classList.remove("selected");
  if (prio == "urgent") {
    containerUrgent.classList.add("selected");

    priority = 3;
  } else if (prio == "medium") {
    priority = 2;
    containerMedium.classList.add("selected");
  } else {
    priority = 1;
    containerLow.classList.add("selected");
  }
}
