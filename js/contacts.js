let colors = ["rgb(147,39,255)", "rgb(110,82,255)", "rgb(252,113,255)", "rgb(255,195,69)", "rgb(31,215,193)", "rgb(31,215,193)", "rgb(31,215,193)", "rgb(255,70,70)", "rgb(255,122,0)", "rgb(255,122,0)"]
let contactupdated = [];
let detailViewContacts = [];

//Array zum pushen into the storage with the key 'contacts'
let contactstopush =
    [
        {
            "firstName": "Anna",
            "lastName": "Schmidt",
            "email": "annaschmidt@test123.de",
            "phoneNumber": "01731305001",
            "firstLetterofNames": "AS",
            "color": "rgb(147,39,255)"
        },
        {
            "firstName": "Bernd",
            "lastName": "Müller",
            "email": "berndmueller@test123.de",
            "phoneNumber": "01731305002",
            "firstLetterofNames": "BM",
            "color": "rgb(110,82,255)"
        },
        {
            "firstName": "Claudia",
            "lastName": "Schneider",
            "email": "claudiaschneider@test123.de",
            "phoneNumber": "01731305003",
            "firstLetterofNames": "CS",
            "color": "rgb(252,113,255)"
        },
        {
            "firstName": "David",
            "lastName": "Fischer",
            "email": "davidfischer@test123.de",
            "phoneNumber": "01731305004",
            "firstLetterofNames": "DF",
            "color": "rgb(255,195,69)"
        },
        {
            "firstName": "Elena",
            "lastName": "Weber",
            "email": "elenaweber@test123.de",
            "phoneNumber": "01731305005",
            "firstLetterofNames": "EW",
            "color": "rgb(147,39,255)"
        },
        {
            "firstName": "Felix",
            "lastName": "Meyer",
            "email": "felixmeyer@test123.de",
            "phoneNumber": "01731305006",
            "firstLetterofNames": "FM",
            "color": "rgb(147,39,255)"
        },
        {
            "firstName": "Greta",
            "lastName": "Wagner",
            "email": "gretawagner@test123.de",
            "phoneNumber": "01731305007",
            "firstLetterofNames": "GW",
            "color": "rgb(255,122,0)"
        },
        {
            "firstName": "Hans",
            "lastName": "Becker",
            "email": "hansbecker@test123.de",
            "phoneNumber": "01731305008",
            "firstLetterofNames": "HB",
            "color": "rgb(147,39,255)"
        },
        {
            "firstName": "Ingrid",
            "lastName": "Schulz",
            "email": "ingridschulz@test123.de",
            "phoneNumber": "01731305009",
            "firstLetterofNames": "IS",
            "color": "rgb(147,39,255)"
        },
        {
            "firstName": "Johannes",
            "lastName": "Hoffmann",
            "email": "johanneshoffmann@test123.de",
            "phoneNumber": "01731305010",
            "firstLetterofNames": "JH",
            "color": "rgb(255,122,0)"
        },
        {
            "firstName": "Karin",
            "lastName": "Krause",
            "email": "karinkrause@test123.de",
            "phoneNumber": "01731305011",
            "firstLetterofNames": "KK",
            "color": "rgb(147,39,255)"
        },
        {
            "firstName": "Lukas",
            "lastName": "Lehmann",
            "email": "lukaslehmann@test123.de",
            "phoneNumber": "01731305012",
            "firstLetterofNames": "LL",
            "color": "rgb(147,39,255)"
        },
        {
            "firstName": "Maria",
            "lastName": "Schäfer",
            "email": "mariaschäfer@test123.de",
            "phoneNumber": "01731305013",
            "firstLetterofNames": "MS",
            "color": "rgb(31,215,193)"
        },
        {
            "firstName": "Niklas",
            "lastName": "Köhler",
            "email": "niklasköhler@test123.de",
            "phoneNumber": "01731305014",
            "firstLetterofNames": "NK",
            "color": "rgb(147,39,255)"
        },
        {
            "firstName": "Olivia",
            "lastName": "Klein",
            "email": "oliviaklein@test123.de",
            "phoneNumber": "01731305015",
            "firstLetterofNames": "OK",
            "color": "rgb(31,215,193)"
        }
    ]

