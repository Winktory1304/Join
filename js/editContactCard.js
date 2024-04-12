/**
 * Displays a modal by setting its display style to "flex".
 * @param {string} modalId - The ID of the modal element to be displayed.
 */
function showModal(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
    }
}


/**
 * Hides the modal with the specified ID. Applies an exit animation if it's the specific modal.
 * @param {string} modalId - The ID of the modal to hide.
 */
function hideModal(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        if (modalId === 'burgerResponiv') { // Prüfe, ob das zu schließende Modal das spezifische Modal ist
            let modalContent = document.getElementById(modalId + 'Content'); // Annahme: Das Content-Element hat ein 'Content' Suffix in der ID
            modalContent.style.animationName = 'animaterightResponisvOut';  // Startet die Ausgangsanimation für das spezifische Modal

            // Warte die Dauer der Animation (300ms), bevor das Modal ausgeblendet wird
            setTimeout(() => {
                modal.style.display = 'none';  // Verbirgt das Modal nach Ende der Animation
                modalContent.style.animationName = '';  // Entfernt die Animation, um einen Neustart zu ermöglichen
            }, 300);  // Stelle sicher, dass diese Zeit mit der Dauer der CSS-Animation übereinstimmt
        } else {
            modal.style.display = 'none';  // Verbirgt andere Modale sofort ohne Animation
        }
    }
}



/**
 * Sets up event listeners for a modal with the given ID.
 * @param {string} modalId - The ID of the modal element.
 */
function setupModalListeners(modalId) {
    let modal = document.getElementById(modalId);
    let spans = modal.querySelectorAll('.close'); // Annahme: alle Schließ-Buttons verwenden die Klasse 'close'

    spans.forEach(span => {
        span.onclick = function () {
            hideModal(modalId);
        };
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            hideModal(modalId);
        }
    };
}


document.addEventListener('DOMContentLoaded', function () {
    // Setup für den bestehenden Add Contact Button
    let btn = document.getElementById('addContactBtn');
    let modalId = 'contactModal';
    btn.onclick = function () {
        showModal(modalId);
        setupModalListeners(modalId);
    };


    let addContactBtnResponsiv = document.getElementById('addContactBtnResponsiv');
    addContactBtnResponsiv.onclick = function () {
        showModal('responsivAddContact');
        setupModalListeners('responsivAddContact');
    };


    let burgerContactBtnResponsiv = document.getElementById('burgerContactBtnResponsiv');
    burgerContactBtnResponsiv.onclick = function () {
        let modalContent = document.getElementById('burgerResponivContent');
        modalContent.style.animationName = 'animaterightResponisvIn'; // Setzt die Eingangsanimation
        showModal('burgerResponiv');
        setupModalListeners('burgerResponiv');
    };

});



function addContactModalResponiv() {
    let modalId = 'responsivAddContact';
    let btn = document.getElementById('addContactBtnResponsiv');
    btn.onclick = function () {
        showModal(modalId);
        setupModalListeners(modalId);
    };
}



/**
 * Edits a contact.
 * 
 * @param {string} contactId - The ID of the contact to edit.
 * @returns {void}
 */
