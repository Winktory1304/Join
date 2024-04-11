
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
}


window.addEventListener('resize', responsive);
responsive();

function responsive() {
    const screenWidth = window.innerWidth;
    const thresholdWidth = 596;
    const targetElement = document.getElementById('join_logo_mobile');

    if (screenWidth <= thresholdWidth) {
        // Screen width greater than 596px
        targetElement.classList.remove('d-none');

    } else {
        // Screen width less than or equal to 596px
        targetElement.classList.add('d-none');
    }
}


