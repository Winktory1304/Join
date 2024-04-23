let colors = ["rgb(147,39,255)", "rgb(110,82,255)", "rgb(252,113,255)", "rgb(255,195,69)", "rgb(31,215,193)", "rgb(31,215,193)", "rgb(31,215,193)", "rgb(255,70,70)", "rgb(255,122,0)", "rgb(255,122,0)", "rgb(135, 206, 235)", "rgb(75, 0, 130)", "rgb(255, 165, 0)", "rgb(128, 0, 0)", "rgb(46, 139, 87)", "rgb(255, 192, 203)", "rgb(70, 130, 180)", "rgb(210, 105, 30)", "rgb(220, 220, 220)", "rgb(245, 245, 220)"];
let contacts = [];
let contactupdated = [];
let detailViewContacts = [];
let contactsaveid = 0;
let todos = [];

async function init() {
    isloggedin();
    await getUsersintoContacts();
    renderContacts();
    getName();
}


/**
 * Retrieves users from a JSON file and adds them to the contacts list.
 * @async
 * @function getUsersintoContacts
 * @returns {Promise<void>} A promise that resolves when the users are added to the contacts list.
 */
async function getUsersintoContacts() {
    await readServerData();
    users = [];
    await readJSON('users', users) 
    users.forEach(user => {
        if (!contacts.some(contact => contact.idContact === user.idContact) && user.name) {
            let firstInitial = user.name[0] ? user.name[0][0] : '';
            let secondInitial = user.name.split(' ')[1] ? user.name.split(' ')[1][0] : '';
            contacts.push({
                "idContact": user.idContact,
                "firstName": user.name.split(' ')[0],
                "lastName": user.name.split(' ')[1] || '',
                "email": user.email,
                "phoneNumber": "",
                "firstLetterofNames": firstInitial + secondInitial,
                "color": getRandomColor()
            });
        }
    });       
    removeDuplicateContacts();
    await setItem('contacts', contacts);
}


/**
 * Resets the contacts array, deletes contacts from storage, and renders the updated contacts.
 * @returns {void}
 */
function resetContacts() {
    contacts = [];
    setItem('contacts', contactstopush).then(() => { ; readServerData(); renderContacts(); });
}


/**
 * Reads server data and renders contacts.
 * @async
 * @function readServerData
 * @returns {Promise<void>} A promise that resolves when the server data is loaded and contacts are rendered.
 */
async function readServerData() {
    readJSON('todos', todos)
    await readJSON('contacts', contacts);        
    removeDuplicateContacts();
    renderContacts(); 
}


/**
 * Renders the contacts on the page.
 * Sorts the contacts by initial, groups them by initial, and displays them in the specified HTML element.
 */
function renderContacts() {
    sortContactsByInitial();
    let groupedContacts = groupContactsByInitial();
    let content = document.getElementById('contactsRenderContent');
    content.innerHTML = '';
    let counter = 0;
    Object.keys(groupedContacts).sort().forEach(initial => {
        content.innerHTML += /*html*/`<div class="letter-group">
        <div class="letter-group-first-name">${initial}</div>
        <div>
        <div class="letter-seperator"></div>`;
        groupedContacts[initial].forEach(contact => {
            removeDuplicateContacts()
            let contactId = counter;
            counter++;
            content.innerHTML += /*html*/`
                <div class="contact-box" id='${contactId}' onclick='openDetailedContactsView("${contactId}")'>
                    <div class="first-letters-of-names">
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="42" height="42" rx="21" fill="white"/>
                            <circle cx="21" cy="21" r="20" fill="${contact.color}" stroke="white" stroke-width="2"/>
                            <text x="21" class="profile-badge" y="21" text-anchor="middle" dominant-baseline="middle" fill="white">${contact.firstLetterofNames}</text>
                        </svg>
                    </div>
                    <div class="first-and-last-name-box">${contact.firstName} ${contact.lastName}<br>
                    <div class="contact-box-email">${contact.email}</div>
                    </div>        
                </div>
            `;
        });
        content.innerHTML += /*html*/`</div></div>`;
    });
}


/**
 * Groups contacts by their initial.
 * @returns {Object} An object containing contacts grouped by their initial.
 */
function groupContactsByInitial() {
    let groupedContacts = {};
    contacts.forEach(contact => {
        let initial = contact.firstName[0].toUpperCase();
        if (!groupedContacts[initial]) {
            groupedContacts[initial] = [];
        }
        groupedContacts[initial].push(contact);
    });
    return groupedContacts;
}


