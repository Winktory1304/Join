let todos = [{
  'id': 0,
  'tag': 'User Story',
  'title': 'Hier steht der Titel',
  'task': 'Hier wird der Taskname stehen',
  'subtasksdone': [],
  'subtasks': [],
  'priority': 0,
  'contacts': [],
  'status': 'open',
  },
];


/**
 * Function to clear inputfields
 * 
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

// function logInputValue() {
//   var titleInput = document.getElementById('addtask-input-title');
//   var descriptionInput = document.getElementById('addtask-input-description');
//   var subtasksInput = document.getElementById('addtask-input-subtasks');
//   var dateInput = document.getElementById('addtask-input-date');
//   var categorySelect = document.getElementById('addtask-input-category');

//   console.log("title: " + titleInput.value);
//   console.log("description: " + descriptionInput.value);
//   console.log("subtasks: " + subtasksInput.value);
//   console.log("date: " + dateInput.value);
//   console.log("tag: " + categorySelect.value);
//   console.log("status: " + 'open');
// }

/**
 * check inputfields * 
 * 
 */

function validateInput(){
  var resultValidation = validateForm();
  if (resultValidation == false) {
    document.getElementById("addtask-button-create-task").disabled = true;
    // alert('Bitte Pflichtfelder');
  } else {
    // document.getElementById("Button").disabled = true;
document.getElementById("addtask-button-create-task").disabled = false;
  }
}



function logInputValue() {
  var titleInput = document.getElementById('addtask-input-title');
  var descriptionInput = document.getElementById('addtask-input-description');
  var subtasksInput = document.getElementById('addtask-input-subtasks');
  var dateInput = document.getElementById('addtask-input-date');
  var categorySelect = document.getElementById('addtask-input-category');

  var titleValue = titleInput.value.trim();
  var descriptionValue = descriptionInput.value.trim();
  var subtasksValue = subtasksInput.value.trim();
  var dateValue = dateInput.value.trim();
  var categoryValue = categorySelect.value.trim();

  consoleLog(titleValue, descriptionValue, subtasksValue, dateValue, categoryValue);
}

function consoleLog(titleValue, descriptionValue, subtasksValue, dateValue, categoryValue){
  console.log('title: ' + titleValue);
  console.log('description: ' + descriptionValue);
  console.log('subtasks: ' + subtasksValue);
  console.log('date: ' + dateValue);
  console.log('tag: ' + categoryValue);
  console.log('status: open');
}

// Methode validate Form - gibt true oder false zurück

function validateForm(){ 
  if (document.getElementById("addtask-input-title").value === '')
    return false;
  if (document.getElementById("addtask-input-date").value === '') 
    return false;
  if (document.getElementById("addtask-input-category").value === '')
    return false; 
  console.log('perfekt');
  return true;
  }

function checkFieldEmpty(){
  if (document.getElementById("addtask-input-title").value === '')
   {document.getElementById("addtask-input-title");
   element.classList.remove("d-none");  
   }}






