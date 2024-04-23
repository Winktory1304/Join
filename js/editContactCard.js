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
        if (modalId === 'burgerResponiv') {
            let modalContent = document.getElementById(modalId + 'Content');
            modalContent.style.animationName = 'animaterightResponisvOut';
            setTimeout(() => {
                modal.style.display = 'none';
                modalContent.style.animationName = '';
            }, 300);
        } else {
            modal.style.display = 'none';
        }
    }
}


/**
 * Sets up event listeners for a modal.
 * @param {string} modalId - The ID of the modal element.
 */
function setupModalListeners(modalId) {
    let modal = document.getElementById(modalId);
    if (!modal) return;
    let modalContent = modal.querySelector('.modal-content');
    if (!modalContent) modalContent = modal;
    window.onclick = function (event) {
        if (event.target == modal) {
            hideModal(modalId);
        }
    };
    let closeButtons = modal.querySelectorAll('.close, .close-responsiv');
    closeButtons.forEach(btn => {
        btn.onclick = function () {
            hideModal(modalId);
        };
    });
}


document.addEventListener('DOMContentLoaded', function () {
    let btn = document.getElementById('addContactBtn');
    let modalId = 'contactModal';
    btn.onclick = function () {
        showModal(modalId);
        setupModalListeners(modalId);
    };
    

    /**
     * Represents the burger contact button in the responsive view.
     * @type {HTMLElement}
     */
    let burgerContactBtnResponsiv = document.getElementById('burgerContactBtnResponsiv');
    burgerContactBtnResponsiv.onclick = function () {
        showModal('burgerResponiv');
        setupModalListeners('burgerResponiv');
    };


    /**
     * Adds a contact modal for the responsive view.
     */
    function addContactModalResponiv() {
        let modalId = 'contactModal';
        let btn = document.getElementById('addContactBtnResponsiv');
        btn.onclick = function () {
            showModal(modalId);
            setupModalListeners(modalId);
        };
    }
    addContactModalResponiv();
});


/**
 * Edits a contact based on the current window width and contact information.
 */
function editContact() {    
    let modalId = 'editContactCard';
    let contactId = contactsaveid;
    let contact = detailViewContacts[contactId];
    let content = document.getElementById('editModalContent');
        hideModal('burgerResponiv')
        editContactDesktopHtml(content, contact, contactId);
        setupModalListeners(modalId);
        removeResponivContactsOverview()
        saveFunctionDesktop(contact, contactId, modalId);
    
}


/**
 * Highlights the contact box with the specified contactId.
 * Removes highlight from all other contact boxes.
 *
 * @param {string} contactId - The ID of the contact box to highlight.
 */
function highlightContactBox(contactId) {
    document.querySelectorAll('.contact-box').forEach(box => {
        box.classList.remove('contact-box-highlight');
    });

    const selectedContactBox = document.getElementById(contactId);
    if (selectedContactBox) {
        selectedContactBox.classList.add('contact-box-highlight');
    }
}


/**
 * Updates the SVG container with a new SVG based on the provided contact information.
 * @param {Object} contact - The contact object containing information for generating the SVG.
 * @param {string} contact.color - The color of the circle in the SVG.
 * @param {string} contact.firstLetterofNames - The first letter of the contact's names.
 */
function updateSVG(contact) {
    const svgHTML = /*html*/`
        <svg class="responsiv-unkown-user" width="120" height="120" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="42" height="42" rx="21" fill="white" />
            <circle cx="21" cy="21" r="20" fill="${contact.color}" stroke="white" stroke-width="2" />
            <text x="21" class="profile-badge" y="21" text-anchor="middle" dominant-baseline="middle" fill="white">${contact.firstLetterofNames}</text>
        </svg>
    `;
    document.getElementById('svgContainer').innerHTML = svgHTML;
}


/**
 * Renders the HTML content for editing a contact card in a desktop view.
 *
 * @param {HTMLElement} content - The container element where the HTML content will be rendered.
 * @param {Object} contact - The contact object containing information about the contact.
 * @param {string} contactId - The ID of the contact.
 * @returns {void}
 */