function editContact() {
    let width = window.innerWidth;
    let modalId = 'editContactCard';
    let contactId
    if (contactsaveid != 0)
        contactId = contactsaveid;

    let contact = detailViewContacts[contactId];
    let content = document.getElementById('editModalContent');
    if (width < 1220) {
        content.innerHTML = /*html*/`
        <div class="responiv-modal-part1">
            <svg class="responsiv-unkown-user" width="120" height="120" viewBox="0 0 134 134" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_576_4834)">
                    <rect x="7" y="7" width="120" height="120" rx="60" fill="white" />
                    <rect x="5.5" y="5.5" width="123" height="123" rx="61.5" stroke="white" stroke-width="3" />
                    <circle cx="67" cy="67" r="60" fill="#D1D1D1" />
                    <mask id="mask0_576_4834" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="35" y="35"
                        width="64" height="64">
                        <rect x="35" y="35" width="64" height="64" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_576_4834)">
                        <path
                            d="M67.0001 67.0001C64.0667 67.0001 61.5556 65.9556 59.4667 63.8667C57.3779 61.7779 56.3334 59.2667 56.3334 56.3334C56.3334 53.4001 57.3779 50.889 59.4667 48.8001C61.5556 46.7112 64.0667 45.6667 67.0001 45.6667C69.9334 45.6667 72.4445 46.7112 74.5334 48.8001C76.6223 50.889 77.6667 53.4001 77.6667 56.3334C77.6667 59.2667 76.6223 61.7779 74.5334 63.8667C72.4445 65.9556 69.9334 67.0001 67.0001 67.0001ZM83.0001 88.3334H51.0001C49.5334 88.3334 48.2779 87.8112 47.2334 86.7668C46.189 85.7223 45.6667 84.4668 45.6667 83.0001V80.8667C45.6667 79.3556 46.0556 77.9667 46.8334 76.7001C47.6112 75.4334 48.6445 74.4667 49.9334 73.8001C52.689 72.4223 55.489 71.389 58.3334 70.7001C61.1779 70.0112 64.0667 69.6667 67.0001 69.6667C69.9334 69.6667 72.8223 70.0112 75.6667 70.7001C78.5112 71.389 81.3112 72.4223 84.0667 73.8001C85.3556 74.4667 86.389 75.4334 87.1667 76.7001C87.9445 77.9667 88.3334 79.3556 88.3334 80.8667V83.0001C88.3334 84.4668 87.8112 85.7223 86.7668 86.7668C85.7223 87.8112 84.4668 88.3334 83.0001 88.3334ZM51.0001 83.0001H83.0001V80.8667C83.0001 80.3779 82.8779 79.9334 82.6334 79.5334C82.389 79.1334 82.0667 78.8223 81.6667 78.6001C79.2668 77.4001 76.8445 76.5001 74.4001 75.9001C71.9556 75.3001 69.489 75.0001 67.0001 75.0001C64.5112 75.0001 62.0445 75.3001 59.6001 75.9001C57.1556 76.5001 54.7334 77.4001 52.3334 78.6001C51.9334 78.8223 51.6112 79.1334 51.3667 79.5334C51.1223 79.9334 51.0001 80.3779 51.0001 80.8667V83.0001ZM67.0001 61.6667C68.4667 61.6667 69.7223 61.1445 70.7668 60.1001C71.8112 59.0556 72.3334 57.8001 72.3334 56.3334C72.3334 54.8667 71.8112 53.6112 70.7668 52.5667C69.7223 51.5223 68.4667 51.0001 67.0001 51.0001C65.5334 51.0001 64.2779 51.5223 63.2334 52.5667C62.189 53.6112 61.6667 54.8667 61.6667 56.3334C61.6667 57.8001 62.189 59.0556 63.2334 60.1001C64.2779 61.1445 65.5334 61.6667 67.0001 61.6667Z"
                            fill="white" />
                    </g>
                </g>
                <defs>
                    <filter id="filter0_d_576_4834" x="0" y="0" width="134" height="134"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                        <feOffset />
                        <feGaussianBlur stdDeviation="2" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_576_4834" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_576_4834"
                            result="shape" />
                    </filter>
                </defs>
            </svg>
        </div>
        <form class="responsiv-contact-modal-form">
            <input class="responsiv-contact-modal-input input-name-img" id="responsivCreateContactNameInput"
                type="text" placeholder="Name">
            <input class="responsiv-contact-modal-input input-email-img" id="responsivCreateContactEmailInput"
                required type="email" placeholder="Email">
            <input class="responsiv-contact-modal-input input-phone-img" id="responsivCreateContactPhoneInput"
                required type="number" placeholder="Phone">
        </form>
        <button class="responsiv-modal-part-3-create-button" onclick="addNewContactResponsiv()">
            Create contact
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_155331_3981" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                    width="24" height="25">
                    <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_155331_3981)">
                    <path
                        d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z"
                        fill="white" />
                </g>
            </svg>
        </button>
    `;

    } else {
        content.innerHTML = /*html*/`
    <div class="modal-part-1">
            <svg class="modalLogo" width="55px" height="66px" viewBox="0 0 102 122" version="1.1"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
                xmlns:serif="http://www.serif.com/"
                style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g id="Summary-user" serif:id="Summary user">
                    <g id="join-logo">
                        <rect id="Vector" x="50.497" y="0" width="22.158" height="25.492"
                            style="fill:white;fill-rule:nonzero;" />
                        <path id="Vector_2"
                            d="M50.497,46.225l22.158,0l0,35.953c0.101,8.651 -2.361,17.137 -7.073,24.379c-4.654,7.037 -13.636,15.409 -30.254,15.409c-18.102,-0 -28.652,-8.56 -34.345,-13.251l13.976,-17.241c5.557,4.537 10.909,8.269 20.454,8.269c7.227,0 10.107,-2.944 11.795,-5.512c2.294,-3.567 3.48,-7.739 3.409,-11.985l-0.12,-36.021Z"
                            style="fill:white;fill-rule:nonzero;" />
                        <rect id="Vector_3" x="17.039" y="30.132" width="22.158" height="22.257"
                            style="fill:rgb(41,171,226);fill-rule:nonzero;" />
                        <path id="Vector_4"
                            d="M84.262,111.522c0,4.743 -2.403,7.293 -5.761,7.293c-3.358,-0 -5.556,-3.03 -5.556,-7.053c-0,-4.023 2.267,-7.208 5.744,-7.208c3.477,-0 5.573,3.133 5.573,6.968Zm-8.744,0.189c0,2.859 1.142,4.964 3.103,4.964c1.96,-0 3.068,-2.225 3.068,-5.136c-0,-2.551 -1.023,-4.947 -3.068,-4.947c-2.046,-0 -3.103,2.311 -3.103,5.119Z"
                            style="fill:white;fill-rule:nonzero;" />
                        <rect id="Vector_5" x="86.205" y="104.76" width="2.454" height="13.833"
                            style="fill:white;fill-rule:nonzero;" />
                        <path id="Vector_6"
                            d="M91.319,118.593l-0,-13.833l2.727,0l2.931,5.701c0.755,1.491 1.427,3.022 2.012,4.588c-0.154,-1.712 -0.222,-3.681 -0.222,-5.872l0,-4.417l2.25,0l-0,13.833l-2.54,0l-2.965,-5.821c-0.785,-1.529 -1.485,-3.101 -2.097,-4.708c0,1.712 0.119,3.647 0.119,6.026l0,4.486l-2.215,0.017Z"
                            style="fill:white;fill-rule:nonzero;" />
                    </g>
                </g>
            </svg>
            <h1>Add contact</h1>
            <div class="modalTaskteam">Task are better with a team!</div>
            <div class="modal-seperator"></div>
        </div>
        <div class="modal-part-2">
        <svg width="120" height="120" viewBox="0 0 42 42" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="42" height="42" rx="21" fill="white" />
                    <circle cx="21" cy="21" r="20" fill="${contact.color}" stroke="white" stroke-width="2" />
                    <text x="21" class="profile-badge" y="21" text-anchor="middle" dominant-baseline="middle" fill="white">${contact.firstLetterofNames}</text>
                </svg>
        </div>
        <div class="modal-part-3">
            <span onclick="closeModal()" class="close">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_156275_4110" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                        width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_156275_4110)">
                        <path
                            d="M12 13.4L7.10005 18.3C6.91672 18.4834 6.68338 18.575 6.40005 18.575C6.11672 18.575 5.88338 18.4834 5.70005 18.3C5.51672 18.1167 5.42505 17.8834 5.42505 17.6C5.42505 17.3167 5.51672 17.0834 5.70005 16.9L10.6 12L5.70005 7.10005C5.51672 6.91672 5.42505 6.68338 5.42505 6.40005C5.42505 6.11672 5.51672 5.88338 5.70005 5.70005C5.88338 5.51672 6.11672 5.42505 6.40005 5.42505C6.68338 5.42505 6.91672 5.51672 7.10005 5.70005L12 10.6L16.9 5.70005C17.0834 5.51672 17.3167 5.42505 17.6 5.42505C17.8834 5.42505 18.1167 5.51672 18.3 5.70005C18.4834 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4834 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4834 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4834 18.1167 18.3 18.3C18.1167 18.4834 17.8834 18.575 17.6 18.575C17.3167 18.575 17.0834 18.4834 16.9 18.3L12 13.4Z"
                            fill="#2A3647" />
                    </g>
                </svg></span>
            <form class="contact-modal-form">
                <input class="contact-modal-input input-name-img" id="edit-contact-name-input" type="text"
                    placeholder="Name">
                <input class="contact-modal-input input-email-img" id="edit-contact-email-input" required
                    type="email" placeholder="Email">
                <input class="contact-modal-input input-phone-img" id="edit-contact-phone-input" required
                    type="number" placeholder="Phone">
            </form>
            <div class="modal-part-3-buttons-container">
                <button class="modal-part-3-cancel-button" onclick="hideModal('editContactCard')">
                    Cancel
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z"
                            stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></button>
                <button class="modal-part-3-create-button" id="saveContactButton">
                    Save
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_155331_3981" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                            width="24" height="25">
                            <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_155331_3981)">
                            <path
                                d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z"
                                fill="white" />
                        </g>
                    </svg>
                </button>
            </div>
        </div>
        `;
    }
    if (width < 1220) {
        document.getElementById('responsivCreateContactNameInput').value = `${contact['firstName']} ${contact['lastName']}`;
        document.getElementById('responsivCreateContactEmailInput').value = `${contact['email']}`;
        document.getElementById('responsivCreateContactPhoneInput').value = `${contact['phoneNumber']}`;
    } else {
        document.getElementById('edit-contact-name-input').value = `${contact['firstName']} ${contact['lastName']}`;
        document.getElementById('edit-contact-email-input').value = `${contact['email']}`;
        document.getElementById('edit-contact-phone-input').value = `${contact['phoneNumber']}`;
        let saveButton = document.getElementById('saveContactButton');
        saveButton.onclick = function () {
            saveContact(contactId);
        };
    }


    showModal(modalId);
    setupModalListeners(modalId);
}




