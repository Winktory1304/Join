let colors = ["rgb(147,39,255)", "rgb(110,82,255)", "rgb(252,113,255)", "rgb(255,195,69)", "rgb(31,215,193)", "rgb(31,215,193)", "rgb(31,215,193)", "rgb(255,70,70)", "rgb(255,122,0)", "rgb(255,122,0)"
]
let contacts =
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


function init() {
    let groupedContacts = groupContactsByInitial();
    console.log(groupedContacts);
    let content = document.getElementById('contactsRenderContent');
    content.innerHTML = '';
    let counter = 0;
    Object.keys(groupedContacts).sort().forEach(initial => {
        content.innerHTML += `<div class="letter-group">
                                <div class="letter-group-first-name">${initial}</div>
                                <div>
                                <div class="letter-seperator"></div>`;
        groupedContacts[initial].forEach(contact => {
            let contactId = 'contact-' + counter;
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

//Order contacts
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


function openDetailedContactsView(contactId){
    console.log(contactId);

}



let modal = document.getElementById('contactModal');
let btn = document.getElementById('addContactBtn');
let span = document.getElementsByClassName('close')[0];


// When the user clicks anywhere outside of the modal, close it
function addContactModal() {

    modal.style.display = "flex";
}


function closeModal() {
    modal.style.display = "none";
}


window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}


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

function addContactOrWarn(emailIndex, newContact) {
    if (emailIndex === -1) {
        contacts.push(newContact);
        clearInputFields();
        init();
    } else {
        alert("Dieser Kontakt ist schon vorhanden");
    }
}


function clearInputFields() {
    document.getElementById('create-contact-name-input').value = '';
    document.getElementById('create-contact-email-input').value = '';
    document.getElementById('create-contact-phone-input').value = '';
}


function addNewContact() {
    let email = document.getElementById('create-contact-email-input').value;
    let emailIndex = findEmailIndex(email);
    let fullName = document.getElementById('create-contact-name-input').value;
    let names = validateFullName(fullName);
    if (!names) return; //"Wenn nicht names wahr ist" (also, wenn names leer oder null ist), dann mache, was danach kommt (in diesem Fall, stoppe die Funktion mit return;).
    let newContact = createNewContact(names, email, document.getElementById('create-contact-phone-input').value);
    addContactOrWarn(emailIndex, newContact);
}


function validateFullName(fullName) {
    let names = fullName.trim().split(/\s+/); // Teile den Namen bei einem oder mehreren Leerzeichen
    if (names.length < 2) {
        alert('Bitte geben Sie Vor- und Nachnamen ein.');
        return null;
    }
    return names;
}

//Check if email already exists
function findEmailIndex(email) {
    // Iteriert durch das contacts-Array und sucht nach der E-Mail-Adresse
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].email === email) {
            return i; // Gibt den Index zurück, wenn die E-Mail gefunden wurde
        }
    }
    return -1; // Gibt -1 zurück, wenn die E-Mail nicht gefunden wurde
}


function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}