async function init() {
    await readServerData();
    removeDuplicateContacts()
    await getUsersintoContacts();
    renderContacts();
}

/**
 * Deletes a contact from the contacts list based on the provided email.
 *
 * @param {string} email - The email of the contact to be deleted.
 * @returns {void}
 */
function deleteContact(email) {
    contactupdated = server.contacts.filter(item => item.email !== email);
    try {
        setItem('contacts', contactupdated).then(() => { ; readServerData();; renderContacts(); });
        console.log('Daten aktualisiert');
    } catch (error) {
        console.error('Error deleting contact', error);
    }
}


/**
 * Retrieves users from a JSON file and adds them to the contacts list.
 * @async
 * @function getUsersintoContacts
 * @returns {Promise<void>} A promise that resolves when the users are added to the contacts list.
 */
async function getUsersintoContacts() {

    try {
        let users = [];
        await readJSON('users', users);
        console.log(users);
        users.forEach(user => {
            if (!contacts.some(contact => contact.email === user.email)) {
                contacts.push({
                    "firstName": user.name.split(' ')[0],
                    "lastName": user.name.split(' ')[1],
                    "email": user.email,
                    "phoneNumber": "",
                    "firstLetterofNames": user.name[0][0] + user.name.split(' ')[1][0],
                    "color": getRandomColor()
                });
            }
        });
        await setItem('contacts', contacts);
        readServerData();
        renderContacts();
    } catch (error) {
        console.error('Loading error:', error);
    }
}


/**
 * Resets the contacts array, deletes contacts from storage, and renders the updated contacts.
 * @returns {void}
 */
function resetContacts() {
    server.contacts = [];
    try {
        setItem('contacts', contactstopush).then(() => { ; readServerData(); renderContacts(); });
    } catch (error) {
        console.error('Error deleting contacts', error);
    }
}


/**
 * Reads server data and renders contacts.
 * @async
 * @function readServerData
 * @returns {Promise<void>} A promise that resolves when the server data is loaded and contacts are rendered.
 */
