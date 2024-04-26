/**
 * The array that stores the todo tasks.
 * @type {Array}
 */
let updatedArray = [];
let usersdome = [];


/**
 * The keydome used for storing the todos in the server.
 * @type {string}
 */
let keydome = "todos";


/**
 * Deletes all todos from the todos array, writes to the server, and updates the HTML.
 */
function deleteALL() {
  todos = [];
  writeServer();
  updateHTML();
}


/**
 * Writes the todos array to the server.
 */
function writeServer() {
  setItem(keydome, todos).then(() => {
    readServer();
  });
}


/**
 * Initializes the board by reading the todos from the server.
 */
function init() {
  isloggedin();
  getName();
  readServer();
}


/**
 * Reads the todos from the server and updates the HTML elements on the board.
 */
function readServer() {
  contacts = [];
  todos = [];
  try {
    readJSON("contacts", contacts);
    readJSON(keydome, todos).then(() => {
      updateHTML();
    });
  } catch (error) {
    console.error("Error:", error);
  }
}


/**
 * The currently dragged element.
 * @type {HTMLElement}
 */
let currentDraggedElement;


/**
 * Generates HTML markup for a board with no tasks.
 * @returns {string} The HTML markup for the board with no tasks.
 */
function noCard() {
  return `<div class="board_notask"class="todo">
    <div class="board_nocardcontent">
        Keine Tasks gefunden!
    </div>
    </div>
    `;
}


/**
 * Changes the behavior and appearance of the add task button.
 */
function changeAddTask() {
  let button = document.getElementById("addtask-button-cancel");
  let create = document.getElementById("addtask-button-create-task");
  create.setAttribute("onclick", "closeTaskDialog()");
  button.value = "Close";
  button.setAttribute("onclick", "closeTaskDialog()");
  button.innerHTML = "X Close";
}


/**
 * Starts dragging the specified element.
 * @param {string} id - The ID of the element to be dragged.
 */
function startDragging(id) {
  currentDraggedElement = id;
}


/**
 * Prevents the default behavior of the dragover event.
 * @param {Event} ev - The dragover event object.
 */
function allowDrop(ev) {
  ev.preventDefault();
}


/**
 * Moves the current dragged element to the specified category.
 * @param {string} category - The category to move the element to.
 */
function moveTo(category) {
  todos[currentDraggedElement]["status"] = category;
  updateHTML();
  writeServer(keydome, todos);
}


/**
 * Highlights the element with the specified id by adding the 'drag-area-highlight' class.
 * @param {string} id - The id of the element to highlight.
 */
function highlight(id) {
  const element = document.getElementById(id);
  if (!element.classList.contains("drag-area-highlight")) {
    element.classList.add("drag-area-highlight");
  }
}


/**
 * Removes the 'drag-area-highlight' class from the element with the specified id.
 * @param {string} id - The id of the element to remove the highlight from.
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}


/**
 * Generates a progress bar and displays the number of completed subtasks out of the total number of subtasks.
 * @param {Object} element - The element containing subtasks.
 * @returns {string} - The HTML representation of the progress bar and subtask count.
 */
function subTasks(element) {
  let length = element.subtasks.length;
  if (length > 0)
    return `<progress style="width: 80px;" max="${length}" min="0" value="${subTaskscomplete(
      element.id
    )}"></progress> ${subTaskscomplete(element.id)}/${length} Subtasks`;
  else return "";
}


/**
 * Calculates the number of completed subtasks for a given task ID.
 * @param {number} id - The ID of the task.
 * @returns {number} The count of completed subtasks.
 */
function subTaskscomplete(todoID) {
  let count = 0;
  todos[todoID].subtasks.forEach((subtask) => {
    if (subtask.done === true) {
      count++;
    }
  });
  return count;
}


/**
 * Limits the task text to a maximum of 50 characters.
 * If the task text exceeds 50 characters, it will be truncated and '...' will be appended.
 * @param {Object} element - The element containing the task text.
 * @returns {string} - The limited task text.
 */
function limitTaskText(element) {
  if (element.task.length > 20) {
    let tasktext = element.task.substring(0, 20) + "...";
    return tasktext;
  } else {
    return element.task;
  }
}


/**
 * Converts a given date to a localized string representation.
 *
 * @param {Date} date - The date to be converted.
 * @returns {string} The localized string representation of the date.
 */
function getDate(date) {
  let d = new Date(date);
  return d.toLocaleDateString();
}


/**
 * Opens a card and displays its details on the board.
 * @param {number} id - The ID of the card to be opened.
 */
