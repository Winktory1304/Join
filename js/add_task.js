let todos = [
  {
    id: 0,
    tag: "User Story",
    title: "Titel aus task",
    subtasksdone: [],
    date: "",
    subtasks: [],
    priority: 0,
    contacts: [],
    category: "open",
  },
  {
    id: 0,
    tag: "User Story",
    title: "Titel aus task",
    subtasksdone: [],
    date: "",
    subtasks: [],
    priority: 0,
    contacts: [],
    category: "open",
  },
];

// let todos = [];

function getItems(){
  todos.push(getItems(todos))
}
/**
 * This function is used to validate the date
 * 
 */
function validateDate() {
  var dateInput = document.getElementById('addtask-input-date').value;
  var dateParts = dateInput.split("-");
  var day = parseInt(dateParts[2], 10);
  var month = parseInt(dateParts[1], 10);
  var year = parseInt(dateParts[0], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    document.getElementById('validation-result').innerText = 'Ungültiges Datum.';
  } else {
    var dateString = day + '/' + month + '/' + year;
    var datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!datePattern.test(dateString)) {
      document.getElementById('validation-result').innerText = 'Ungültiges Datum.';
    } else {
      document.getElementById('validation-result').innerText = 'Gültiges Datum.';
    }
  }
}