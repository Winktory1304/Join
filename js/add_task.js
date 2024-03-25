let todos = [{
  'id': 0,
  'tag': 'User Story',
  'title': 'Hier steht der Titel',
  'task': 'Hier wird der Taskname stehen',
  'subtasksdone': [],
  'subtasks': [],
  'priority': 0,
  'contacts': [],
  'category': 'open'
  },
  {
    id: 1,
    tag: "User Story",
    title: "Hier steht der Titel",
    task: "Hier wird die Task stehen",
    subtasksdone: [0, 1],
    subtasks: ["subtask1", "subtask2"],
    date: "08/08/2024",
    priority: 0,
    contacts: ["Max Mustermann"],
    category: "open",
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
