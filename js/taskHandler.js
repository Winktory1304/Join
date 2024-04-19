
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
 * Adds a task to the todo list.
 */
function addTask() {
  addTaskPopup()
  setTimeout(() => {
    pushJSON();
    try {
      setItem(key, todos);
  
      clearInputs()
      window.location.href = "/html/board.html";
    } catch (error) {
      console.error('Error adding task', error);
    }
  }, 1000);

}

/**
 * Adds a task to the todo list.
 */
function addTaskonBoard() {
  addTaskPopup()
  setTimeout(() => {
    pushJSON();
    try {
      setItem(key, todos);
  
      closeTaskDialog();
      clearInputs();
      updateHTML();
    } catch (error) {
      console.error('Error adding task', error);
    }
  }, 1000);

}


/**
 * Edits a task with the given ID.
 * @param {number} id - The ID of the task to be edited.
 */
function editTask(id) {
  document.getElementById('board_openCard').classList.remove('d-none');
  document.getElementById('board_openCard').innerHTML = `
    <div class="board_taskcard" id ="taskcardedit">
      <div id="board_editframe" class="board_editframe max-width-525">
        <div class="board_taskedit">
        <h1>Edit Task</h1>
        <p class="board_cardexit" onclick="closeDialog()">X</p>
        </div>
        <div class="gap-20">
        <p>Task Title</p>
        <input class="max-width-500" type="text" id="addtask-input-title" value="${todos[id].title}" required>
        </div>
        <div class="gap-20">
        <p>Task Description</p>
        <input class="max-width-500"  type="text" id="addtask-input-description" value="${todos[id].task}" required>
        </div>
        <div class="gap-20">
        <p>Task Date</p>
        <input class="max-width-500"  type="date" id="addtask-input-date" value="${todos[id].date}" required>
        </div>
        <div class="gap-20">
        <p>Task Category</p>
        <select class="addtask-input-category max-width-500" id="addtask-input-category" required>
            <option default value="${todos[id].tag}" disabled>${todos[id].tag}</option>
            <option value="User Story">User Story</option>
            <option value="Technical Task">Technical Task</option>
        </select>
        </div>
        <div class="gap-20">
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
            </div>
            <div class="gap-20">
        <div class="addtask-h2" id="subtaskListContainer">Subtasks</div>
            <div style="position: relative;">

                <input class="addtask-input-subtasks max-width-500" id="addtask-input-subtasks" placeholder="Add new subtask">
                <img src="../assets/img/addtaskplus.svg" alt="Add Icon" onclick="addSubtasktoTodo(${todos[id].id})"
                    style="position: absolute; top: 50%; right: 5px; transform: translateY(-50%);">
            </div>
            <div class="containerForSubtask d-none" id="containerForSubtask"></div>
        
            <div class="addtask-gap16">
            <div class="gap-20">
            <div class="addtask-h2">Assigned to</div>
            <div style="position: relative;">
                <input class="addtask-input-subtasks max-width-500" placeholder="Contacts" id="changeAssigned">
                <img src="../assets/img/addtaskplus.svg" alt="Add Icon" onclick="getReadyBoard(${id}),getarray(${id})"
                    style="position: absolute; top: 50%; right: 5px; transform: translateY(-50%);">
            </div>
            <div class="inputfield d-none max-width-500" id="addtask-input-assigned" onchange="validateInput()"></div>
        </div>
        <div class="addtask-gap16 max-width-500" id="test">
        </div>
        </div><button class="addtask-button-create-task" id="addtask-button-create-task" onclick="updateJSON(${todos[id].id}), clearInputs(), closeDialog()">OK</button>
      </div>
      </div>
    `;
  document.getElementById('taskcardedit').classList.add('board_taskcardedit');
  fillSubtasks(id);
  fillContacts(id);
}


/**
 * Fills the subtask array with subtasks from the todos array.
 */
function fillSubtasks(id) {
    if (todos[id].subtasks.length !== 0) {
      document.getElementById('containerForSubtask').classList.remove('d-none');
      fillSubtaskHTML(id);
    }

  
  
}

function fillSubtaskHTML(id) {
  var container = document.getElementById("containerForSubtask");
  container.innerHTML = '';
  todos[id].subtasks.forEach((element) => {
    var text = 'label-' + (subtask.length);
    var text2 = 'div-' + (subtask.length);
    var subtaskHTML = `<label id="${text}" class="containerSubtask" for="addsubtaskliste"><div id="${text2}" >${element.description}</div><div class="subtaskIcons">
    <img onclick="editSubtaskonTodo('${element.description}','${text2}','${id}')"  src="../assets/img/edit.svg"><img onclick="deleteSubtaskfromTodo('${element.description}','${text}',${id})" src="../assets/img/delete.svg"></div></label>`;
    container.innerHTML += subtaskHTML;
  });
}


function fillContacts(id) {
  document.getElementById("test").innerHTML = "";
  todos[id].contacts.forEach((element) => {
    let contact = element.name.split(" ");
    let initials = contact.map((name) => name.charAt(0)).join("");
    let id = "contactcircle-" + element.id;
    let color = element.color;

    document.getElementById("test").innerHTML += `
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle id="${id}" cx="21" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16px" fill="white">${initials}</text>
    </svg>`;



});
}
function setContactstoTodo(todoID) {
  switchCase("assigned").innerHTML = "";
  contacts.forEach((element) => {
    let id = "contactcircle-" + element.firstName + element.lastName;
    let initials = element.firstName.charAt(0) + element.lastName.charAt(0);
    let color = element.color;

    switchCase("assigned").innerHTML += `<div class="inputnew width540"> 
    <div class="board_cardcontactsring">
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle id=${id} cx="21" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16px" fill="white">${initials}</text>
    </svg>
        </div>${element.firstName} ${element.lastName} 
    <input onchange="writeContactsintoTodo('${todoID}')" class="checkBox" type="checkbox" id="id-${element.id}" value="${element.firstName} ${element.lastName}">
    </div>`;
  });
}


