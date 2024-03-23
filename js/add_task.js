let todos = [
  {
    id: 0,
    tag: "User Story",
    title: "Titel aus task",
    subtasksdone: [],
    date: "",
    subtasks: [],
    priority: 0,
    contacts: [],
    category: "open",
  },
  {
    id: 0,
    tag: "User Story",
    title: "Titel aus task",
    subtasksdone: [],
    date: "",
    subtasks: [],
    priority: 0,
    contacts: [],
    category: "open",
  },
];

// let todos = [];

function getItems(){
  todos.push(getItems(todos))
}