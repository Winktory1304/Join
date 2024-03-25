function register() {
    document.getElementById('log_in_container').classList.add('d-none');
    document.getElementById('sing_up_container').classList.remove('d-none');
    document.getElementById('log_container').classList.add('height-sing-up');
}


function logInGuest() {
    window.location.href = 'html/summary.html';
}


function simulationSignedUp() {
    document.getElementById('sigend-up-successfuly-container').classList.remove('d-none');

    setTimeout(function() {
        document.getElementById(`sigend-up-successfuly-container`).classList.add('d-none'); 
        }, 2000);
}
