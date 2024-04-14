let loggeduser = [];

let currentUser;

function initRegister() {
    loadUsers();
}

function loadUsers() {
    try {
        readJSON('users', users);
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * Registers a user if email doesn't already exists.
 */
function registerUser() {
    const password = document.getElementById('sign_up_password').value.trim();

    // Überprüfen, ob das Passwortfeld ausgefüllt ist
    if (password === '') {
        return; // Beende die Funktion, wenn das Passwortfeld leer ist
    }

    // Wenn das Passwortfeld ausgefüllt ist, führe die weiteren Aktionen aus
    let email = document.getElementById('sign_up_email').value;
    checkPassword();
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
    document.getElementById('log_in_email').value = '';
    document.getElementById('log_in_password').value = '';
    document.getElementById('password_match').innerHTML = '';
}

/**
 * Checks whether the password is entered correctly twice and enables the register button.
 */
function checkPassword() {
    const password = document.getElementById('sign_up_password').value;
    const confirmPassword = document.getElementById('sign_up_confirm_password').value;
    const passwordMatch = document.getElementById('password_match');

    if (password === '' && confirmPassword === '') {
        passwordMatch.innerHTML = '';
        document.getElementById('input_area_red').classList.remove('input_area_red');
        return; // Beende die Funktion hier, wenn beide Felder leer sind
    }

    if (password === confirmPassword) {
        document.getElementById('sign_up_button').disabled = false;
        passwordMatch.style.color = 'green';
        passwordMatch.innerHTML = 'matching';
        document.getElementById('input_area_red').classList.remove('input_area_red');
    } else {
        document.getElementById('sign_up_button').disabled = true;
        passwordMatch.style.color = 'red';
        passwordMatch.innerHTML = "Ups! your password don't match";
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
        window.location.href = './html/summary.html';
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
 *    ===== funktioniert nicht !!!! <- Gefixxt!
 */
function indexOfUser(email) {
    let userIndex = users.filter(user => user.email === email);
    localStorage.setItem('currentUserIndex', userIndex[0].email); // <- hier wird die User Email in den LocalStorage gespeichert
    console.log('zeig mir den aktuellen User', userIndex[0].email);
}

/**
 *   funktioniert nicht vollständig!!!! <- Gefixxt!
 */
function logInGuest() {
    window.location.href = './html/summary.html';
    localStorage.setItem('currentUserIndex', "Guest");
}



/**
 * Redistricts to the login window.
 */

function goBackToLogIn() {
    resetForm();
    document.getElementById('log_in_container').classList.remove('d-none');
    document.getElementById('sing_up_container').classList.add('d-none');
    document.getElementById('log_container').classList.remove('height-sing-up');
    showSignUpHeader();
}


/**
 * You go to a previous window.
 */
function goOneStepBack() {
    window.history.back();
}

function hideSignUpHeader() {
    let width = document.documentElement.clientWidth;
    if (width < 500) {
        document.getElementById('mobile_header_container').classList.add('d-none');
    }
}

function showSignUpHeader() {
    let width = document.documentElement.clientWidth;
    if (width < 500) {
        document.getElementById('mobile_header_container').classList.remove('d-none');
    }
}

