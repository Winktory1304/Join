/**
 * The key used to store the todos in local storage.
 * @type {string}
 */
let key = "todos";


/**
 * status list assigned to
 */
let openassigned = false;


/**
 * arrays
 */
let todos = [];
let subtask = [];
let subtaskdone = [];
let contacts = [];
let selectedContacts = [];
let assignedPerson = [];
let allAssigned = [];


/**
 * variables
 */
let priority = 2;
let status = "open";
let resultValidation = false;
const htmlfields = ["assinedPersons", "task-list"];


/**
 * 
 * @param {*} statusInput 
 * @returns 
 */
function switchCase(statusInput) {
  switch (statusInput) {
    case "title":
      return document.getElementById("addtask-input-title");
    case "titleValue":
      return document.getElementById("addtask-input-title").value;
    case "description":
      return document.getElementById("addtask-input-description");
    case "descriptionValue":
      return document.getElementById("addtask-input-description").value;
    case "subtasks":
      return document.getElementById("addtask-input-subtasks");
    case "subtasksValue":
      return document.getElementById("addtask-input-subtasks").value;
    case "category":
      return document.getElementById("addtask-input-category");
    case "categoryValue":
      return document.getElementById("addtask-input-category").value;
    case "date":
      return document.getElementById("addtask-input-date");
    case "dateValue":
      return document.getElementById("addtask-input-date").value;
    case "assigned":
      return document.getElementById("addtask-input-assigned");
    case "assignedValue":
      return document.getElementById("addtask-input-assigned").value;
    default:
      return null;
  }
}


/**
 * Reads the todo tasks from the server.
 */
function readServerData() {
  readJSON("contacts", contacts);
  readJSON(key, todos);
  getName();
}


/**
 * function for the assigned to
 */
function openAndCloseAddTaskInputAssigned() {
  if (openassigned === false) {
    document.getElementById("addtask-input-assigned").classList.remove("d-none");
    document.getElementById("test").classList.add("d-none");
    openassigned = true;
    setContacts(contacts);
  } else {
    document.getElementById("addtask-input-assigned").classList.add("d-none");
    document.getElementById("test").classList.remove("d-none");
    openassigned = false;
  }
}


function getReadyBoard(id) {
  if (openassigned === false) {
    document
      .getElementById("addtask-input-assigned")
      .classList.remove("d-none");
    document.getElementById("test").classList.add("d-none");
    openassigned = true;
    setContactstoTodo(id);
  } else {
    document.getElementById("addtask-input-assigned").classList.add("d-none");
    document.getElementById("test").classList.remove("d-none");
    openassigned = false;
  }
}


/**
 * Closes the contact list and removes the 'd-none' class from the 'addtask-input-assigned' element.
 */
function closeContactList() {
  switchCase("assigned").classList.remove("d-none");
}


/**
 * contact list
 */
function setContacts(array) {
  switchCase("assigned").innerHTML = "";
  array.forEach((element) => {
    let id = "contactcircle-" + element.idContact;
    let initials = element.firstLetterofNames;
    let color = element.color;
    switchCase(
      "assigned"
    ).innerHTML += /*html*/`<div class="inputnew widthContacts cursorPointer" id="setAssign-${element.idContact}" onclick="setAssign('${element.idContact}'),writeContactsintonewArray('${element.idContact}', '${element.firstName}','${element.lastName}','${color}','${initials}',)">  
    <div class="board_cardcontactsring">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle id=${id} cx="21" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16px" fill="white">${initials}</text>
    </svg>
        </div>${element.firstName} ${element.lastName} 
    <input class="checkBox" type="checkbox" id="${element.idContact}" value="${element.firstName} ${element.lastName}" onclick="setAssign('${element.idContact}')">
    </div>`;
  });
}


function writeContactsintonewArray(id, firstName, lastName, color, initials) {
  let checkboxes = document.getElementsByClassName("checkBox");
  selectedContacts = [];
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      let idContact = checkboxes[i].id;
      let firstName = checkboxes[i].value.split(" ")[0];
      let lastName = checkboxes[i].value.split(" ")[1];
      let color = document
        .getElementById("contactcircle-" + idContact)
        .getAttribute("fill");
      let initials = checkboxes[i].value
        .split(" ")
        .map((name) => name.charAt(0))
        .join("");
      selectedContacts.push(
        new Contact(idContact, firstName + " " + lastName, color, initials)
      );
    }}
  document.getElementById("test").innerHTML = "";
  selectedContacts.forEach((element) => {
    let contact = element.name.split(" ");
    let initials = contact.map((name) => name.charAt(0)).join("");
    let id = "contactcircle-" + element.idContact;
    let color = element.color;
    document.getElementById("test").innerHTML += `
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle id="${id}" cx="21" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16px" fill="white">${initials}</text>
    </svg>`;
    if (todos.length === 0) return;
  });
}


function initTask() {
  isloggedin();
  readServerData();
  setTimeout(function () {
    keyPress();
  }, 1000);
}


/**
 * add a popup
 * 
 */
function addTaskPopup() {
  document.getElementById("popup").classList.remove("d-none");
  setTimeout(function () {
    document.getElementById("popup").classList.add("d-none");
  }, 3000);
}


/**
 * Clears the input fields, delete arrays
 */
function clearInputs() {
  switchCase("title").value = "";
  switchCase("description").value = "";
  switchCase("date").value = "";
  switchCase("category").selectedIndex = 0;
  switchCase("category").disabled = false;
  var container = document.getElementById("containerForSubtask"); 
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  subtask = [];
  document.getElementById("containerForSubtask").classList.add("d-none");
  let checkboxes = document.getElementsByClassName("checkBox");
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
  selectedContacts = [];
  document.getElementById("test").innerHTML = "";
  document.getElementById("addtask-input-assigned").classList.add("d-none");
  document.getElementById("test").classList.add("d-none");
  openassigned = false;
  let containerUrgent = document.getElementById("addtaskButtonUrgent");
  let containerMedium = document.getElementById("addtaskButtonMedium");
  let containerLow = document.getElementById("addtaskButtonLow");
  containerUrgent.classList.remove("selected");
  containerMedium.classList.add("selected");
  containerLow.classList.remove("selected");
}


/**
 * Checks if the title of the task already exists in the todo list and appends a number if necessary.
 * @returns {string} - The checked title value.
 */
function checkTitle(titleDefaultValue) {
  let count = 1;
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


function checkEventInAssignedToAndClose(event) {
  var elementAddTask = document.getElementById("addtask-input-assigned");
  if (event.target != elementAddTask && event.target.parentNode != elementAddTask 
    && event.target.parentNode.parentNode != elementAddTask) { closeListAssignedTo(); }
}


function closeListAssignedTo() {
  if (openassigned === true) {
    document.getElementById("addtask-input-assigned").classList.add("d-none");
    document.getElementById("test").classList.remove("d-none");
    openassigned = false;
  }
}


function keyPress(){
  document.getElementById("addtask-input-subtasks").addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        addSubtask();
    }
  });
  }