let todos = [
  {
    id: 0,
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

// let todos = [];

function getItems() {
  todos.push(getItems(todos));
}
/**
 * This function is used to validate the date
 *
 */

function validateDate(dateString) {
  // Validates that the input string is a valid date formatted as "dd/mm/yyyy"
  // function isValidDate(dateString)
  // {
  // First check for the pattern
  console.log("klappt", dateString);
  if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString)) return false;

  // Parse the date parts to integers
  var parts = dateString.split("/");
  var day = parseInt(parts[2], 10);
  var month = parseInt(parts[1], 10);
  var year = parseInt(parts[0], 10);

  // Check the ranges of month and year
  if (year < 2024 || year > 2100 || month == 0 || month > 12)
    {console.log("falsches Datum", dateString);
      return false;}

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}