function editContactDesktopHtml(content, contact, contactId) {
    content.innerHTML = /*html*/ `
            <div class="modal-part-1">
                <span onclick="closeModal()" class="close-responsiv">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_156275_4110" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                            width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_156275_4110)">
                            <path
                                d="M12 13.4L7.10005 18.3C6.91672 18.4834 6.68338 18.575 6.40005 18.575C6.11672 18.575 5.88338 18.4834 5.70005 18.3C5.51672 18.1167 5.42505 17.8834 5.42505 17.6C5.42505 17.3167 5.51672 17.0834 5.70005 16.9L10.6 12L5.70005 7.10005C5.51672 6.91672 5.42505 6.68338 5.42505 6.40005C5.42505 6.11672 5.51672 5.88338 5.70005 5.70005C5.88338 5.51672 6.11672 5.42505 6.40005 5.42505C6.68338 5.42505 6.91672 5.51672 7.10005 5.70005L12 10.6L16.9 5.70005C17.0834 5.51672 17.3167 5.42505 17.6 5.42505C17.8834 5.42505 18.1167 5.51672 18.3 5.70005C18.4834 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4834 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4834 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4834 18.1167 18.3 18.3C18.1167 18.4834 17.8834 18.575 17.6 18.575C17.3167 18.575 17.0834 18.4834 16.9 18.3L12 13.4Z"
                                fill="white" />
                        </g>
                    </svg>
                </span>
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
                <div class="contact-h1"> 
                    Edit contact
                </div>        
                <div class="modal-seperator"></div>
                <svg  class="profil-picture-modal-responsiv d-none" width="120" height="120" viewBox="0 0 42 42" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="42" height="42" rx="21" fill="white" />
                    <circle cx="21" cy="21" r="20" fill="${contact.color}" stroke="white" stroke-width="2" />
                    <text x="21" class="profile-badge" y="21" text-anchor="middle" dominant-baseline="middle" fill="white">${contact.firstLetterofNames}</text>
                </svg>
            </div>
            <div class="modal-part-2">
            <svg class="profil-picture-modal" width="120" height="120" viewBox="0 0 42 42" fill="none"
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
                    </svg>
                </span>
                <form id="contactFormDesktop" class="contact-modal-form">
                    <input class="contact-modal-input input-name-img" id="edit-contact-name-input" type="text" required
                        placeholder="Name">
                    <input class="contact-modal-input input-email-img" id="edit-contact-email-input" required
                        type="email" placeholder="Email">
                    <input class="contact-modal-input input-phone-img" id="edit-contact-phone-input" 
                        type="number" placeholder="Phone">
                    <div class="modal-part-3-buttons-container">
                        <button class="modal-part-3-cancel-button" onclick="hideModal('editContactCard'); deleteContactById(${contactId})">
                            Delete
                            <svg class="edit-svg" width="24" height="25" viewBox="0 0 24 25"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z"
                                    stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg></button>
                        <button type="submit" class="modal-part-3-create-button">
                            Save
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_155331_3981" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="25">
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
                </form>
            </div>  
        `;
}


    /**
     * Saves the contact information and displays a modal.
     * 
     * @param {object} contact - The contact object containing the contact information.
     * @param {string} contactId - The ID of the contact.
     * @param {string} modalId - The ID of the modal to be displayed.
     */
    function saveFunctionDesktop(contact, contactId, modalId) {
    document.getElementById('edit-contact-name-input').value = `${contact['firstName']} ${contact['lastName']}`;
    document.getElementById('edit-contact-email-input').value = `${contact['email']}`;
    document.getElementById('edit-contact-phone-input').value = `${contact['phoneNumber']}`;
    let form = document.getElementById('contactFormDesktop');
    form.onsubmit = function (event) {
        event.preventDefault();  
        saveContact(contactId);
    };
    showModal(modalId);
}


/**
 * Saves the contact information.
 */
function saveContact() {
    let contactId = contactsaveid;
    let content = document.getElementById('detailViewContent');
    const firstName = document.getElementById('edit-contact-name-input').value.split(' ')[0];
    const lastName = document.getElementById('edit-contact-name-input').value.split(' ')[1] || '';
    const email = document.getElementById('edit-contact-email-input').value;
    const phoneNumber = document.getElementById('edit-contact-phone-input').value;

    if (detailViewContacts[contactId]) {
        
        let nameChanged = firstName !== detailViewContacts[contactId].firstName || lastName !== detailViewContacts[contactId].lastName;
        detailViewContacts[contactId].firstName = firstName;
        detailViewContacts[contactId].lastName = lastName;
        detailViewContacts[contactId].email = email;
        detailViewContacts[contactId].phoneNumber = phoneNumber;

        if (nameChanged) {
            
            let newInitials = `${firstName[0]}${lastName[0]}`;
            detailViewContacts[contactId].firstLetterofNames = newInitials;
            updateSVG(detailViewContacts[contactId]); 
        }
        init();
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
    await setItem('contacts', detailViewContacts);
}


/**
 * Adds a new contact to the contacts array or displays a warning if the contact already exists.
 * @param {number} emailIndex - The index of the contact's email in the contacts array.
 * @param {object} newContact - The new contact object to be added.
 * @returns {void}
 */
async function addContactOrWarn(emailIndex, newContact) {
    if (emailIndex === -1) {
        contacts.push(newContact);
        await setItem('contacts', contacts);
        renderContacts();
        createContactPopup();
    } else {
        return;
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
 * Shows the responsive detail view for contacts.
 */
function showResponsivDetail() {
    document.getElementById('responsivContactsOverview').classList.add('responisv-contacts-overview');
    document.getElementById('responsivContactsOverview').classList.remove('d-none');
    document.getElementById('responsivContactsOverview').classList.add('dispplay-flex');
    document.getElementById('contactsContent').classList.add('contacts-content-dnone');
    document.getElementById('addContactBtnResponsiv').classList.add('d-none');
    document.getElementById('burgerContactBtnResponsiv').classList.remove('d-none');
}


/**
 * Removes the responsive behavior from the contacts overview.
 */
function removeResponivContactsOverview() {
    let content = document.getElementById('detailViewContent');
    content.classList.remove('detail-view-content-responsiv');
    content.classList.remove('dispplay-flex');
    document.getElementById('contactsContent').classList.remove('contacts-content-dnone');
    document.getElementById('addContactBtnResponsiv').classList.remove('d-none');
    document.getElementById('burgerContactBtnResponsiv').classList.add('d-none');
    document.getElementById('responsivContactsOverview').classList.add('d-none');
    document.getElementById('responsivContactsOverview').classList.remove('dispplay-flex');
    document.querySelectorAll('.contact-box').forEach(box => {
        box.classList.remove('contact-box-highlight');
    });
}