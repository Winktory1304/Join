let server = new ServerFunctions();

/**
 * The array that stores the todo tasks.
 * @type {Array}
 */
let updatedArray = [];

/**
 * Deletes all todos from the server.todos array, writes to the server, and updates the HTML.
 */
function deleteALL() {
    server.todos = [];
    setItem('todos', server.todos);
    updateHTML();
}


/**
 * Initializes the board by reading the server.todos from the server.
 */
function initBoard() {
        server.updateBoard();
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
    server.todos[currentDraggedElement]['status'] = category;
    updateHTML();
    server.writeServerData();
}

/**
 * Highlights the element with the specified id by adding the 'drag-area-highlight' class.
 * @param {string} id - The id of the element to highlight.
 */
function highlight(id) {
    const element = document.getElementById(id);
    if (!element.classList.contains('drag-area-highlight')) {
        element.classList.add('drag-area-highlight');
    }
}

/**
 * Removes the 'drag-area-highlight' class from the element with the specified id.
 * @param {string} id - The id of the element to remove the highlight from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}



/**
 * Generates a progress bar and displays the number of completed subtasks out of the total number of subtasks.
 * @param {Object} element - The element containing subtasks.
 * @returns {string} - The HTML representation of the progress bar and subtask count.
 */
function subTasks(element) {

    let length = element.subtasks.length;

    if (length > 0)
        return `<progress style="width: 120px;" max="${length}" min="0" value="${subTaskscomplete(element.id)}"></progress> ${subTaskscomplete(element.id)}/${length} Subtasks`;
    else
        return 'Keine Subtasks';
}

/**
 * Calculates the number of completed subtasks for a given task ID.
 * @param {number} id - The ID of the task.
 * @returns {number} The count of completed subtasks.
 */
function subTaskscomplete(id) {

    let subtasksdone = server.todos[id].subtasksdone;

    let count = 0;
    for (let i = 0; i < subtasksdone.length; i++) {
        if (subtasksdone[i] === 1) {
            count++;
        }
    }
    return count;
}

/**
 * Limits the task text to a maximum of 50 characters.
 * If the task text exceeds 50 characters, it will be truncated and '...' will be appended.
 * @param {Object} element - The element containing the task text.
 * @returns {string} - The limited task text.
 */
function limitTaskText(element) {
    if (element.task.length > 50) {
        return element.task.substring(0, 50) + '...';
    } else {
        return element.task;
    }
}

/**
 * Opens a card and displays its details on the board.
 * @param {number} id - The ID of the card to be opened.
 */
function openCard(id) {
    document.getElementById('board_openCard').innerHTML = `
                    <div class="board_taskcard">
                        <div class="board_cardnav">
                            <div class="board_opencardtag" ${setTag(server.todos[id])}>
                                <p>${server.todos[id].tag}</p>
                            </div>
                            <div class="board_cardclosed"><p class="board_cardexit" onclick="closeDialog()">X</p>
                            </div>
                        </div>
                        <div class="board_cardheadline">${server.todos[id].title}</div>
                        <div class="board_cardtask board_text">${server.todos[id].task}</div>
                        <div class="board_carddate board_text">Due date: ${server.todos[id].date}</div>
                        <div class="board_cardprio board_text">Priority: ${setPriority(server.todos[id])} ${prioritySelector(server.todos[id])}</div>
                        <div class="board_assigned board_text" id="board_cardcontactsdome">
                            <h4>Assigned to:</h4>
                            <!-- Hier kommen die Sachen aus der Funktion contactsdomeLoad die noch erstellt werden muss -->
                            
                        </div>
                        <div class="board_subtasks board_text" id="board_cardsubtasks">
                            <h4>Subtasks</h4></div>
                            <div class="board_deledit" onclick="editTask('${server.todos[id].id}')">Edit</div>
                        <div class="board_deledit" onclick="deleteTask('${server.todos[id].title}'), closeDialog()">Delete</div>
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
    server.todos[id].contacts.forEach(contact => {
        document.getElementById('board_cardcontactsdome').innerHTML += `<li class="board_assigneditem">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="21" r="20" fill=${randomColor()} stroke="white" stroke-width="2"/>
                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="16px" fill="white">${getInitials(contact)}</text>
            </svg>
            ${contact}
        </li>`;
    });

}

/**
 * Retrieves and displays the subtasks for a given task ID.
 * @param {string} id - The ID of the task.
 */
function getSubtasks(id) {
    let subtasks = document.getElementById('addtask-input-subtasks')
    subtasks.innerHTML = '';

    server.todos[id].subtasks.forEach(subtask => {

        subtasks.innerHTML += returnSubtasks(subtask);
        console.log(returnSubtasks(subtask));
    });
}

/**
 * Returns an HTML option element for a subtask.
 *
 * @param {string} subtask - The subtask value.
 * @returns {string} The HTML option element.
 */
function returnSubtasks(subtask) {
    return `<option id="${subtask} + 1" value="${subtask}">${subtask}</option>`
}

/**
 * Updates the JSON object with the provided id.
 * @param {string} id - The id of the object to update.
 */
function updateJSON(id) {
    let titleValue = document.getElementById('addtask-input-title').value;
    let descriptionValue = document.getElementById('addtask-input-title').value;
    let selectedContacts = document.getElementById('addtask-input-assigned').value;
    let dateValue = document.getElementById('addtask-input-date').value;
    let selectedCategory = document.getElementById('addtask-input-category').value;

    server.todos.map(object => {
        if (object.id === id) {
            object.title = titleValue;
            object.task = descriptionValue;
            object.date = dateValue;
            object.tag = selectedCategory;
            object.contacts = [];
            object.contacts.push(selectedContacts);


            setItem(keydome, server.todos);
        }
    })
}

/**
 * Retrieves an array of contacts and sets them using the setContacts function.
 */
function getarray() {
    setContacts(server.contacts);
}

/**
 * Returns the initials of a given name.
 * @param {string} name - The name to extract initials from.
 * @returns {string} The initials of the name.
 */
function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('');
}

/**
 * Generates a random color from a predefined list of colors.
 * @returns {string} A randomly selected color in the format "rgb(r, g, b)".
 */
function randomColor() {
    const colors = ["rgb(147,39,255)", "rgb(110,82,255)", "rgb(252,113,255)", "rgb(255,195,69)", "rgb(31,215,193)", "rgb(31,215,193)", "rgb(31,215,193)", "rgb(255,70,70)", "rgb(255,122,0)", "rgb(255,122,0)"];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Generates subtasks for a given task ID.
 * @param {number} id - The ID of the task.
 */
function generateSubtasks(id) {
    server.todos[id].subtasks.forEach((subtask, index) => {
        const checkbox = document.createElement('input');
        checkbox.className = 'checkbox';
        checkbox.type = 'checkbox';
        checkbox.id = `subtask${index}`;
        checkbox.name = `subtask${index}`;
        checkbox.checked = server.todos[id].subtasksdone[index] === 1;

        checkbox.addEventListener('change', function () {
            server.todos[id].subtasksdone[index] = this.checked ? 1 : 0;
        });

        const li = document.createElement('li');
        li.className = 'board_subitem';
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(subtask));

        document.getElementById('board_cardsubtasks').appendChild(li);
    });

}