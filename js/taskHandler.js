/**
 * Searches for tasks based on user input and updates the board with matching tasks.
 */
function searchTask() {
  document.getElementById('board_findTask_input').onkeydomedown = function () {
    var search = document.getElementById('board_findTask_input').value;
    var searchArray = server.todos.filter(t => t.title.includes(search));
    document.getElementById('board_open').innerHTML = '';
    for (let index = 0; index < searchArray.length; index++) {
      const element = searchArray[index];
      document.getElementById('board_open').innerHTML += generateTodoHTML(element);
    }
  }

}

/**
 * Adds a task to the todo list.
 */
function addTask() {
  addTaskPopup()
  pushJSON();
}

/**
 * Edits a task with the given ID.
 * @param {number} id - The ID of the task to be edited.
 */
function editTask(id) {
  document.getElementById('board_openCard').classList.remove('d-none');
  document.getElementById('board_openCard').innerHTML = `
    <div class="board_taskcard">
        <p class="board_deledit" onclick="closeDialog()">X</p>
        <input type="text" id="addtask-input-title" value="${server.todos[id].title}" required>
        <input type="text" id="addtask-input-description" value="${server.todos[id].task}" required>
        <input type="date" id="addtask-input-date" value="${server.todos[id].date}" required>
        <select class="addtask-input-category" id="addtask-input-category" required>
            <option default value="${server.todos[id].tag}" disabled>${server.todos[id].tag}</option>
            <option value="User Story">User Story</option>
            <option value="Technical Task">Technical Task</option>
        </select>

        <select class="addtask-input-category" id="addtask-input-subtasks"  
                 onmousedown="getSubtasks(${server.todos[id].id})"  aria-multiselectable="true">
                
                <option value="Bug" selected disabled>Subtasks</option>
                </select>
                <div class="addtask-h2" id="subtaskListContainer">Subtasks</div>
                <input class="addtask-input-subtasks" id="addtask-input-subtasks" placeholder="Add new subtask">
                        <img src="../assets/img/addtaskplus.svg" alt="Add Icon" onclick="addSubtask()" style="position: absolute; top: 50%; right: 5px; transform: translateY(-50%);">
                      </div>


        <select class="addtask-input-category"
                        id="addtask-input-assigned"  onchange="validateInput()" onmousedown="getarray()"  aria-multiselectable="true">
                        <option value="${server.todos[id].contacts}" disabled selected>${server.todos[id].contacts}</option>
                        </select>
                        <button class="addtask-button-create-task" id="addtask-button-create-task" onclick="updateJSON(${server.todos[id].id}), closeDialog(), readServer()">Update Task</button>
    </div>
    `;
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
* Deletes a task from the server.todos array based on the given title.
* @param {string} title - The title of the task to be deleted.
* @returns {Promise<void>} - A promise that resolves when the task is deleted.
*/
function deleteTask(title) {

  updatedArray = server.todos.filter(item => item.title !== title);
  server.todos = [];
  setItem(keydome, updatedArray).then(() => { ; initBoard(); });
}