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
        greetingname = user[0].name;
        showWayOfGreeting()
        getInitials2(user);
    }
}

/**
 * shows the form of greeting depending on the time of day and the user name in the geeting field.
 */
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
    greetBox.textContent = greeting;
    greetName.innerHTML = greetingname;

    if (innerWidth < 870) {

        if (localStorage.getItem('isFirstTimeinSummary') === "true") {

            let greetBox = document.getElementById('greet_box2');
            let greetName = document.getElementById('user_name2');
            greetBox.innerHTML = '';
            greetName.innerHTML = '';
            greetBox.textContent = greeting;
            greetName.innerHTML = greetingname;
            document.getElementById('greeting_container2').classList.add('greeting-mobile');
            setTimeout(() => {
                document.getElementById('greeting_container2').classList.add('d-none');
                localStorage.setItem('isFirstTimeinSummary', false);
            }, 3000);

        }
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
    getName();
    showWayOfGreeting();
    showUrgentToDo();

    isloggedin();
}

/**
 * Filters and displays the amout of open to-dos.
 */
function showNumberOfToDo() {
    let open = todos.filter(t => t['status'] == 'open');
    let progress = todos.filter(t => t['status'] == 'progress');
    let feedback = todos.filter(t => t['status'] == 'feedback');
    let amount = open.length + progress.length + feedback.length;

    document.getElementById('number_of_to_do').innerHTML = '';
    document.getElementById('number_of_to_do').innerHTML = amount;
}

/**
 * Filters and displays the amout of tasks that haven been completed.
 */
function showNumberOfDone() {
    let amount = todos.filter(t => t['status'] == 'done');

    document.getElementById('number_of_done').innerHTML = '';
    document.getElementById('number_of_done').innerHTML = amount.length;
}

/**
 * Filters and displays the amout of urgent tasks.
 */
function showNumberOfUrgent() {
    let amount = todos.filter(t => t['priority'] == '3');

    document.getElementById('number_of_urgent').innerHTML = '';
    document.getElementById('number_of_urgent').innerHTML = amount.length;
}


/**
 * Filters and displays the amout of all tasks.
 */
function showNumberOfTasksInBoard() {
    let amount = todos.length;

    document.getElementById('number_of_tasks_in_boards').innerHTML = '';
    document.getElementById('number_of_tasks_in_boards').innerHTML = amount;
}

/**
 * Filters and displays the amout of tasks in progress.
 */
function showNumberOfTasksInProgress() {
    let amount = todos.filter(t => t['status'] == 'progress');

    document.getElementById('number_of_tasks_in_progress').innerHTML = '';
    document.getElementById('number_of_tasks_in_progress').innerHTML = amount.length;
}

/**
 * Filters and displays the amout of tasks for which we expect feedback.
 */
function showNumberOfAwaitingFeedback() {
    let amount = todos.filter(t => t['status'] == 'feedback');

    document.getElementById('number_of_awaiting_feedback').innerHTML = '';
    document.getElementById('number_of_awaiting_feedback').innerHTML = amount.length;
}



/**
 * Shows the amout of urgent todos and the nearest due date of an urgent todo.
 */
function showUrgentToDo() {
    let urgent = document.getElementById('number_of_urgent');
    let dateDiv = document.getElementById('summary_urgent_date');

    let todo = todos.filter(t => t['priority'] == 3 && (t['status'] == 'open' || t['status'] == 'feedback' || t['status'] == 'progress'));

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

function removeWelcomeAnimation() {
    document.getElementById('greeting_container').classList.remove('greeting-mobile');
}