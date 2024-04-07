
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
    addTask();
    updateHTML();
    status = 'open';
    priority = 2;
  }
  else if (statusInput === 'progress') {
    status = 'progress';
    addTask();
    updateHTML();
    status = 'open';
    priority = 2;
  }
  else if (statusInput === 'feedback') {
    status = 'feedback';
    addTask();
    updateHTML();
    status = 'open';
    priority = 2;
  }
  else {
    status = 'open';
    addTask();
    updateHTML();
    priority = 2;
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
  document.getElementById('board_openCard').innerHTML = `
    <div class="board_taskcard" id ="taskcardedit">
      <div id="board_editframe" class="board_editframe max-width-525">
        <div class="board_taskedit">
        <h1>Edit Task</h1>
        <p class="board_cardexit" onclick="closeDialog()">X</p>
        </div>
        <p>Task Title</p>
        <input class="max-width-500" type="text" id="addtask-input-title" value="${todos[id].title}" required>
        <p>Task Description</p>
        <input class="max-width-500"  type="text" id="addtask-input-description" value="${todos[id].task}" required>
        <p>Task Date</p>
        <input class="max-width-500"  type="date" id="addtask-input-date" value="${todos[id].date}" required>
        <p>Task Category</p>
        <select class="addtask-input-category max-width-500" id="addtask-input-category" required>
            <option default value="${todos[id].tag}" disabled>${todos[id].tag}</option>
            <option value="User Story">User Story</option>
            <option value="Technical Task">Technical Task</option>
        </select>
        <p>Task Category</p>
            <div class="addtask-prio-buttons max-width-500">
                <button onclick="selectPrio('urgent')" class="addtask-button urgent" id="addtaskButtonUrgent">Urgent
                  <img src="../assets/img/addtaskurgent.svg">
                </button>
                <button onclick="selectPrio('medium')" class="addtask-button medium selected" id="addtaskButtonMedium">Medium
                  <img src="../assets/img/addtaskmedium.svg">
                </button>
                <button onclick="selectPrio('low')" class="addtask-button low " id="addtaskButtonLow">Low <img src="../assets/img/addtasklow.svg"> </button>
            </div>
        <div class="addtask-h2" id="subtaskListContainer">Subtasks</div>
            <div style="position: relative;">

                <input class="addtask-input-subtasks" id="addtask-input-subtasks" placeholder="Add new subtask">
                <img src="../assets/img/addtaskplus.svg" alt="Add Icon" onclick="addSubtask()"
                    style="position: absolute; top: 50%; right: 5px; transform: translateY(-50%);">
            </div>
            <div class="containerForSubtask d-none" id="containerForSubtask"></div>
        
        <p>Assigned Contacts</p>
        <input type="text" placeholder="Contacts" class="addtask-input-assigned max-width-500" id="changeAssigned"
                onfocus="getReady(), getarray()">
                
        <div class="addtask-gap16" id="test">
        </div>
        <div class="inputfield d-none"  id="addtask-input-assigned"  onchange="validateInput()"  aria-multiselectable="true"></div>
        <button class="addtask-button-create-task" id="addtask-button-create-task" onclick="updateJSON(${todos[id].id}), readServer(), clearInputs() , closeDialog()">Update Task</button>
      </div>
      </div>
    `;
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
* @param {string} title - The title of the task to be deleted.
* @returns {Promise<void>} - A promise that resolves when the task is deleted.
*/
function deleteTask(title) {

  updatedArray = todos.filter(item => item.title !== title);
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
  console.log(subtaskToDelete);
  subtask.splice(subtaskToDelete, 1);
  console.log(subtask.length - 1);

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