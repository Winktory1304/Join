
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

    statusprogress.forEach((element) => {
      document.getElementById('board_progress').innerHTML = '';
      document.getElementById('board_done').innerHTML = '';
      document.getElementById('board_feedback').innerHTML = '';
      document.getElementById('board_done').innerHTML = '';
      document.getElementById('board_progress').innerHTML += generateTodoHTML(element);
    }
    );

    statusopen.forEach((element) => {
      document.getElementById('board_open').innerHTML = '';
      document.getElementById('board_done').innerHTML = '';
      document.getElementById('board_feedback').innerHTML = '';
      document.getElementById('board_progress').innerHTML = '';
      document.getElementById('board_open').innerHTML += generateTodoHTML(element);
    }
    );

    statusfeedback.forEach((element) => {
      document.getElementById('board_feedback').innerHTML = '';
      document.getElementById('board_done').innerHTML = '';
      document.getElementById('board_open').innerHTML = '';
      document.getElementById('board_progress').innerHTML = '';
      document.getElementById('board_feedback').innerHTML += generateTodoHTML(element);
    }
    );

    statusdone.forEach((element) => {
      document.getElementById('board_done').innerHTML = '';
      document.getElementById('board_feedback').innerHTML = '';
      document.getElementById('board_open').innerHTML = '';
      document.getElementById('board_progress').innerHTML = '';
      document.getElementById('board_done').innerHTML += generateTodoHTML(element);
    }
    );

    if (search === '') {
      updateHTML();
    }

  });

}

function hoverPlus(id) {

  let plus = document.getElementsByClassName('board_plus');
  plus[id].setAttribute('src', '../assets/img/board-plus_blue.svg');
}

function hoverPlusOut(id) {
  let plus = document.getElementsByClassName('board_plus');
  plus[id].setAttribute('src', '../assets/img/board-plus.svg');
}


function createTask(statusInput) {




  if (statusInput === 'open') {
    status = 'open';
    addTask();
    updateHTML();
    status = 'open';
  }
  else if (statusInput === 'progress') {
    status = 'progress';
    addTask();
    updateHTML();
    status = 'open';
  }
  else if (statusInput === 'feedback') {
    status = 'feedback';
    addTask();
    updateHTML();
    status = 'open';
  }
  else {
    status = 'open';
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
  document.getElementById('board_openCard').classList.remove('d-none');
  document.getElementById('board_openCard').innerHTML = `
    <div class="board_taskcard" id ="taskcardedit">
        <div class="board_taskedit">
        <h1>Edit Task</h1>
        <p class="board_cardexit" onclick="closeDialog()">X</p>
        </div>
        <p>Task Title</p>
        <input type="text" id="addtask-input-title" value="${todos[id].title}" required>
        <p>Task Description</p>
        <input type="text" id="addtask-input-description" value="${todos[id].task}" required>
        <p>Task Date</p>
        <input type="date" id="addtask-input-date" value="${todos[id].date}" required>
        <p>Task Category</p>
        <select class="addtask-input-category" id="addtask-input-category" required>
            <option default value="${todos[id].tag}" disabled>${todos[id].tag}</option>
            <option value="User Story">User Story</option>
            <option value="Technical Task">Technical Task</option>
        </select>
        <p>Task Category</p>
            <div class="addtask-prio-buttons">
                <button onclick="selectPrio('urgent')" class="addtask-button urgent" id="addtaskButtonUrgent">Urgent
                  <image src="../assets/img/addtaskurgent.svg"></image>
                </button>
                <button onclick="selectPrio('medium')" class="addtask-button medium selected" id="addtaskButtonMedium">Medium
                  <image src="../assets/img/addtaskmedium.svg"></image>
                </button>
                <button onclick="selectPrio('low')" class="addtask-button low " id="addtaskButtonLow">Low <image src="../assets/img/addtasklow.svg"></image> </button>
            </div>
        <p>Subtasks</p>
        <div style="position: relative;" id="subtaskListContainer">             
            <input class="addtask-input-subtasks" id="addtask-input-subtasks" placeholder="Add new subtask">
            <img src="../assets/img/addtaskplus.svg" alt="Add Icon" onclick="addSubtask()" style="position: absolute; top: 50%; right: 5px; transform: translateY(-50%);">
        </div>
        <p>Assigned Contacts</p>
        <input type="text" placeholder="Contacts" class="addtask-input-assigned" id="changeAssigned" onfocus="getReady()">
        <div class="inputfield d-none"  id="addtask-input-assigned"  onchange="validateInput()"  aria-multiselectable="true"></div>
        <button class="addtask-button-create-task" id="addtask-button-create-task" onclick="updateJSON(${todos[id].id}), readServer(), closeDialog()">Update Task</button>
    </div>
    `;

  document.getElementById('taskcardedit').classList.add('board_taskcardedit');
}

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
  var input = document.getElementById("addtask-input-subtasks");
  var container = document.getElementById("subtaskListContainer");

  var subtaskText = input.value;
  subtask.push(subtaskText); // Fügt den Subtask dem Array hinzu

  var subtaskElement = document.createElement("li");
  subtaskElement.innerHTML = `<label for="addsubtaskliste" >${subtaskText}</label>
<br>`; // Reordered HTML elements

  subtaskElement.style.paddingLeft = "16px";
  subtaskElement.style.fontSize = "20px";

  container.parentNode.appendChild(subtaskElement);

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