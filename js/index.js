function registerWindow() {

    document.getElementById('log_in_container').classList.add('d-none');
    document.getElementById('sing_up_container').classList.remove('d-none');
    document.getElementById('log_container').classList.add('height-sing-up');
    document.getElementById('header_container').classList.add('d-none');
    resetForm();
    hideSignUpHeader();
}