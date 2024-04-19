class Subtask {
    id;
    done;
    description;

    constructor(id, description) {
        this.id = id;
        this.done = false;
        this.description = description;
        return this;
    }
}