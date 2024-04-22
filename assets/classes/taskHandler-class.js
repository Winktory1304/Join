class Task {
    id;
    title;
    task;
    date;
    priority;
    tag;
    contacts = [];
    subtasks = [];
    status;

    constructor(id, title, task, date,tag, priority, contacts, subtasks, status) {
        this.id = id;
        this.title = title;
        this.task = task;
        this.date = date;
        this.priority = priority;
        this.tag = tag;
        this.contacts = contacts;
        this.subtasks = subtasks;
        this.status = status;
        return this;
    }

}