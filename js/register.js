let users = [];


async function initRegister() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
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
    await setItem('users', JSON.stringify(users));
    resetForm();
}

function resetForm() {
    document.getElementById('sign_up_email').value = '';
    document.getElementById('sign_up_password').value = '';
    sign_up_button.disabled = false;
}