
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