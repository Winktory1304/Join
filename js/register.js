let users = [];


async function initRegister() {
    loadUsers();
}

async function loadUsers() {
    try {

        /**
         * Hier wird die Funktion getItem() aufgerufen, die in der Datei storage.js definiert ist.
         * getItem() gibt ein Promise zurück, das mit await aufgelöst wird.
         * Das Ergebnis wird in der Variable x gespeichert.
         * Danach wird auf die Ebene gecastet, die wir haben wollen.
         */
        let usersData = await getItem('users');
        let users = JSON.parse(usersData.data.value);

        console.log('E-Mail:', users[0].email);
        console.log('Passwort:', users[0].password);



        // users = JSON.parse(await getItem('users'));
        // console.log('Users:', users);
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function registerUser() {
    let email = document.getElementById('sign_up_email');
    let password = document.getElementById('sign_up_password');
    sign_up_button.disabled = true;

    users.push({
        email: email.value,
        password: password.value,
    });
    await setItem('users', users);
    resetForm();
}

function resetForm() {
    document.getElementById('sign_up_email').value = '';
    document.getElementById('sign_up_password').value = '';
    sign_up_button.disabled = false;
}