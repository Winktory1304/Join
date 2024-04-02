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
        
        readJSON('users', users);


        // users = JSON.parse(await getItem('users'));
        // console.log('Users:', users);
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function registerUser() {

    let email = document.getElementById('sign_up_email').value;
    checkPrivacyPolicy();

    if (checkIfEmailExists(email)) {
        warningEmailExists();
    } else {
        pushTheUserToStorage();

        document.getElementById('sigend-up-successfuly-container').classList.remove('d-none');

        setTimeout(function () {
            document.getElementById(`sigend-up-successfuly-container`).classList.add('d-none');
        }, 2000);

        setTimeout(function () {
            goBackToLogIn();
        }, 2000);
    }
}


function checkIfEmailExists(email) {
    return users.some((user) => user.email === email);
}


function warningEmailExists() {
    let warning = document.getElementById('password_match');
    warning.innerHTML = 'The email already exists';
    warning.style.color = 'red';
}


async function pushTheUserToStorage() {
    let name = document.getElementById('sign_up_name');
    let email = document.getElementById('sign_up_email');
    let password = document.getElementById('sign_up_password');

    users.push({
        name: name.value,
        email: email.value,
        password: password.value,
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
}


function resetForm() {
    document.getElementById('sign_up_name').value = '';
    document.getElementById('sign_up_email').value = '';
    document.getElementById('sign_up_password').value = '';
    document.getElementById('sign_up_confirm_password').value = '';
    document.getElementById('sign_up_button').disabled = true;
}


function checkPassword() {
    if (document.getElementById('sign_up_password').value == document.getElementById('sign_up_confirm_password').value) {
        document.getElementById('sign_up_button').disabled = false;
        document.getElementById('password_match').style.color = 'green';
        document.getElementById('password_match').innerHTML = 'matching';
        document.getElementById('input_area_red').classList.remove('input_area_red');
    } else {
        document.getElementById('sign_up_button').disabled = true;
        document.getElementById('password_match').style.color = 'red';
        document.getElementById('password_match').innerHTML = "Ups! your password don't match";
        document.getElementById('input_area_red').classList.add('input_area_red');
    }
}


function checkPrivacyPolicy() {
    let checkPrivacyPolicyTrue = document.getElementById('privacy_policy_check');
    let signUpButton = document.getElementById('sign_up_button');

    if (checkPrivacyPolicyTrue.checked) {

        signUpButton.disabled = true;
        signUpButton.classList.add('disable-button'); //* Set background color to gray       

    } else {
        signUpButton.disabled = false;
        signUpButton.classList.remove('disable-button');  //* Reset background color/
    }
}


function logIn() {
    let email = document.getElementById('log_in_email').value;
    let password = document.getElementById('log_in_password').value;
    let message = document.getElementById('email_or_password_not_found');
    let user = userValidation(email, password);
    if (user) {
        indexOfUsers(email);
        
        document.getElementById(`logged_in_successfuly_container`).classList.remove('d-none');
              
        setTimeout(function () {
            document.getElementById(`logged_in_successfuly_container`).classList.add('d-none');
        }, 2000);

        setTimeout(function () {
            window.location.href = './html/summary.html';
        }, 2000);

        
    }
    else {
        message.innerText = 'Ups! Email or password not found !';        
    }
}


function userValidation(email, password) {
    let user = users.find(u => u.email == email && u.password == password);
    return user;
}


function indexOfUsers(email) {
    let userIndex = users.findIndex(user => user.email === email);
    localStorage.setItem('currentUserIndex', userIndex);
}


function logInGuest() {
    guest = document.getElementById('user_name');
    window.location.href = 'html/summary.html';
    userIndex = -1; 
    localStorage.setItem('currentUserIndex', userIndex);
    guest.innerHTML = '';
    guest.innerHTML = 'Guest';
}


function goBackToLogIn() {
    document.getElementById('log_in_container').classList.remove('d-none');
    document.getElementById('sing_up_container').classList.add('d-none');
    document.getElementById('log_container').classList.remove('height-sing-up');
}