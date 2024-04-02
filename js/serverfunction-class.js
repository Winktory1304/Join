class ServerFunctions {

    todos = [];
    users = [];
    contacts = [];

    constructor() {
        this.readServerData();
    }

    readServerData() {
        this.todos = [];
        this.users = [];
        this.contacts = [];
        try {
            readJSON('users', this.users);
            readJSON('todos', this.todos);
            readJSON('contacts', this.contacts);
        } catch (error) {
            console.error(error);
        }
    }

    updateBoard() {
        this.contacts = [];
        this.todos = [];
        readJSON('todos', this.todos).then(() => {;updateHTML();});
        readJSON('contacts', this.contacts);
    }

    updateContacts() {
        this.contacts = [];
        readJSON('contacts', this.contacts).then(() => {;renderContacts();});
    }

}