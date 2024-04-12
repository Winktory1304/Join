let today = new Date();
let hour = today.getHours();

let greetingname;


function resetUsers() {
    users = [];
    setItem('users', users);
    init();
}

function getName() {
    readJSON('users', users).then(() => {
        showName2();
    });
}


function showName2() {
    if (currentIndex === "Guest") {
        greetingname = 'Guest';
        showWayOfGreeting()
    }
    else {
        let user = users.filter(u => u.email === currentIndex);
        console.log('current user', currentIndex);
        greetingname = user[0].name;
        console.log('current name', greetingname);
        showWayOfGreeting()
        getInitials2(user);
    }
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
    let greetName = document.getElementById('user_name');
    greetBox.innerHTML = '';
    greetName.innerHTML = '';
    greetName.innerHTML = greetingname;
    greetBox.textContent = greeting;
}


function init() {
    readJSON('todos', todos).then(() => {
        showAllNumbers();
    });
}


function showAllNumbers() {
    showNumberOfToDo();
    showNumberOfDone();
    showNumberOfUrgent();
    showNumberOfTasksInBoard();
    showNumberOfTasksInProgress();
    showNumberOfAwaitingFeedback();
    showWayOfGreeting()
    getName();
    showUrgentToDo();
}


function showNumberOfToDo() {
    let open = todos.filter(t => t['status'] == 'open');
    let progress = todos.filter(t => t['status'] == 'progress');
    let feedback = todos.filter(t => t['status'] == 'feedback');
    let amount = open.length + progress.length + feedback.length;

    document.getElementById('number_of_to_do').innerHTML = '';
    document.getElementById('number_of_to_do').innerHTML = amount;
}


function showNumberOfDone() {
    let amount = todos.filter(t => t['status'] == 'done');

    document.getElementById('number_of_done').innerHTML = '';
    document.getElementById('number_of_done').innerHTML = amount.length;
}

function showNumberOfUrgent() {
    let amount = todos.filter(t => t['priority'] == '3');

    document.getElementById('number_of_urgent').innerHTML = '';
    document.getElementById('number_of_urgent').innerHTML = amount.length;
}

function showNumberOfTasksInBoard() {
    let amount = todos.length;

    document.getElementById('number_of_tasks_in_boards').innerHTML = '';
    document.getElementById('number_of_tasks_in_boards').innerHTML = amount;
}


function showNumberOfTasksInProgress() {
    let amount = todos.filter(t => t['status'] == 'progress');

    document.getElementById('number_of_tasks_in_progress').innerHTML = '';
    document.getElementById('number_of_tasks_in_progress').innerHTML = amount.length;
}

function showNumberOfAwaitingFeedback() {
    let amount = todos.filter(t => t['status'] == 'feedback');

    document.getElementById('number_of_awaiting_feedback').innerHTML = '';
    document.getElementById('number_of_awaiting_feedback').innerHTML = amount.length;
}

function UpcomingDeadline() {
   
    const filteredDates = todos.filter(todo => todo['priority'] === 3)
        .map(todo => todo.date);

    console.log(filteredDates);
}

/**
 * Shows the amout of urgent todos and the nearest due date of an urgent todo.
 */
function showUrgentToDo() {
    let urgent = document.getElementById('number_of_urgent');
    let dateDiv = document.getElementById('summary_urgent_date');
    
    let todo = todos.filter(t => t['priority'] == 3 && t['status'] == 'open');
    
    if (todo.length === 0) {
        urgent.innerHTML = 0;
        dateDiv.innerHTML = "No urgent tasks"; //*** Display if no urgent tasks are found*/
    } else {
        let sortedTasks = todo.sort((a, b) => new Date(a.date) - new Date(b.date));
        let date = new Date(sortedTasks[0].date);
        date = formatDate(date);
        dateDiv.innerHTML = date;
        urgent.innerHTML = todo.length;
    }
}

/**
 * Formats the date into a custom format.
 * @param {Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
function formatDate(date) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${months[monthIndex]} ${day}, ${year}`;
}