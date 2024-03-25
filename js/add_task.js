let todos = [
  {
    'id': 0,
    'tag': 'User Story',
    'title': 'Hier steht der Titel',
    'task': 'Hier wird die Task stehen',
    'subtasksdone': [0, 1],
    'subtasks': ['subtask1', 'subtask2'],
    'date': '08/08/2024',
    'priority': 0,
    'contacts': ['Max Mustermann'],
    'category': 'open'
  },
  {
    'id': 1,
    'tag': 'User Story',
    'title': 'Hier steht der Titel',
    'task': 'Hier wird die Task stehen',
    'subtasksdone': [0, 1],
    'subtasks': ['subtask1', 'subtask2'],
    'date': '08/08/2024',
    'priority': 0,
    'contacts': ['Max Mustermann'],
    'category': 'open'
  },
];

// let todos = [];

function getItems() {
  todos.push(getItems(todos))
}
/**
 * This function is used to validate the date
 * 
 */
function validateDate(date) {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Regex pattern for YYYY-MM-DD format
  if (!regex.test(date)) {
    console.log("Invalid date format. Please enter a date in the format YYYY-MM-DD.");
    return false;
  }

  const inputDate = new Date(date);
  if (isNaN(inputDate.getTime())) {
    console.log("Invalid date. Please enter a valid date.");
    return false;
  }

  return true;
}