


/**
 * The key used to store the todos in local storage.
 * @type {string}
 */
let key = 'todos';
let openassigned = false;


/**
 * Arrays die benötigt werden
 */
let todos = [];
let subtask = [];
let subtaskdone = [];
let contacts = [];
let selectedContacts = [];
let assignedPerson = [];
let allAssigned = [];
/**
 * Variable die benötigt wird
 */
let priority = 2;
let status = 'open';
let resultValidation = false;
const htmlfields = ['assinedPersons', 'task-list'];

function switchCase(statusInput) {	
  switch (statusInput) {
    case "title":
      return document.getElementById("addtask-input-title")
    case "titleValue":
      return document.getElementById("addtask-input-title").value
    case "description":
      return document.getElementById("addtask-input-description")
    case "descriptionValue":
      return document.getElementById("addtask-input-description").value
    case "subtasks":
      return document.getElementById("addtask-input-subtasks")
    case "subtasksValue":
      return document.getElementById("addtask-input-subtasks").value
    case "category":
      return document.getElementById("addtask-input-category")
    case "categoryValue":
      return document.getElementById("addtask-input-category").value
    case "date":
      return document.getElementById("addtask-input-date")
    case "dateValue":
      return document.getElementById("addtask-input-date").value
    case "assigned":
      return document.getElementById("addtask-input-assigned")
    case "assignedValue":
      return document.getElementById("addtask-input-assigned").value
    default:
      return null
  }
}

/**
 * Reads the todo tasks from the server.
 */
function readServerData() {
  readJSON("contacts", contacts);
  readJSON(key, todos);
}

/**
 * Sets up the necessary event listeners and functionality when the page is ready.
 */
function getReady() {
  
  if (openassigned === false) {
    // Wenn openassigned falsch ist
    // Entferne d-none
    document.getElementById('addtask-input-assigned').classList.remove("d-none");
    document.getElementById('test').classList.add("d-none");
    openassigned = true;
  setContacts(contacts);

}
 else {
  // Ansonsten
  // Füge d-none hinzu
  document.getElementById('addtask-input-assigned').classList.add("d-none");
  document.getElementById('test').classList.remove("d-none");
  openassigned = false;
   }
// getReady(), getarray();
  }








/**
 * Closes the contact list and removes the 'd-none' class from the 'addtask-input-assigned' element.
 */
function closeContactList() {
  switchCase('assigned').classList.remove("d-none");
}

function setContacts(array) {
  switchCase('assigned').innerHTML = "";
  array.forEach((element) => {
    switchCase('assigned').innerHTML += `<div class="inputnew"> ${element.firstName} ${element.lastName} <input onchange="writeContactsintonewArray()" class="checkBox" type="checkbox" id="id-${element.id}" value=" ${element.firstName} ${element.lastName}"></div>`;
  });

  if (array.length === 0) {
    switchCase(assigned).innerHTML =
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
    </svg>`;

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
  switchCase('title').value = "";
  switchCase('description').value = "";
  switchCase('subtasks').value = "";
  switchCase('category').selectedIndex = 0;
  switchCase('category').disabled = false;
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

  if (switchCase('subtasksValue') !== "") {
    subtask.push(switchCase('subtasksValue'));
    subtaskdone.push(0);
  }

  todos.push({
    id: checkId(),
    title: document.getElementById("addtask-input-title").value,
    task: switchCase('descriptionValue'),
    subtasks: subtask,
    subtasksdone: subtaskdone,
    date: switchCase('dateValue'),
    tag: switchCase('categoryValue'),
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
function checkTitle(titleDefaultValue) {
  let count = 1;
  debugger
  todos.forEach((element) => {
    if (element.title === titleDefaultValue) {
      let titleValue = titleDefaultValue + count;
      count++;
      return titleValue;
    } else {
      return titleDefaultValue;
    }
  });
 
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
  if (switchCase('titleValue')  !== "" && switchCase('dateValue')  !== "" && switchCase('categoryValue')  !== "") {
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
