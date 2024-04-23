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

        <div class="sidebar-container">
        <nav class="sidebar">
        <img class="join-logo-sidebar" src="../assets/img/join-logo.svg">
            <section class="menu-sidebar">
                <a class="menu-sidebar-button" href="summary.html" onclick="removeWelcomeAnimation()">
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
        </nav>
        <section class="footer-sidebar">
            <a class="footer-sidebar-link" href="privacyPolice.html">Privacy Policy</a>
            <a class="footer-sidebar-link" href="legalNotice.html">Legal notice</a>
        </section>
    </div>
        
        `;





        document.getElementById('mobile_footer').innerHTML = `
        <div id="mobileBottomBar" class="index">
    <div class="mobile_bottom">
        <div class="mobile_menuitem">
            <a class="mobile_link" href="summary.html">
                <img src="../assets/img/summary.svg">
                <div>Summary</div>
            </a>
        </div>
        <div class="mobile_menuitem">
            <a class="mobile_link" href="addtask.html">
                <img src="../assets/img/addtask.svg">
                <div>Add Task</div>
            </a>
        </div>
        <div class="mobile_menuitem">
            <a class="mobile_link" href="board.html">
                <img src="../assets/img/board.svg">
                <div>Board</div>
            </a>
        </div>



        <div class="mobile_menuitem">
            <a class="mobile_link" href="contacts.html">
                <img src="../assets/img/contacts.svg">
                <div>Contacts</div>
            </a>
        </div>
    </div>
</div>
        `;
    } else {


        document.getElementById('mobile_footer').innerHTML = ``;


        document.getElementById('sidebar').innerHTML = `

<div class="sidebar-container">
    <nav class="sidebar">
        
    <img class="join-logo-sidebar" src="../assets/img/join-logo.svg">
    </nav>
    <section id="footerSideBar1300"class="footer-sidebar">
        <a class="footer-sidebar-link" href="privacyPolice.html">Privacy Policy</a>
        <a class="footer-sidebar-link" href="legalNotice.html">Legal notice</a>
    </section>
</div>


        `;
        setTimeout(() => {
            navbarwithoutSign()
        }, 300);
    }
}


function logout() {
    localStorage.removeItem('isFirstTimeinSummary');
    localStorage.removeItem('currentUserIndex');
    window.location.href = "/index.html";
}

function getName() {

    users = [];
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


function navbarwithoutSign() {
    document.getElementById('help-user-container').innerHTML = '';
}


/**
 * It takes you a step back.
 */
function goOneStepBack() {
    if (currentIndex != null)
        window.location.href = "/html/summary.html";
    else
        window.location.href = "/index.html";
}