/**
 * Opens the detailed contacts view for a specific contact.
 * @param {string} contactId - The ID of the contact to open the detailed view for.
 */
function openDetailedContactsView(contactId) {
    contactsaveid = contactId;
    let width = window.innerWidth;
    let contact = detailViewContacts[contactId]
    let content = document.getElementById('detailViewContent');
    let responsivContent = document.getElementById('responsivDetailViewContent');
    highlightContactBox(contactId);
    if (width < 1300) {
        showResponsivDetail();
        detailViewResponsiv(responsivContent, contact);
    } else {
        detailViewDesktop(content, contact, contactId);
    }
}


/**
 * Renders the detail view of a contact on a desktop device.
 *
 * @param {HTMLElement} content - The HTML element where the detail view will be rendered.
 * @param {Object} contact - The contact object containing the contact details.
 * @param {number} contactId - The ID of the contact.
 * @returns {void}
 */
function detailViewDesktop(content, contact, contactId) {
    content.innerHTML = /*html*/ `
                <div class="detail-view-child1">
                    <svg width="120" height="120" viewBox="0 0 42 42" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="42" height="42" rx="21" fill="white" />
                        <circle cx="21" cy="21" r="20" fill="${contact.color}" stroke="white" stroke-width="2" />
                        <text x="21" class="profile-badge" y="21" text-anchor="middle" dominant-baseline="middle" fill="white">${contact.firstLetterofNames}</text>
                    </svg>
                    <div class="detail-view-box">
                        <div class="detail-view-name">
                        ${contact.firstName} ${contact.lastName}
                        </div>
                        <div class="detail-view-symbols">
                            <p class="edit-contact-symbols" onclick="editContact(${contactId})">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" />
                            </svg>
                                Edit
                            </p> 
                            <p class="edit-contact-symbols" onclick="deleteContactById(${contactId})">
                                <svg width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">                                   
                                    <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" />
                                </svg>
                                Delete
                            </p>
                        </div>
                    </div>
                </div>
                <div class="detail-view-contact-information-text">Contact Information</div>
                <div class="detail-view-contact-email"> Email</div>
                <div class="detail-view-email">${contact.email}</div>
                <div class="detail-view-contact-phone">Phone</div>
                <div>${contact.phoneNumber}</div>`;
}


/**
 * Renders the detail view of a contact in a responsive manner.
 *
 * @param {HTMLElement} responsivContent - The HTML element where the detail view will be rendered.
 * @param {Object} contact - The contact object containing the details to be displayed.
 */
function detailViewResponsiv(responsivContent, contact) {
    responsivContent.innerHTML = /*html*/ `
                    <div class="detail-view-child1-responsiv">
                        <svg width="80" height="80" viewBox="0 0 42 42" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect width="42" height="42" rx="21" fill="white" />
                            <circle cx="21" cy="21" r="20" fill="${contact.color}" stroke="white" stroke-width="2" />
                            <text x="21" class="profile-badge" y="21" text-anchor="middle" dominant-baseline="middle" fill="white">${contact.firstLetterofNames}</text>
                        </svg>
                        <div class="detail-view-box">
                            <div class="detail-view-name-responsiv">
                            ${contact.firstName} ${contact.lastName}
                            </div>                           
                        </div>
                    </div>
                    <div class="detail-view-contact-information-text">Contact Information</div>
                    <div class="detail-view-contact-email"> Email</div>
                    <div  class="detail-view-email">${contact.email}</div>
                    <div class="detail-view-contact-phone">Phone</div>
                    <div >${contact.phoneNumber}</div>`;
}


/**
 * Displays a popup for creating contacts.
 */
function createContactPopup() {
    let popup = document.getElementById('createContactsPopup');
    popup.style.display = 'flex';
    setTimeout(function () {
        popup.style.display = 'none';
    }, 3000);
}


/**
 * Deletes a contact by its ID.
 *
 * @param {number} contactId - The ID of the contact to be deleted.
 */
