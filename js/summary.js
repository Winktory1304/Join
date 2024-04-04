let today = new Date();
let hour = today.getHours();
let users = [];

const currentIndex = localStorage.getItem('currentUserIndex');

let greetingname;
let isShowMenu = false;

function resetUsers() {
    users = [];
    setItem('users', users);
    init();
}

function getName() {
    readJSON('users', users).then(() => {
        showName();
    });
}

function showName() {
    if (users.length == 0) {
        greetingname = 'Guest';
        showWayOfGreeting();
    } else {
    let user = users.filter(u => u.email === currentIndex);
    console.log('current user', currentIndex);
    debugger;
    greetingname = user[0].name;
    showWayOfGreeting();
    }
}


function showHeaderMenu(headerID, hideHeaderClass) {
	let showMenu = document.getElementById(headerID);

	if (isShowMenu) {
		showMenu.classList.add(hideHeaderClass);
		isShowMenu = false;
	} else {
		showMenu.classList.remove(hideHeaderClass);
		isShowMenu = true; 
	}
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

