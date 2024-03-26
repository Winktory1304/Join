let todos = [];

let key = 'todos';

let subtask = [];
let subtaskdone = [];
let contacts = [];



function readServerData() {
  readJSON(key, todos);
  console.log(todos);
}

function addTask() {
  try {
    
    setItem(key, todos);
  } catch (error) {
    console.error('Error adding task', error);
  }
}



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

/**
 * 
 * 
 */
function logInputValue() {
  var titleInput = document.getElementById('addtask-input-title');
  var descriptionInput = document.getElementById('addtask-input-description');
  var subtasksInput = document.getElementById('addtask-input-subtasks');
  var dateInput = document.getElementById('addtask-input-date');
  var categorySelect = document.getElementById('addtask-input-category');

  var titleValue = titleInput.value
  var descriptionValue = descriptionInput.value
  var subtasksValue = subtasksInput.value
  var dateValue = dateInput.value
  var categoryValue = categorySelect.value

  consoleLog(titleValue, descriptionValue, subtasksValue, dateValue, categoryValue);
}

function consoleLog(titleValue, descriptionValue, subtasksValue, dateValue, categoryValue){
  
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

function checkId() {
  if (todos.length === 0) {
    return 0;
  }
  return todos.length;
}
/**
 *  Function validate form - response true oder false
 *  False = Required field is empty
 *  True = Required field are totally filled
 * 
 */

function validateForm(){ 
  if (document.getElementById("addtask-input-title").value === '')
    return false;
  if (document.getElementById("addtask-input-date").value === '') 
    return false;
  if (document.getElementById("addtask-input-category").value === '')
    return false; 
  return true;
  }

function checkFieldEmpty(){
  if (document.getElementById("addtask-input-title").value === '')
   {document.getElementById("messagedatevalidationTitel").classList.remove("d-none");
   }
   if (document.getElementById("addtask-input-date").value === '')
   {document.getElementById("messagedatevalidationDate").classList.remove("d-none");
   }
   if (document.getElementById("addtask-input-date").value === '')
   {document.getElementById("messagedatevalidationCategory").classList.remove("d-none");
   }
if (document.getElementById("addtask-input-date").value !== '')
   document.getElementById("addtask-input-date").classList.add("addtaskBlack");
  }

  






