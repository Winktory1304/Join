/**
 * An array to store the todo tasks.
 * @type {Array}
 */
let todos = [];

/**
 * The key used to store the todos in local storage.
 * @type {string}
 */
let key = 'todos';

/**
 * An array to store the subtasks of a task.
 * @type {Array}
 */
let subtask = [];

/**
 * An array to store the completion status of subtasks.
 * @type {Array}
 */
let subtaskdone = [];

/**
 * An array to store the contacts related to a task.
 * @type {Array}
 */
let contacts = [];


let resultValidation = false;


/**
 * Reads the todo tasks from the server.
 */
function readServerData() {
  readJSON(key, todos);
  console.log(todos);
}

let title = document.getElementById('addtask-input-title');
let date = document.getElementById('addtask-input-date');
let category = document.getElementById('addtask-input-category');
let createTaskButton = document.getElementById('addtask-button-create-task');

function initTask() {
  readServerData();
  validateInput();
}


/**
 * Adds a task to the todo list.
 */
function addTask() {
  addTaskPopup()
  pushJSON();
  try {
    setItem(key, todos);
  } catch (error) {
    console.error('Error adding task', error);
  }
}





  // Popup erstellen
function addTaskPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
  
    setTimeout(function() {
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

function addSubtask() {
  var input = document.getElementById("addtask-input-subtasks");
  var container = document.getElementById("subtaskListContainer");
  
  var subtaskText = input.value;
  subtask.push(subtaskText); // Fügt den Subtask dem Array hinzu
  
  var subtaskElement = document.createElement("li");
  subtaskElement.textContent = subtaskText;
  subtaskElement.style.paddingLeft = "16px";
  subtaskElement.style.fontSize = "18px";
  
  container.parentNode.appendChild(subtaskElement);
  
  input.value = ""; // Optional: Clear the input field after adding the subtask
}

/**
 * Validates the input fields and enables/disables the create task button accordingly.
 */
function validateInput() {
  
  resultValidation = validateForm();
  const button =  document.getElementById("addtask-button-create-task");
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
    'priority': 1,
    'contacts': contacts,
    'status': 'open'
  });

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
 * Checks if any of the required fields are empty and shows error messages accordingly.
 */
function checkFieldEmpty(name, blub) {
  if (document.getElementById(name).value === '') {
    document.getElementById(blub).classList.remove("d-none");
  }
  else {
    document.getElementById(blub).classList.add("d-none");
  }
  // if ( !== '') {
  //   document.getElementById("addtask-input-date").classList.add("addtaskBlack");
  // }
}

function checkFieldEmpty2(name, blub) {
  if (document.getElementById(name).value === '') {
    document.getElementById(blub).classList.remove("d-none");
  }
  else 
    document.getElementById(blub).classList.add("d-none");
  // if ( !== '') {
  //   document.getElementById("addtask-input-date").classList.add("addtaskBlack");
  // }
}








