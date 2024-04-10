function registerWindow() {
    const screenWidth = window.innerWidth;
    const disappearJoinElement = document.getElementById('header_container');

    if (screenWidth <= 596) {
        // Bildschirmbreite kleiner oder gleich 596px
        disappearJoinElement.classList.add('d-none'); // Fügt die Klasse hinzu
    } else {
        // Bildschirmbreite größer als 596px
        disappearJoinElement.classList.remove('d-none'); // Entfernt die Klasse
    }

    document.getElementById('log_in_container').classList.add('d-none');
    document.getElementById('sing_up_container').classList.remove('d-none');
    document.getElementById('log_container').classList.add('height-sing-up');
    resetForm();
}

document.getElementById('header_container').addEventListener('click', registerWindow);

