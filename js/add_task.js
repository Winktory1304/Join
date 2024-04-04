/**
 * The key used to store the todos in local storage.
 * @type {string}
 */
let key = 'todos';


/**
 * Arrays die benötigt werden
 */
let todos = [];
let subtask = [];
let subtaskdone = [];
let contacts = [];
let selectedContacts = [];

let priority = 2;
let status = 'open';

let resultValidation = false;


let assignedPerson = [];
let allAssigned = [];
const htmlfields = ['assinedPersons', 'task-list'];

/**
 * Reads the todo tasks from the server.
 */
function readServerData() {
  readJSON('contacts', contacts);
  readJSON(key, todos);
}

function getReady() {
  setContacts(contacts);

  document.getElementById('addtask-input-assigned').classList.remove('d-none');
  
  document.getElementById('addtask-input-assigned').addEventListener('mouseover', function () {
    document.getElementById('addtask-input-assigned').classList.remove('d-none');
  });

  document.getElementById('addtask-input-assigned').addEventListener('mouseleave', function () {
    document.getElementById('addtask-input-assigned').classList.add('d-none');
  });
}

function closeContactList() {
  document.getElementById('addtask-input-assigned').classList.remove('d-none');


}


function setContacts(array) {
  document.getElementById('addtask-input-assigned').innerHTML = '';
  array.forEach((element) => {
    document.getElementById('addtask-input-assigned').innerHTML += `<div class="inputnew"> ${element.firstName} ${element.lastName} <input class="checkBox" type="checkbox" id="id-${element.id}" value=" ${element.firstName} ${element.lastName}"></div>`;
  });

  if (array.length === 0) {
    document.getElementById('addtask-input-assigned').innerHTML = '<option>No contacts available</option>';
  }
}



let title = document.getElementById('addtask-input-title');
let date = document.getElementById('addtask-input-date');
let category = document.getElementById('addtask-input-category');
let createTaskButton = document.getElementById('addtask-button-create-task');

function initTask() {
  readServerData();
  validateInput();
  readServerData();
}

// Popup erstellen
function addTaskPopup() {
  var popup = document.getElementById('popup');
  popup.style.display = 'block';

  setTimeout(function () {
    popup.style.display = 'none';
  }, 1000);
}

/**
 * Clears the input fields.
 */
function clearInputs() {
  console.log('clear');
  document.getElementById('addtask-input-title').value = '';
  document.getElementById('addtask-input-description').value = '';
  document.getElementById('addtask-input-subtasks').value = '';
  var categoryInput = document.getElementById('addtask-input-category');
  categoryInput.selectedIndex = 0;
  categoryInput.disabled = false;
  var dateInput = document.getElementById('addtask-input-date');
  dateInput.value = '';
}

/**
 * Validates the input fields and enables/disables the create task button accordingly.
 */
function validateInput() {

  resultValidation = validateForm();
  const button = document.getElementById("addtask-button-create-task");
  if (resultValidation) {
    button.disabled = false;

  }
  else {
    button.disabled = true;
  }
}

/**
 * Logs the input values and adds a new task to the todo list.
 */
function pushJSON() {
  var descriptionValue = document.getElementById('addtask-input-description').value;
  var subtasksValue = document.getElementById('addtask-input-subtasks').value;
  var dateValue = document.getElementById('addtask-input-date').value;
  var categoryValue = document.getElementById('addtask-input-category').value;
  var contactsValue = document.getElementById('addtask-input-assigned').value;

  let x = [contactsValue];

  if (subtasksValue !== '') {
    subtask.push(subtasksValue);
    subtaskdone.push(0);
  }

  todos.push({
    'id': checkId(),
    'title': checkTitle(),
    'task': descriptionValue,
    'subtasks': subtask,
    'subtasksdone': subtaskdone,
    'date': dateValue,
    'tag': categoryValue,
    'priority': priority,
    'contacts': x,
    'status': status
  });

  setItem(key, todos);

  console.log(todos);
}

/**
 * Checks if the title of the task already exists in the todo list and appends a number if necessary.
 * @returns {string} - The checked title value.
 */
function checkTitle() {
  let titleValue = document.getElementById('addtask-input-title').value;
  let count = 1;
  todos.forEach((element) => {
    if (element.title === titleValue) {
      titleValue = titleValue + count;
      count++;
    }
  });
  return titleValue;
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
  if (document.getElementById("addtask-input-title").value !== '' && document.getElementById("addtask-input-date").value !== '' && document.getElementById("addtask-input-category").value !== '') {
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
  let containerUrgent = document.getElementById('addtaskButtonUrgent');
  let containerMedium = document.getElementById('addtaskButtonMedium');
  let containerLow = document.getElementById('addtaskButtonLow');

  containerUrgent.classList.remove('selected');
  containerMedium.classList.remove('selected');
  containerLow.classList.remove('selected');
  if (prio == 'urgent') {
    containerUrgent.classList.add('selected');
    priority = 3;
  } else if (prio == 'medium') {
    priority = 2;
      containerMedium.classList.add('selected');
  } else {
    priority = 1;
      containerLow.classList.add('selected');
  }

  console.log(prio);
}
