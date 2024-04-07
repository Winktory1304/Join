
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

function fillSubtasks() {
  subtask = [];
  todos.forEach((element) => {
    subtask = element.subtasks;
  });
}


/**
 * Adds a subtask to the task list.
 */
// function addSubtask() {
//   var input = document.getElementById("addtask-input-subtasks");
//   var container = document.getElementById("subtaskListContainer");
  
//   var subtaskText = input.value;
//   subtask.push(subtaskText); // Fügt den Subtask dem Array hinzu

//   var subtaskElement = document.createElement("li");
//   var text = 'li-'+(subtask.length-1);

//   subtaskElement.innerHTML = `<label class="containerSubtask" id="${subtask.length-1}" for="addsubtaskliste" >${subtaskText}  <svg onclick="editSubtask('${subtaskText}','${text}')" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
//   </svg><svg onclick="deleteSubtask('${subtaskText}','${text}')" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
//   </svg></label>
// <br>`; // Reordered HTML elements
// console.log(subtaskText)
//   subtaskElement.style.paddingLeft = "16px";
//   subtaskElement.style.fontSize = "20px";
 
//   subtaskElement.id = text;
//   container.parentNode.appendChild(subtaskElement);

//   input.value = ""; // Optional: Clear the input field after adding the subtask
// }

function addSubtask() {
  var text = 'label-'+(subtask.length);
  var text2 = 'div-'+(subtask.length);
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


function deleteSubtask(titel,id) {
  var subtaskToDelete = subtask.filter((item => item !== titel));
  console.log(subtaskToDelete);
  subtask.splice(subtaskToDelete,1);
  console.log(subtask.length-1);

  var subtaskElement = document.getElementById(id);

subtaskElement.remove();

}

function editSubtask(titel, id) {
  var subtaskElement = document.getElementById(id);
  subtaskElement.innerHTML = 
  `
  <input class="inputfieldEditSubtask" type="text" value="${titel}" onblur="updateSubtask(this.value, '${id}')">
  `;
}

function updateSubtask(updatedSubtask, id) {
  var subtaskElement = document.getElementById(id);
  subtaskElement.innerHTML = `${updatedSubtask} 
 `;
  subtask[id.split('-')[1]] = updatedSubtask;
}

// var subtaskHTML = `<label id="${text}" class="containerSubtask" for="addsubtaskliste"><div  >${subtaskText}</div><div class="subtaskIcons">
// <img onclick="editSubtask('${subtaskText}','${text}')"  src="../assets/img/edit.svg"><img onclick="deleteSubtask('${subtaskText}','${text}')" src="../assets/img/delete.svg"></div></label>`;
