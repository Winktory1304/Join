let server = new ServerFunctions();

let today = new Date();
let hour = today.getHours();


function init() {
    server.updateSummary();
}

function showAllNumbers() {
    showNumberOfToDo();
    showNumberOfDone();
    showNumberOfUrgent();
    showNumberOfTasksInBoard();
    showNumberOfTaskaInProgress();
    showNumberOfAwaitingFeedback();
    showWayOfGreeting()
}


function showNumberOfToDo() {
    let amount = server.todos.filter(t => t['status'] == 'open');

    document.getElementById('number_of_to_do').innerHTML = '';
    document.getElementById('number_of_to_do').innerHTML = amount.length;
}


function showNumberOfDone() {
    let amount = server.todos.filter(t => t['status'] == 'done');

    document.getElementById('number_of_done').innerHTML = '';
    document.getElementById('number_of_done').innerHTML = amount.length;
}

function showNumberOfUrgent() {
    let amount = server.todos.filter(t => t['priority'] == '3');

    document.getElementById('number_of_urgent').innerHTML = '';
    document.getElementById('number_of_urgent').innerHTML = amount.length;
}

function showNumberOfTasksInBoard() {
    let amount = server.todos.length;

    document.getElementById('number_of_tasks_in_boards').innerHTML = '';
    document.getElementById('number_of_tasks_in_boards').innerHTML = amount;
}


function showNumberOfTaskaInProgress() {
    let amount = server.todos.filter(t => t['status'] == 'progress');

    document.getElementById('number_of_tasks_in_progress').innerHTML = '';
    document.getElementById('number_of_tasks_in_progress').innerHTML = amount.length;
}

function showNumberOfAwaitingFeedback() {
    let amount = server.todos.filter(t => t['status'] == 'feedback');

    document.getElementById('number_of_awaiting_feedback').innerHTML = '';
    document.getElementById('number_of_awaiting_feedback').innerHTML = amount.length;
}


function showWayOfGreeting() {
    let greeting;
    if (hour >= 4 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    let greetBox = document.getElementById('greet_box');
    greetBox.innerHTML = '';
    greetBox.textContent = greeting;
}

