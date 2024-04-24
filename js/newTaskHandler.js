let task = new Task();

/**
 * function create a new task
 * 
 */
function createnewTask() {
  task.id = todos.length + 1;
  task.title = document.getElementById("addtask-input-title").value;
  task.task = document.getElementById("addtask-input-description").value;
  task.date = document.getElementById("addtask-input-date").value;
  task.tag = document.getElementById("addtask-input-category").value;
  task.priority = priority;
  task.contacts = selectedContacts;
  task.subtasks = subtask;
  task.status = "open";
  todos.push(task);
}


/**
 * async function write task to server
 * 
 */
function writeTasktoServer() {
  createnewTask();
  addTaskPopup();
  setTimeout(() => {
    try {
      setItem("todos", todos).then(() => {
        readServer();
        clearInputs();
      });
    } catch (error) {
      console.error("Error adding task", error);
    }
  }, 1000);
}


/**
 * function write task to server
 * 
 */
function startWriteTasktoServer() {
  debugger;
  console.log('test');
  writeTasktoServer();
  setTimeout(() => {
    window.location.href = "/html/board.html";
  }, 5000);
  console.log('test2');
  document.getElementById("addtask-button-create-task").disabled = true;
  console.log('test3');
}

/**
 * async function read from server
 * 
 */
async function readfromServer() {
  todos = [];
  readJSON("todos", todos);
  updateHTML();
}


/**
 * function delete Contacts from Task
 * @param {
 * } contactID 
 */
function deleteContactsfromTasks(contactID) {
  contactID = contacts[contactID].idContact;
  todos.forEach((task) => {
    task.contacts = task.contacts.filter((contact) => contact.id !== contactID);
  });
  setItem("todos", todos);
}