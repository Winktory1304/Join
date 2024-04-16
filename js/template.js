let users = [];

const currentIndex = localStorage.getItem('currentUserIndex');


let isShowMenu = false;
function showHeaderMenu(headerID, hideHeaderClass) {
    let showMenu = document.getElementById(headerID);

    if (isShowMenu) {
        showMenu.classList.add(hideHeaderClass);
        isShowMenu = false;
    } else {
        showMenu.classList.remove(hideHeaderClass);
        isShowMenu = true;
    }

    if (window.innerWidth < 1300) {
        showMenu.innerHTML = `
        <a class="header-menu-button" href="./help.html">Help</a>
        <a class="header-menu-button" href="./legalNotice.html">Legal Notice</a>
	    <a class="header-menu-button" href="./privacyPolice.html">Privacy Policy</a>
	    <a class="header-menu-button" onclick="logout()">Log out</a>
        `;
    } else {
        showMenu.innerHTML = `
        <a class="header-menu-button" href="./legalNotice.html">Legal Notice</a>
	    <a class="header-menu-button" href="./privacyPolice.html">Privacy Policy</a>
	    <a class="header-menu-button" onclick="logout()">Log out</a>
        `;
    }
}

function isloggedin() {
    if (currentIndex != null) {
        document.getElementById('sidebar').innerHTML = `
        <img class="join-logo-sidebar" src="../assets/img/join-logo.svg">
        <section class="menu-sidebar">
            <a class="menu-sidebar-button" href="summary.html">
                <img src="../assets/img/summary.svg">
                <div>Summary</div>
            </a>

             <a class="menu-sidebar-button" href="addtask.html">
                <img src="../assets/img/addtask.svg">
                <div>Add Task</div>
            </a>

            <a class="menu-sidebar-button" href="board.html">
                <img src="../assets/img/board.svg">
                <div>Board</div>
            </a>

            <a class="menu-sidebar-button" href="contacts.html">
                <img src="../assets/img/contacts.svg">
                <div>Contacts</div>
            </a>
        </section>
        
        `;
    } else {
        document.getElementById('sidebar').innerHTML = `
        <img class="join-logo-sidebar" src="../assets/img/join-logo.svg">
        `;

    }
}


function logout() {
    localStorage.removeItem('currentUserIndex');
    window.location.href = "/index.html";
}

function getName() {
    
    users=[];
    readJSON('users', users).then(() => {
        showName();
    });
}
function showName() {
    if (currentIndex === "Guest") {
        greetingname = 'Guest';
    }
    else {
        let user = users.filter(u => u.email === currentIndex);
        greetingname = user[0].name;
        getInitials2(user);
    }
}


function getInitials2(user) {

    let fullName = user[0].name;
    let nameParts = fullName.split(' ');
    let firstName = nameParts[0].charAt(0);
    let secondName = nameParts[1].charAt(0);

    initials = firstName + secondName;
    document.getElementById('initials').innerHTML = initials;
}