async function readServerData() {
    try {
        server.updateContacts();
        console.log('Daten geladen:', server.contacts);
        renderContacts(); // Rufe renderContacts auf, NACHDEM die Daten geladen wurden
    } catch (error) {
        console.error('Loading error:', error);
    }
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
        content.innerHTML += `<div class="letter-group">
        <div class="letter-group-first-name">${initial}</div>
        <div>
        <div class="letter-seperator"></div>`;
        groupedContacts[initial].forEach(contact => {
            // removeDuplicateContacts()
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
        content.innerHTML += `</div></div>`;
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
 * Opens the detailed view of a contact.
 * 
 * @param {number} contactId - The ID of the contact.
 */
function openDetailedContactsView(contactId) {
    let content = document.getElementById('detailViewContent');
    content.innerHTML = /*html*/`
                <div class="detail-view-child1">
                    <svg width="120" height="120" viewBox="0 0 42 42" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="42" height="42" rx="21" fill="white" />
                        <circle cx="21" cy="21" r="20" fill="${server.contacts[contactId].color}" stroke="white" stroke-width="2" />
                        <text x="21" class="profile-badge" y="21" text-anchor="middle" dominant-baseline="middle" fill="white">${server.contacts[contactId].firstLetterofNames}</text>
                    </svg>
                    <div class="detail-view-box">
                        <div class="detail-view-name">
                        ${server.contacts[contactId].firstName} ${server.contacts[contactId].lastName}
                        </div>
                        <div class="detail-view-symbols">
                            <p onclick="editContact(${contactId})">Edit</p> <p>Delete</p>
                        </div>
                    </div>
                </div>
                <div class="detail-view-contact-information-text">Contact Information</div>
                <div class="detail-view-contact-email"> Email</div>
                <div id="detailViewEmail" class="detail-view-email">${server.contacts[contactId].email}</div>
                <div class="detail-view-contact-phone">Phone</div>
                <div id="detailViewPhone">${server.contacts[contactId].phoneNumber}</div>`
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
    return {
        "firstName": names[0],
        "lastName": names.slice(1).join(' '),
        "email": email,
        "phoneNumber": phone,
        "firstLetterofNames": names[0][0] + names[1][0],
        "color": getRandomColor()
    };
}


/**
 * Adds a new contact to the contacts array or displays a warning if the contact already exists.
 *
 * @param {number} emailIndex - The index of the contact's email in the contacts array.
 * @param {object} newContact - The new contact object to be added.
 * @returns {void}
 */
function addContactOrWarn(emailIndex, newContact) {
    if (emailIndex === -1) {
        contacts.push(newContact);
        try {
            setItem('contacts', contacts);
            console.log('Daten aktualisiert');
        } catch (error) {
            console.error('Error adding contact', error);
        }
        clearInputFields();
        renderContacts();
    } else {
        alert("Dieser Kontakt ist schon vorhanden");
    }
}


/**
 * Clears the input fields for creating a contact.
 */
function clearInputFields() {
    document.getElementById('create-contact-name-input').value = '';
    document.getElementById('create-contact-email-input').value = '';
    document.getElementById('create-contact-phone-input').value = '';
}


/**
 * Adds a new contact to the contact list.
 */
function addNewContact() {
    let email = document.getElementById('create-contact-email-input').value;
    let emailIndex = findEmailIndex(email);
    let fullName = document.getElementById('create-contact-name-input').value;
    let names = validateFullName(fullName);
    if (!names) return; //"Wenn nicht names wahr ist" (also, wenn names leer oder null ist), dann mache, was danach kommt (in diesem Fall, stoppe die Funktion mit return;).
    let newContact = createNewContact(names, email, document.getElementById('create-contact-phone-input').value);
    addContactOrWarn(emailIndex, newContact);
}


/**
 * Sorts the contacts array by the initial of their first name.
 * If the initials are the same, sorts by the whole first name.
 *
 * @returns {void}
 */
function sortContactsByInitial() {
    detailViewContacts = contacts.sort((a, b) => {
        // Vergleiche die ersten Buchstaben der Vornamen
        const initialA = a.firstName[0].toUpperCase();
        const initialB = b.firstName[0].toUpperCase();

        if (initialA < initialB) {
            return -1;
        }
        if (initialA > initialB) {
            return 1;
        }

        // Wenn die ersten Buchstaben gleich sind, sortiere nach dem ganzen Vornamen
        return a.firstName.toUpperCase().localeCompare(b.firstName.toUpperCase());
    });
}


/**
 * Validates a full name by checking if it contains at least two names.
 * @param {string} fullName - The full name to be validated.
 * @returns {string[]|null} - An array of names if the full name is valid, otherwise null.
 */
function validateFullName(fullName) {
    let names = fullName.trim().split(/\s+/); // Teile den Namen bei einem oder mehreren Leerzeichen
    if (names.length < 2) {
        alert('Bitte geben Sie Vor- und Nachnamen ein.');
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
 * Removes duplicate contacts from the contacts array based on email uniqueness.
 */
function removeDuplicateContacts() {
    const uniqueEmails = new Set();
    const uniqueContacts = contacts.filter(contact => {
        if (!uniqueEmails.has(contact.email)) {
            uniqueEmails.add(contact.email);
            return true;
        }
        return false;
    });

    contacts = uniqueContacts; // Aktualisiere das contacts Array mit den einzigartigen Kontakten
}


document.addEventListener('DOMContentLoaded', () => {
    init();
});