function writeContactsintoTodo(todoID) {
  let checkboxes = document.getElementsByClassName("checkBox");
  todos[todoID].contacts = [];

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      let contact = checkboxes[i].value.trim().split(" ");
      let firstName = contact[0];
      let lastName = contact[1];
      let initials = firstName.charAt(0) + lastName.charAt(0);
      let color = checkboxes[i].parentNode.querySelector("circle").getAttribute("fill");
      todos[todoID].contacts.push(new Contact(todos[todoID].contacts.length, firstName + " " + lastName, color, initials));
    }
  }

  document.getElementById("test").innerHTML = "";
  todos[todoID].contacts.forEach((element) => {
    let contact = element.name.split(" ");
    let initials = contact.map((name) => name.charAt(0)).join("");
    let id = "contactcircle-" + element.id;
    let color = element.color;

    document.getElementById("test").innerHTML += `
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle id="${id}" cx="21" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16px" fill="white">${initials}</text>
    </svg>`;


    if (todos.length === 0) return;
  });
}





/**
 * Adds a subtask to the task list.
 */
function addSubtask() {
  if (document.getElementById("addtask-input-subtasks").value === "") {
    return;
  }
  var text = 'label-' + (subtask.length);
  var text2 = 'div-' + (subtask.length);
  let id = todos.length;
  var input = document.getElementById("addtask-input-subtasks");
  document.getElementById("containerForSubtask").classList.remove('d-none');
  var container = document.getElementById("containerForSubtask");
  var subtaskText = input.value;
  subtask.push(new Subtask(subtask.length, subtaskText));
  var subtaskHTML = `<label id="${text}" class="containerSubtask" for="addsubtaskliste"><div id="${text2}" >${subtaskText}</div><div class="subtaskIcons">
  <img onclick="editSubtask('${subtaskText}','${text2}')"  src="../assets/img/edit.svg"><img onclick="deleteSubtaskfromTodo('${subtaskText}','${text}','${id}')" src="../assets/img/delete.svg"></div></label>`;
  container.innerHTML += subtaskHTML;
  input.value = "";
}



function addSubtasktoTodo(id) {
  var text = 'label-' + (todos[id].subtasks.length);
  var text2 = 'div-' + (todos[id].subtasks.length);
  var input = document.getElementById("addtask-input-subtasks");
  document.getElementById("containerForSubtask").classList.remove('d-none');
  var container = document.getElementById("containerForSubtask");
  var subtaskText = input.value;
  todos[id].subtasks.push(new Subtask(subtask.length, subtaskText));
  var subtaskHTML = `<label id="${text}" class="containerSubtask" for="addsubtaskliste"><div id="${text2}" >${subtaskText}</div><div class="subtaskIcons">
  <img onclick="editSubtaskonTodo('${subtaskText}','${text2}','${id}')"  src="../assets/img/edit.svg"><img onclick="deleteSubtaskfromTodo('${subtaskText}','${text}','${id}')" src="../assets/img/delete.svg"></div></label>`;
  container.innerHTML += subtaskHTML;
  input.value = "";
}


/**
* Deletes a task from the todos array based on the given title.
* @param {string} id - The title of the task to be deleted.
* @returns {Promise<void>} - A promise that resolves when the task is deleted.
*/
async function deleteTask(id) {

  todos = todos.filter(item => item.id !== id);
  await setItem('todos', todos).then(() => { closeDialog(); updateHTML(); });
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

function deleteSubtaskfromTodo(titel, id, todoID) {
  //Diese funktion wird so noch nicht funktionieren, 

  var subtaskToDelete = todos[todoID].subtasks.filter((item => item.description == titel));
  todos[todoID].subtasks.splice(subtaskToDelete, 1);

  var subtaskElement = document.getElementById(id);

  subtaskElement.remove();
  setItem(key, todos).then(() => { ; init(); });
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


/**
 * Updates the content of a subtask element and updates the corresponding subtask in the subtask array.
 * @param {string} updatedSubtask - The updated content for the subtask element.
 * @param {string} id - The id of the subtask element to be updated.
 */
/**
 * Updates the content of a subtask element and updates the corresponding subtask in the todos array.
 * @param {string} updatedSubtask - The updated content for the subtask element.
 * @param {string} id - The id of the subtask element to be updated.
 * @param {string} todoID - The id of the todo to which the subtask belongs.
 */
function updateSubtaskonTodo(updatedSubtask, id, todoID) {
  var subtaskElement = document.getElementById(id);
  subtaskElement.innerHTML = `${updatedSubtask} 
 `;
  todos[todoID].subtasks[id.split('-')[1]].description = updatedSubtask;
}

/**
 * Edits a subtask element by replacing its content with an input field.
 * @param {string} titel - The title of the subtask.
 * @param {string} id - The ID of the subtask element.
 */
function editSubtaskonTodo(titel, id, todoID) {
  var subtaskElement = document.getElementById(id);
  subtaskElement.innerHTML =
    `
  <input class="inputfieldEditSubtask" type="text" value="${titel}" onblur="updateSubtaskonTodo(this.value, '${id}', ${todoID})">
  `;
}