function openCard(id) {
  document.getElementById("board_openCard").innerHTML = /*html*/`
                    <div class="board_taskcard" id="boardTaskCard" >
                        <div class="board_innertaskcard" id="boardInnerTask" >
                        <div class="board_cardnav">
                            <div class="board_opencardtag" ${setTag(todos[id])}>
                                <p>${todos[id].tag}</p>
                            </div>
                            <div class="board_cardclosed"><p class="board_cardexit" onclick="closeDialog()">X</p>
                            </div>
                        </div>
                        <div class="board_cardheadline">${todos[id].title}</div>
                        <div class="board_cardtask board_text">${
                          todos[id].task
                        }</div>
                        <div class="board_carddate board_text">Due date: ${getDate(
                          todos[id].date
                        )}</div>
                        <div class="board_cardprio board_text">Priority: ${setPriority(
                          todos[id]
                        )} ${prioritySelector(todos[id])}</div>
                        <div class="board_assigned board_text" id="board_cardcontactsdome">
                            <h4>Assigned to:</h4>
                        </div>
                        <div class="board_subtasks board_text" id="board_cardsubtasks">
                            <h4>Subtasks</h4></div>
                            <div class="board_taskactions" id="">
                            <div class="board_deledit" onclick="deleteTask(${
                              todos[id].id
                            })"><svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647"/>
                                </svg>
                                Delete</div>
                                /
                                <div class="board_deledit" onclick="editTask(${
                                  todos[id].id
                                })"><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647"/>
                                    </svg>
                                Edit</div>
                                
                            </div>
                            </div>
                    </div>
                    `;
  generateSubtasks(id);
  generatecontactsdome(id);
}


/**
 * Generates contact cards for a given ID.
 * @param {string} id - The ID of the Task for contact.
 */
function generatecontactsdome(id) {
  if (todos[id].contacts.length === 0) {
    document.getElementById("board_cardcontactsdome").innerHTML +=
      "<br>No Contacts Assigned";
  } else {
    todos[id].contacts.forEach((contact) => {
      document.getElementById(
        "board_cardcontactsdome"
      ).innerHTML += /*html*/`<li class="board_assigneditem">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="21" r="20" fill="${contact.color}" stroke="white" stroke-width="2"/>
                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16px" fill="white">${contact.initials}</text>
            </svg>
            ${contact.name}
        </li>`;
    });
  }
}


/**
 * Retrieves and displays the subtasks for a given task ID.
 * @param {string} id - The ID of the task.
 */
function getSubtasks(id) {
  let subtasks = document.getElementById("addtask-input-subtasks");
  subtasks.innerHTML = "";

  todos[id].subtasks.forEach((subtask) => {
    subtasks.innerHTML += returnSubtasks(subtask);
  });
}


/**
 * Returns an HTML option element for a subtask.
 *
 * @param {string} subtask - The subtask value.
 * @returns {string} The HTML option element.
 */
function returnSubtasks(subtask) {
  return `<option id="${subtask.id} + 1" value="${subtask.description}">${subtask.description}</option>`;
}


/**
 * Updates the JSON object with the provided id.
 * @param {string} id - The id of the object to update.
 */
function updateJSON(id) {
  let titleValue = document.getElementById("addtask-input-title").value;
  let descriptionValue = document.getElementById(
    "addtask-input-description"
  ).value;
  let dateValue = document.getElementById("addtask-input-date").value;
  let selectedCategory = document.getElementById(
    "addtask-input-category"
  ).value;
  var subtasksValue = document.getElementById("addtask-input-subtasks").value;
  todos.forEach((object) => {
    if (object.id === id) {
      object.title = titleValue;
      object.task = descriptionValue;
      object.date = dateValue;
      object.priority = priority;
      object.contacts = object.contacts;
      object.subtasks = object.subtasks;
    }
  });
  writeServer();
}


/**
 * Retrieves an array of contacts and sets them using the setContacts function.
 */
function getarray(id) {
  let checkboxes = document.getElementsByClassName("checkBox");
  for (let i = 0; i < checkboxes.length; i++) {
    if (id === null) {
      selectedContacts.forEach((contact) => {
        if (contact.id.includes(checkboxes[i].id.toString())) {
          checkboxes[i].checked = true;

          document.getElementById(
            "setAssign-" + contact.id
          ).style.backgroundColor = "#828282";
        }
      });
    } else {
      todos[id].contacts.forEach((contact) => {
        if (contact.id.includes(checkboxes[i].id.toString())) {
          checkboxes[i].checked = true;
          document.getElementById(
            "setAssign-" + contact.id
          ).style.backgroundColor = "#828282";
        }
      });
    }
  }
}


/**
 * Returns the initials of a given name.
 * @param {string} name - The name to extract initials from.
 * @returns {string} The initials of the name.
 */
function getInitials(name) {
  if (name === null) {
    return null;
  } else
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
}


/**
 * Generates subtasks for a given task ID.
 * @param {number} id - The ID of the task.
 */
function generateSubtasks(id) {
  if (todos[id].subtasks.length === 0) {
    document.getElementById("board_cardsubtasks").innerHTML +=
      "<br>No Subtasks";
  } else {
    todos[id].subtasks.forEach((subtask, index) => {
      const checkbox = document.createElement("input");
      checkbox.className = "checkBox";
      checkbox.type = "checkbox";
      checkbox.id = `subtask${index}`;
      checkbox.name = `subtask${index}`;
      checkbox.addEventListener("change", function () {
        todos[id].subtasks[index].done = this.checked ? true : false;
      });
      if (subtask.done) {
        checkbox.checked = true;
      }
      const li = document.createElement("li");
      li.className = "board_subitem";
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(subtask.description)); // Access the description property of the subtask object
      document.getElementById("board_cardsubtasks").appendChild(li);
    });
  }
}