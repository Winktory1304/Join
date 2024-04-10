let users = [];

const currentIndex = localStorage.getItem('currentUserIndex');


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
function getName() {
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
        console.log('current user', currentIndex);
        greetingname = user[0].name;
        console.log('current name', greetingname);
        getInitials2(user);
    }
}


function getInitials2(user) {

    let fullName = user[0].name;
    let nameParts = fullName.split(' ');
    let firstName = nameParts[0].charAt(0);
    let secondName = nameParts[1].charAt(0);

    initials = firstName+secondName;
    document.getElementById('initials').innerHTML = initials;

    console.log(firstName);
    console.log(secondName);
    console.log(initials);
}