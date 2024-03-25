function importTemplate() {
    importiereHTMLSidebar();
    importiereHTMLHeader();
}

function importiereHTMLSidebar() {

    let importiereSidebar = document.getElementById('generate_sidebar');
    importiereSidebar.innerHTML = /*HTML*/ `

        <div class="sidebar-container">
            <nav class="sidebar">
                <img class="join-logo-sidebar" src="../assets/img/join-logo.svg">
                 <section class="menu-sidebar">
                    <a class="menu-sidebar-button" href="summary.html">
                        <img src="../assets/img/summary.svg">
                        <div>Summary</div>
                    </a>

                     <a class="menu-sidebar-button" href="addtask.html">
                        <img src="../assets/img/addtask.svg">
                        <div>Add Task</div>
                    </a>

                    <a class="menu-sidebar-button" href="board.html">
                        <img src="../assets/img/board.svg">
                        <div>Board</div>
                    </a>

                    <a class="menu-sidebar-button" href="contacts.html">
                        <img src="../assets/img/contacts.svg">
                        <div>Contacts</div>
                    </a>
                </section>

                <section class="footer-sidebar">
                    <a class="footer-sidebar-link" href="">Privacy Policy</a>
                    <a class="footer-sidebar-link" href="">Legal notice</a>
                </section>
            </nav>
        </div>
    `}

function importiereHTMLHeader() {
    let importiereHeader = document.getElementById('generate_header');
    importiereHeader.innerHTML = /*HTML*/ `

        <header class="header">
            <div class="header-title">Kanban Project Management Tool</div>
            <div class="help-user-container">
                <a href="help.html"><img class="help-link" src="../assets/img/help.svg"></a>
                <div class="logged-user-icon" onclick="hierkommteinefuntion()">G</div>
            </div>
        </header>
    `}