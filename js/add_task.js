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

function logInputValue() {
  var titleInput = document.getElementById('addtask-input-title');
  var descriptionInput = document.getElementById('addtask-input-description');
  var subtasksInput = document.getElementById('addtask-input-subtasks');
  var dateInput = document.getElementById('addtask-input-date');
  var categorySelect = document.getElementById('addtask-input-category');

  console.log("title: " + titleInput.value);
  console.log("description: " + descriptionInput.value);
  console.log("subtasks: " + subtasksInput.value);
  console.log("date: " + dateInput.value);
  console.log("tag: " + categorySelect.value);
  console.log("status: " + 'open');
}