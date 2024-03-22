let modal = document.getElementById('addContactModal');
let btn = document.getElementById('addContactBtn');
let span = document.getElementsByClassName('close')[0];
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
function addContactModal() {
    modal.style.display = "block";
    
}

function closeModal() {
    modal.style.display = "none";
}