
/**
 * Searches for tasks based on user input and updates the board with matching tasks.
 */
function searchTask() {

  document.getElementById('board_findTask_input').addEventListener('keyup', function () {
    var search = document.getElementById('board_findTask_input').value;
    var searchArray = todos.filter(t => t.title.includes(search));
    var statusopen = searchArray.filter(t => t.status === 'open');
    var statusfeedback = searchArray.filter(t => t.status === 'feedback');
    var statusprogress = searchArray.filter(t => t.status === 'progress');
    var statusdone = searchArray.filter(t => t.status === 'done');

    if (statusprogress.length !== 0) {
      document.getElementById('board_progress').innerHTML = '';
      statusprogress.forEach((element) => {
        document.getElementById('board_progress').innerHTML += generateTodoHTML(element);
      });
      document.getElementById('board_done').innerHTML = '';
      document.getElementById('board_feedback').innerHTML = '';
    } else if (statusopen.length !== 0) {
      document.getElementById('board_open').innerHTML = '';
      statusopen.forEach((element) => {
        document.getElementById('board_open').innerHTML += generateTodoHTML(element);
      });
      document.getElementById('board_done').innerHTML = '';
      document.getElementById('board_feedback').innerHTML = '';
    } else if (statusfeedback.length !== 0) {
      document.getElementById('board_feedback').innerHTML = '';
      statusfeedback.forEach((element) => {
        document.getElementById('board_feedback').innerHTML += generateTodoHTML(element);
      });
      document.getElementById('board_done').innerHTML = '';
      document.getElementById('board_open').innerHTML = '';
    } else if (statusdone.length !== 0) {
      document.getElementById('board_done').innerHTML = '';
      statusdone.forEach((element) => {
        document.getElementById('board_done').innerHTML += generateTodoHTML(element);
      });
      document.getElementById('board_feedback').innerHTML = '';
      document.getElementById('board_open').innerHTML = '';
    } else {
      document.getElementById('board_done').innerHTML = '';
      document.getElementById('board_feedback').innerHTML = '';
      document.getElementById('board_open').innerHTML = '';
      document.getElementById('board_progress').innerHTML = '';
    }

    if (search === '') {
      updateHTML();
    }

  });

}

/**
 * Changes the source of the image element with the class 'board_plus' at the specified index to a blue plus image.
 * @param {number} id - The index of the image element to modify.
 */
function hoverPlus(id) {
  let plus = document.getElementsByClassName('board_plus');
  plus[id].setAttribute('src', '../assets/img/board-plus_blue.svg');
}

/**
 * Changes the source attribute of the plus image element to '../assets/img/board-plus.svg'.
 * @param {number} id - The index of the plus image element in the document.getElementsByClassName('board_plus') collection.
 */
function hoverPlusOut(id) {
  let plus = document.getElementsByClassName('board_plus');
  plus[id].setAttribute('src', '../assets/img/board-plus.svg');
}

/**
 * Creates a new task based on the provided status input.
 * @param {string} statusInput - The status of the task ('open', 'progress', 'feedback', or any other value).
 */
function createTask(statusInput) {
  if (statusInput === 'open') {
    status = 'open';
    title = 'Test';
    priority = 2;
    addTask();
    updateHTML();
  }
  else if (statusInput === 'progress') {
    status = 'progress';
    title = 'Test';
    priority = 2;
    addTask();
    updateHTML();
  }
  else if (statusInput === 'feedback') {
    status = 'feedback';
    addTask();
    updateHTML();
    title = 'Test';
    priority = 2;
  }
  else {
    status = 'open';
    title = 'Test';
    priority = 2;
    addTask();
    updateHTML();
  }
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

/**
 * Edits a task with the given ID.
 * @param {number} id - The ID of the task to be edited.
 */
function editTask(id) {
  selectedContacts = todos[id].contacts;
  document.getElementById('board_openCard').classList.remove('d-none');
  document.getElementById('board_openCard').innerHTML = generateEditTaskHTML(todos[id]);
  document.getElementById('taskcardedit').classList.add('board_taskcardedit');
  fillSubtasks();
}

/**
 * Fills the subtask array with subtasks from the todos array.
 */
function fillSubtasks() {
  subtask = [];
  todos.forEach((element) => {
    subtask = element.subtasks;
  });
}

/**
 * Adds a subtask to the task list.
 */
function addSubtask() {
  var text = 'label-' + (subtask.length);
  var text2 = 'div-' + (subtask.length);
  var input = document.getElementById("addtask-input-subtasks");
  document.getElementById("containerForSubtask").classList.remove('d-none');
  var container = document.getElementById("containerForSubtask"); // Container für Subtasks

  var subtaskText = input.value;
  subtask.push(subtaskText); // Fügt den Subtask dem Array hinzu

  // Erstellen des HTML-Inhalts für den Subtask
  var subtaskHTML = `<label id="${text}" class="containerSubtask" for="addsubtaskliste"><div id="${text2}" >${subtaskText}</div><div class="subtaskIcons">
  <img onclick="editSubtask('${subtaskText}','${text2}')"  src="../assets/img/edit.svg"><img onclick="deleteSubtask('${subtaskText}','${text}')" src="../assets/img/delete.svg"></div></label>`;

  // Fügt den HTML-Inhalt zum Container hinzu
  container.innerHTML += subtaskHTML;

  input.value = ""; // Optional: Clear the input field after adding the subtask
}


/**
* Deletes a task from the todos array based on the given title.
* @param {string} id - The title of the task to be deleted.
* @returns {Promise<void>} - A promise that resolves when the task is deleted.
*/
function deleteTask(id) {

  updatedArray = todos.filter(item => item.id !== id);
  todos = [];
  setItem(keydome, updatedArray).then(() => { ; init(); });
}


/**
 * Deletes a subtask from the subtask array and removes the corresponding element from the DOM.
 * @param {string} titel - The title of the subtask to be deleted.
 * @param {string} id - The id of the subtask element in the DOM.
 */
function deleteSubtask(titel, id) {
  var subtaskToDelete = subtask.filter((item => item !== titel));
  subtask.splice(subtaskToDelete, 1);

  var subtaskElement = document.getElementById(id);

  subtaskElement.remove();
}

/**
 * Edits a subtask element by replacing its content with an input field.
 * @param {string} titel - The title of the subtask.
 * @param {string} id - The ID of the subtask element.
 */
function editSubtask(titel, id) {
  var subtaskElement = document.getElementById(id);
  subtaskElement.innerHTML = 
  `
  <input class="inputfieldEditSubtask" type="text" value="${titel}" onblur="updateSubtask(this.value, '${id}')">
  `;
}

/**
 * Updates the content of a subtask element and updates the corresponding subtask in the subtask array.
 * @param {string} updatedSubtask - The updated content for the subtask element.
 * @param {string} id - The id of the subtask element to be updated.
 */
function updateSubtask(updatedSubtask, id) {
  var subtaskElement = document.getElementById(id);
  subtaskElement.innerHTML = `${updatedSubtask} 
 `;
  subtask[id.split('-')[1]] = updatedSubtask;
}
