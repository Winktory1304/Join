let users = [];

let link = "";


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

        document.getElementById('sidebar').innerHTML = /*html*/ `

<div class="sidebar-container">
    <nav class="sidebar">
    <img class="join-logo-sidebar" src="../assets/img/join-logo.svg">
        <section class="menu-sidebar">
            <a class="menu-sidebar-button" id="summarylink" href="summary.html" onclick="removeWelcomeAnimation()">
                <img src="../assets/img/summary.svg">
                <div>Summary</div>
            </a>

             <a class="menu-sidebar-button" id="addtasklink" href="addtask.html">
                <img src="../assets/img/addtask.svg">
                <div>Add Task</div>
            </a>

            <a class="menu-sidebar-button" id="boardlink" href="board.html">
                <img src="../assets/img/board.svg">
                <div>Board</div>
            </a>

            <a class="menu-sidebar-button" id="contactslink" href="contacts.html">
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
        <div class="mobile_menuitem" id="mobile_summarylink" >
            <a class="mobile_link"  href="summary.html">
                <img src="../assets/img/summary.svg">
                <div>Summary</div>
            </a>
        </div>
        <div class="mobile_menuitem" id="mobile_addtasklink">
            <a class="mobile_link"   href="addtask.html">
                <img src="../assets/img/addtask.svg">
                <div>Add Task</div>
            </a>
        </div>
        <div class="mobile_menuitem"id="mobile_boardlink" >
            <a class="mobile_link" href="board.html">
                <img src="../assets/img/board.svg">
                <div>Board</div>
            </a>
        </div>



        <div class="mobile_menuitem" id="mobile_contactslink">
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

    setLink();
}


function setLink() {

    if (innerWidth > 1300) {
        if (window.location.href.includes('/html/summary.html')) {
            document.getElementById('summarylink').classList.add('blue');
            document.getElementById('addtasklink').classList.remove('blue');
            document.getElementById('boardlink').classList.remove('blue');
            document.getElementById('contactslink').classList.remove('blue');
        }
        else if (window.location.href.includes('/html/addtask.html')) {
            document.getElementById('summarylink').classList.remove('blue');
            document.getElementById('addtasklink').classList.add('blue');
            document.getElementById('boardlink').classList.remove('blue');
            document.getElementById('contactslink').classList.remove('blue');
        }
        else if (window.location.href.includes('/html/board.html')) {
            document.getElementById('summarylink').classList.remove('blue');
            document.getElementById('addtasklink').classList.remove('blue');
            document.getElementById('boardlink').classList.add('blue');
            document.getElementById('contactslink').classList.remove('blue');
        }
        else if (window.location.href.includes('/html/contacts.html')) {
            document.getElementById('summarylink').classList.remove('blue');
            document.getElementById('addtasklink').classList.remove('blue');
            document.getElementById('boardlink').classList.remove('blue');
            document.getElementById('contactslink').classList.add('blue');
        }
    }
    else {
        if (window.location.href.includes('/html/summary.html')) {
            document.getElementById('mobile_summarylink').classList.add('mobileBlue');
            document.getElementById('mobile_addtasklink').classList.remove('mobileBlue');
            document.getElementById('mobile_boardlink').classList.remove('mobileBlue');
            document.getElementById('mobile_contactslink').classList.remove('mobileBlue');

        }
        else if (window.location.href.includes('/html/addtask.html')) {
            document.getElementById('mobile_summarylink').classList.remove('mobileBlue');
            document.getElementById('mobile_addtasklink').classList.add('mobileBlue');
            document.getElementById('mobile_boardlink').classList.remove('mobileBlue');
            document.getElementById('mobile_contactslink').classList.remove('mobileBlue');
        }
        else if (window.location.href.includes('/html/board.html')) {
            document.getElementById('mobile_summarylink').classList.remove('mobileBlue');
            document.getElementById('mobile_addtasklink').classList.remove('mobileBlue');
            document.getElementById('mobile_boardlink').classList.add('mobileBlue');
            document.getElementById('mobile_contactslink').classList.remove('mobileBlue');
        }
        else if (window.location.href.includes('/html/contacts.html')) {
            document.getElementById('mobile_summarylink').classList.remove('mobileBlue');
            document.getElementById('mobile_addtasklink').classList.remove('mobileBlue');
            document.getElementById('mobile_boardlink').classList.remove('mobileBlue');
            document.getElementById('mobile_contactslink').classList.add('mobileBlue');
        }
    }
}

function highlightBlue() {
    document.getElementById(`highlight4`).classList.remove('summary-button');
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