let modal = document.getElementById('contactModal');
let btn = document.getElementById('addContactBtn');
let span = document.getElementsByClassName('close')[0];
// When the user clicks anywhere outside of the modal, close it
function addContactModal() {
    
    modal.style.display = "flex";

}


function closeModal() {
    modal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}