/**
 * Saves the contact with the specified contactId.
 *
 * @param {number} contactId - The ID of the contact to be saved.
 */
function saveContact(contactId) {
    let content = document.getElementById('detailViewContent');
    const firstName = document.getElementById('edit-contact-name-input').value.split(' ')[0];
    const lastName = document.getElementById('edit-contact-name-input').value.split(' ')[1] || ''; // Default zu leer, falls kein Nachname gegeben ist
    const email = document.getElementById('edit-contact-email-input').value;
    const phoneNumber = document.getElementById('edit-contact-phone-input').value;


    if (detailViewContacts[contactId]) {

        detailViewContacts[contactId].firstName = firstName;
        detailViewContacts[contactId].lastName = lastName;
        detailViewContacts[contactId].email = email;
        detailViewContacts[contactId].phoneNumber = phoneNumber;
        init();
        console.log("Kontakt wurde erfolgreich aktualisiert:", detailViewContacts[contactId]);
        hideModal('editContactCard');
        content.innerHTML = '';
    } else {
        console.error('Kontakt mit der ID ' + contactId + ' wurde nicht gefunden.');
    }
}


/**
 * Updates the server with the new contact information.
 * @async
 * @function updateServer
 * @returns {Promise<void>} A promise that resolves when the server update is complete.
 */
async function updateServer() {
    try {
        await setItem('contacts', detailViewContacts); // Aktualisiere den Speicher mit den neuen Daten
        console.log('Kontaktinformationen erfolgreich aktualisiert');
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Kontaktinformationen', error);
    }
}