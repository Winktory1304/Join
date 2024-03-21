function register() {

    document.getElementById('log_in_container').classList.add('d-none');
    document.getElementById('sing_up_container').classList.remove('d-none');
    document.getElementById('log_container').classList.add('height-sing-up');

}


function logInGuest() {
    window.location.href = 'summary.html';
}