function deleteContactById(contactId) {
    contactId = contactsaveid;
    if (contactId >= 0 && contactId < detailViewContacts.length) {
        const [removedContact] = detailViewContacts.splice(contactId, 1);
        const contactIndex = contacts.findIndex(contact => contact.email === removedContact.email);
        const usersIndex = users.findIndex(user => user.email === removedContact.email);
        document.getElementById('detailViewContent').innerHTML = '';
        hideModal('responsivEditContact');
        hideModal('burgerResponiv');
        removeResponivContactsOverview();
        deleteContactsfromTasks(contactId)
        if (usersIndex !== -1 && contactIndex !== -1) {
            contacts.splice(contactIndex, 1);
            users.splice(usersIndex, 1);
            setItem('contacts', contacts).then(() => {
                setItem('users', users).then(() => {
                    localStorage.removeItem('currentUserIndex');
                });
            });
        } else if (contactIndex !== -1) {
            contacts.splice(contactIndex, 1);
            setItem('contacts', contacts).then(() => {
                readServerData();
            });
        }
        renderContacts();
    }
}


/**
 * Adds a new contact.
 */
function addNewContact() {
    addContact('create-contact-email-input', 'create-contact-name-input', 'create-contact-phone-input', 'contactModal');
}


/**
 * Adds a new contact in a responsive manner.
 */
function addNewContactResponsiv() {
    addContact('responsivCreateContactEmailInput', 'responsivCreateContactNameInput', 'responsivCreateContactPhoneInput', 'responsivAddContact');
}


/**
 * Adds a new contact to the contact list.
 * 
 * @param {string} emailInputId - The ID of the email input field.
 * @param {string} nameInputId - The ID of the name input field.
 * @param {string} phoneInputId - The ID of the phone input field.
 * @param {string} modalId - The ID of the modal element.
 */
function addContact(emailInputId, nameInputId, phoneInputId, modalId) {
    document.getElementById('fullNameValidationText').textContent = '';
    let email = document.getElementById(emailInputId).value;
    let emailIndex = findEmailIndex(email);
    let fullName = document.getElementById(nameInputId).value;
    let names = validateFullName(fullName);
    if (!names) {
        document.getElementById('fullNameValidationText').textContent = 'Please enter a first and last name.';
        return;
    }
    let newContact = createNewContact(names, email, document.getElementById(phoneInputId).value);
    addContactOrWarn(emailIndex, newContact, modalId);
    hideModal(modalId);
    clearInputFields();
}


/**
 * Creates a new contact object.
*
* @param {string[]} names - An array of names.
* @param {string} email - The email address of the contact.
* @param {string} phone - The phone number of the contact.
* @returns {object} - The newly created contact object.
*/
function createNewContact(names, email, phone) {
    const id = generateUniqueId();
    return {
        "idContact": id,
        "firstName": names[0],
        "lastName": names.slice(1).join(' '),
        "email": email,
        "phoneNumber": phone,
        "firstLetterofNames": names[0][0] + names[1][0],
        "color": getRandomColor()
    };
}


/**
 * Generates a unique ID using a timestamp and a random number.
 * @returns {string} The generated unique ID.
 */
function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomNumber = Math.random().toString(36).substring(2);
    return timestamp + randomNumber;
}


/**
 * Sorts the contacts array by the initial of their first name.
 * If the initials are the same, sorts by the whole first name.
*
* @returns {void}
*/
function sortContactsByInitial() {
    detailViewContacts = contacts.sort((a, b) => {
        const initialA = a.firstName[0].toUpperCase();
        const initialB = b.firstName[0].toUpperCase();
        if (initialA < initialB) {
            return -1;
        }
        if (initialA > initialB) {
            return 1;
        }       
        return a.firstName.toUpperCase().localeCompare(b.firstName.toUpperCase());
    });
}


/**
 * Validates a full name by checking if it contains at least two names.
 * @param {string} fullName - The full name to be validated.
 * @returns {string[]|null} - An array of names if the full name is valid, otherwise null.
 */
function validateFullName(fullName) {
    let names = fullName.trim().split(/\s+/);
    if (names.length < 2) {
        return null;
    }
    return names;
}


/**
 * Finds the index of a contact with the specified email in the contacts array.
 * @param {string} email - The email to search for.
 * @returns {number} - The index of the contact with the specified email, or -1 if not found.
 */
function findEmailIndex(email) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].email === email) {
            return i;
        }
    }
    return -1;
}


/**
 * Generates a random color from the available colors array.
 * @returns {string} A random color.
 */
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}


/**
 * Removes duplicate contacts from the contacts array based on id uniqueness.
 */
function removeDuplicateContacts() {
    const uniqueIds = new Set();
    const uniqueContacts = contacts.filter(contact => {
        if (!uniqueIds.has(contact.idContact)) {
            uniqueIds.add(contact.idContact);
            return true;
        }
        return false;
    });
    contacts = uniqueContacts; 
}


document.addEventListener('DOMContentLoaded', () => {

});