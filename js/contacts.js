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

function init() {
    let content = document.getElementById('contactsRenderContent');
    content.innerHTML = '';
    for (let contactsIndex = 0; contactsIndex < contacts.length; contactsIndex++) {
        const contact = contacts[contactsIndex];
        content.innerHTML += /*html*/`
                <div class ="contact-box">
                <div class="first-letters-of-names">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="42" height="42" rx="21" fill="white"/>
                        <circle cx="21" cy="21" r="20" fill="${contact.color}" stroke="white" stroke-width="2"/>
                        <text x="21" class="profil-badage" y="21" text-anchor="middle" dominant-baseline="middle" id="" fill="white">${contact.firstLetterofNames}</text>
                    </svg>
                </div>
                <div class="first-and-last-name-box">${contact.firstName} , ${contact.lastName} <br>
                <p class="conatct-box-mail">${contact.email}</p>
                </div>        
            </div>
        `
    }
}

function addNewContact() {
    let name = document.getElementById('create-contact-name-input').value;
    let email = document.getElementById('create-contact-email-input').value;
    let phone = document.getElementById('create-contact-phone-input').value;
    let emailIndex = findEmailIndex(email);
    console.log(emailIndex);
    if (emailIndex === -1) {

    } else {
        window.alert("Dieser Kontakt ist schon vorhanden")
    }

}

function findEmailIndex(email) {
    // Iteriert durch das contacts-Array und sucht nach der E-Mail-Adresse
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].email === email) {
            return i; // Gibt den Index zurück, wenn die E-Mail gefunden wurde
        }
    }
    return -1; // Gibt -1 zurück, wenn die E-Mail nicht gefunden wurde
}