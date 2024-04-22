let task = new Task();

// Funktionen -------------------------
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

async function writeTasktoServer() {
    // Hier wird die Funktion zum Schreiben in die Datenbank aufgerufen
    createnewTask()
    addTaskPopup()
    setTimeout(() => {
        try {
            setItem('todos', todos).then(() => {
                readServer(); clearInputs();
            });
        } catch (error) {
            console.error('Error adding task', error);
        }
    }, 1000);
}

function goTo() {
    writeTasktoServer();
    setTimeout(() => {
        window.location.href = "/html/board.html";
    }, 1000);
    document.getElementById("addtask-button-create-task").disabled = true;

}

async function readfromServer() {
    todos = [];
    // Hier wird die Funktion zum Lesen aus der Datenbank aufgerufen
    readJSON("todos", todos);
    updateHTML();
}

// -----------------------------

function deleteContactsfromTasks(contactID) {
    contactID = contacts[contactID].idContact;
    todos.forEach((task) => {
        task.contacts = task.contacts.filter((contact) => contact.id !== contactID);

    }
    );
    setItem('todos', todos);
}
