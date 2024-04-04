let loggeduser = [];

let currentUser;

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


/**
 * Registers a user if email doesn't already exists.
 */
function registerUser() {

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


/**
 * Checks if an email already exists in the users array.
 * @param {string} email - The email to check.
 * @returns {boolean} True if the email exists, false otherwise.
 */
function checkIfEmailExists(email) {
    return users.some((user) => user.email === email);
}


/**
 * Shows a message saying that the email already exists.
 */
function warningEmailExists() {
    let warning = document.getElementById('password_match');
    warning.innerHTML = 'The email already exists';
    warning.style.color = 'red';
}

/**
 * Adds user to users array and stores it in the remote storage.
 */
async function pushTheUserToStorage() {
    let name = document.getElementById('sign_up_name');
    let email = document.getElementById('sign_up_email');
    let password = document.getElementById('sign_up_password');

    users.push({
        name: name.value,
        email: email.value,
        password: password.value,
    });
    await setItem('users', users);
    resetForm();
}

/**
 * Resets input fields and disables registration button in the registration form.
 */
function resetForm() {
    document.getElementById('sign_up_name').value = '';
    document.getElementById('sign_up_email').value = '';
    document.getElementById('sign_up_password').value = '';
    document.getElementById('sign_up_confirm_password').value = '';
    document.getElementById('sign_up_button').disabled = true;
}

/**
 * Checks whether the password is entered correctly twice and enables the register button.
 */
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

/**
 * Checks if the terms and conditions are confirmed to enable register button.
 */
function checkPrivacyPolicy() {
    let checkPrivacyPolicyTrue = document.getElementById('privacy_policy_check');
    let signUpButton = document.getElementById('sign_up_button');

    if (checkPrivacyPolicyTrue.checked) {

        signUpButton.disabled = true;
        signUpButton.classList.add('disable-button'); //* Set background color to gray       

    } else {
        signUpButton.disabled = false;
        signUpButton.classList.remove('disable-button');  //* Unlocks the register button
    }
}


function logIn() {
    let email = document.getElementById('log_in_email').value;
    let password = document.getElementById('log_in_password').value;
    let message = document.getElementById('email_or_password_not_found');
    let user = userValidation(email, password);
    if (user) {
        indexOfUser(email);
        loadCurrentUser();



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

/**
 * Validates user by checking email and password.
 * @param {string} email - The email entered by the user.
 * @param {string} password - The password entered by the user.
 * @returns {object|null} The user object if found, null otherwise.
 */
function userValidation(email, password) {
    let user = users.find(u => u.email == email && u.password == password);
    return user;
}

/**
 *    ===== funktioniert nicht !!!!
 */
function indexOfUser(email) {
    let userIndex = users.findIndex(user => user.email === email);
    localStorage.setItem('currentUserIndex', userIndex);
    console.log('zeig mir den aktuellen User', userIndex);
}


/**
 *    ===== funktioniert nicht !!!!
 */
async function loadCurrentUser() {

    let currentemail = document.getElementById('log_in_email').value;
    loggeduser.push({
        email: currentemail.value,
    });
    await setItem('usersemail', JSON.stringify(loggeduser));
    resetForm();
    console.log('zeig mir den eingeloggten User', loggeduser);
}


/**
 *    ===== funktioniert nicht !!!! alt!!
 */
function showNameOfUser() {
    let name = document.getElementById('user_name');
    i = currentUser;
    if (i >= 0) {
        name.innerHTML = `${users[i]['name']}`;
    } else {
        name.innerHTML = '';
        name.innerHTML = 'Guest';
    }
}

/**
 *   funktioniert nicht vollständig!!!!
 */
function logInGuest() {
    window.location.href = './html/summary.html';
    userIndex = -1;
    localStorage.setItem('currentUserIndex', userIndex);
    document.getElementById('user_name') = 'Guest User';
    loadCurrentUser();
}


/**
 * Redistricts to the login window.
 */
function goBackToLogIn() {
    document.getElementById('log_in_container').classList.remove('d-none');
    document.getElementById('sing_up_container').classList.add('d-none');
    document.getElementById('log_container').classList.remove('height-sing-up');
}


