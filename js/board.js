let todos = [{
    'id': 0,
    'tag': 'User Story',
    'title': 'Dies ist meine erste Aufgabe',
    'task': 'Testtask',
    'subtasksdone': [0, 1],
    'subtasks': ['subtask1', 'subtask2'],
    'date': '08/08/2024',
    'priority': 3,
    'contacts': ['Max Mustermann'],
    'category': 'open'
}, {
    'id': 1,
    'tag': 'Technical Task',
    'title': 'Test ID 1',
    'task': 'Task 1',
    'subtasksdone': [0, 0],
    'subtasks': ['Sub1_1', 'Sub2_1'],
    'date': '08/08/2024',
    'priority': 2,
    'contacts': [],
    'category': 'progress'
}, {
    'id': 2,
    'tag': 'Technical Task',
    'title': 'Test ID 2',
    'task': 'Task 2',
    'subtasksdone': [1, 0],
    'subtasks': ['Sub1_2', 'Sub2_2'],
    'date': '08/08/2024',
    'priority': 2,
    'contacts': [],
    'category': 'feedback'
}, {
    'id': 3,
    'tag': 'User Story',
    'title': 'Test ID 3',
    'task': 'Task 3',
    'subtasksdone': [1, 1, 1, 0, 0, 0],
    'subtasks': ['Sub1_3', 'Sub2_3', 'Sub3_3', 'Sub4_3', 'Sub5_3', 'Sub6_3'],
    'date': '08/08/2024',
    'priority': 3,
    'contacts': [],
    'category': 'done'
}, {
    'id': 4,
    'tag': 'Technical Task',
    'title': 'Test ID 1',
    'task': 'Task 1',
    'subtasksdone': [0, 0],
    'subtasks': ['Sub1_1', 'Sub2_1'],
    'date': '08/08/2024',
    'priority': 2,
    'contacts': [],
    'category': 'progress'
}]



let currentDraggedElement;

function updateHTML() {
    let open = todos.filter(t => t['category'] == 'open');

    document.getElementById('board_open').innerHTML = '';

    for (let index = 0; index < open.length; index++) {
        const element = open[index];
        document.getElementById('board_open').innerHTML += generateTodoHTML(element);
    }
    let inProgress = todos.filter(t => t['category'] == 'progress');

    document.getElementById('board_progress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('board_progress').innerHTML += generateTodoHTML(element);
    }
    let inFeedback = todos.filter(t => t['category'] == 'feedback');

    document.getElementById('board_feedback').innerHTML = '';

    for (let index = 0; index < inFeedback.length; index++) {
        const element = inFeedback[index];
        document.getElementById('board_feedback').innerHTML += generateTodoHTML(element);
    }
    let closed = todos.filter(t => t['category'] == 'done');

    document.getElementById('board_done').innerHTML = '';

    for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        document.getElementById('board_done').innerHTML += generateTodoHTML(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDraggedElement]['category'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function prioritySelector(element) {
    if (element.priority == 0) {
        return ``;
    } else if (element.priority == 1) {
        return `<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.99974 7.24524C8.80031 7.24557 8.60603 7.18367 8.44549 7.06863L0.876998 1.63467C0.778524 1.56391 0.695351 1.47498 0.632227 1.37296C0.569103 1.27094 0.527264 1.15784 0.5091 1.0401C0.472414 0.802317 0.534386 0.560105 0.681381 0.366747C0.828377 0.17339 1.04835 0.0447247 1.29292 0.00905743C1.53749 -0.0266099 1.78661 0.0336422 1.98549 0.176559L8.99974 5.2075L16.014 0.17656C16.1125 0.105795 16.2243 0.0545799 16.3431 0.02584C16.462 -0.00289994 16.5855 -0.00860237 16.7066 0.00905829C16.8277 0.0267189 16.944 0.0673968 17.0489 0.128769C17.1538 0.190142 17.2453 0.271007 17.3181 0.366748C17.3909 0.462489 17.4436 0.571231 17.4731 0.686765C17.5027 0.802299 17.5085 0.922362 17.4904 1.0401C17.4722 1.15784 17.4304 1.27094 17.3672 1.37296C17.3041 1.47498 17.221 1.56391 17.1225 1.63467L9.55398 7.06863C9.39344 7.18367 9.19917 7.24557 8.99974 7.24524Z" fill="#7AE229" />
                <path d="M8.99998 12.0001C8.80055 12.0005 8.60628 11.9386 8.44574 11.8235L0.877242 6.38955C0.678366 6.24664 0.546029 6.03276 0.509344 5.79498C0.472658 5.5572 0.53463 5.31499 0.681625 5.12163C0.828621 4.92827 1.0486 4.79961 1.29317 4.76394C1.53773 4.72827 1.78686 4.78853 1.98574 4.93144L8.99998 9.96239L16.0142 4.93144C16.2131 4.78853 16.4622 4.72827 16.7068 4.76394C16.9514 4.79961 17.1713 4.92827 17.3183 5.12163C17.4653 5.31499 17.5273 5.5572 17.4906 5.79498C17.4539 6.03276 17.3216 6.24664 17.1227 6.38956L9.55423 11.8235C9.39369 11.9386 9.19941 12.0005 8.99998 12.0001Z" fill="#7AE229" />
                </svg>`;
    } else if (element.priority == 2) {
        return `<svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5685 7.16658L1.43151 7.16658C1.18446 7.16658 0.947523 7.06773 0.772832 6.89177C0.598141 6.71581 0.5 6.47716 0.5 6.22831C0.5 5.97947 0.598141 5.74081 0.772832 5.56485C0.947523 5.38889 1.18446 5.29004 1.43151 5.29004L16.5685 5.29004C16.8155 5.29004 17.0525 5.38889 17.2272 5.56485C17.4019 5.74081 17.5 5.97947 17.5 6.22831C17.5 6.47716 17.4019 6.71581 17.2272 6.89177C17.0525 7.06773 16.8155 7.16658 16.5685 7.16658Z" fill="#FFA800" />
                    <path d="M16.5685 2.7098L1.43151 2.7098C1.18446 2.7098 0.947523 2.61094 0.772832 2.43498C0.598141 2.25902 0.5 2.02037 0.5 1.77152C0.5 1.52268 0.598141 1.28403 0.772832 1.10807C0.947523 0.932105 1.18446 0.833252 1.43151 0.833252L16.5685 0.833252C16.8155 0.833252 17.0525 0.932105 17.2272 1.10807C17.4019 1.28403 17.5 1.52268 17.5 1.77152C17.5 2.02037 17.4019 2.25902 17.2272 2.43498C17.0525 2.61094 16.8155 2.7098 16.5685 2.7098Z" fill="#FFA800" />
                </svg>`;
    } else if (element.priority == 3) {
        return `<svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.00026 4.75476C9.19969 4.75443 9.39397 4.81633 9.55451 4.93137L17.123 10.3653C17.2215 10.4361 17.3046 10.525 17.3678 10.627C17.4309 10.7291 17.4727 10.8422 17.4909 10.9599C17.5276 11.1977 17.4656 11.4399 17.3186 11.6333C17.1716 11.8266 16.9516 11.9553 16.7071 11.9909C16.4625 12.0266 16.2134 11.9664 16.0145 11.8234L9.00026 6.7925L1.98602 11.8234C1.88754 11.8942 1.7757 11.9454 1.65687 11.9742C1.53803 12.0029 1.41455 12.0086 1.29345 11.9909C1.17235 11.9733 1.05602 11.9326 0.951088 11.8712C0.846159 11.8099 0.754691 11.729 0.681906 11.6333C0.609122 11.5375 0.556445 11.4288 0.526885 11.3132C0.497325 11.1977 0.491459 11.0776 0.509623 10.9599C0.527789 10.8422 0.569626 10.7291 0.632752 10.627C0.695876 10.525 0.779049 10.4361 0.877524 10.3653L8.44602 4.93137C8.60656 4.81633 8.80083 4.75443 9.00026 4.75476Z" fill="#FF3D00" />
                    <path d="M9.00002 -0.000121266C9.19945 -0.000455511 9.39372 0.0614475 9.55427 0.176482L17.1228 5.61045C17.3216 5.75336 17.454 5.96724 17.4907 6.20502C17.5273 6.4428 17.4654 6.68501 17.3184 6.87837C17.1714 7.07173 16.9514 7.20039 16.7068 7.23606C16.4623 7.27173 16.2131 7.21147 16.0143 7.06856L9.00002 2.03761L1.98577 7.06856C1.78689 7.21147 1.53777 7.27173 1.2932 7.23606C1.04863 7.20039 0.828657 7.07173 0.681662 6.87837C0.534667 6.68501 0.472695 6.4428 0.509379 6.20502C0.546065 5.96723 0.678402 5.75336 0.87728 5.61044L8.44577 0.176482C8.60631 0.0614474 8.80059 -0.000455546 9.00002 -0.000121266Z" fill="#FF3D00" />
                </svg>`;
    }
}

function subTasks(element) {

    let length = element.subtasks.length;

    if (length > 0)
        return `<progress style="width: 120px;" max="${length}" min="0" value="${subTaskscomplete(element.id)}"></progress> ${subTaskscomplete(element.id)}/${length} Subtasks`;
    else
        return ''
}


function subTaskscomplete(id) {

    let subtasksdone = todos[id].subtasksdone;

    let count = 0;
    for (let i = 0; i < subtasksdone.length; i++) {
        if (subtasksdone[i] === 1) {
            count++;
        }
    }
    return count;
}

function generateTodoHTML(element) {
    return /*html*/ `<div class="board_task" draggable="true" ondragstart="startDragging(${element.id})" class="todo" onclick="openDialog(${element.id})">
                    <div class="board_cardcontent">
                        <div class="board_cardtag" ${setTag(element)}>${element.tag}</div>
                        <h3 class="board_task_headline">${element.title}</h3>
                        <p class="board_tasktext">${element.task}</p>
                        <div class="board_cardbar"> ${subTasks(element)}</div>
                        <div class="board_cardbottom">
                            <div class="board_cardcontacts">Kontakte</div>
                            <div class="board prio">${prioritySelector(element)}</div>
                        </div>
                    </div>
                    </div>
                    `;
}




function setTag(element) {
    if (element.tag === 'User Story') {
        return 'style="background-color: #0038FF;"';
    } else if (element.tag === 'Technical Task') {
        return 'style="background-color: #1FD7C1;"';
    } else {
        return '';
    }
}

function setPriority(element) {
    if (element.priority === 0) {
        return 'None';
    } else if (element.priority === 1) {
        return 'Low';
    } else if (element.priority === 2) {
        return 'Medium';
    } else if (element.priority === 3) {
        return 'Urgent';
    } else {
        return '';
    }
}

function openDialog(id) {
    document.getElementById('board_openCard').classList.remove('d-none')
    openCard(id);
}

function closeDialog() {
    document.getElementById('board_openCard').classList.add('d-none');
    updateHTML();
}

function openCard(id) {
    document.getElementById('board_openCard').innerHTML = `
                    <div class="board_taskcard">
                        <div class="board_opencardtag" ${setTag(todos[id])}>
                            <p>${todos[id].tag}</p>
                            <p class="board_cardexit" onclick="closeDialog()">X</p>
                        </div>
                        <div class="board_cardheadline">${todos[id].title}</div>
                        <div class="board_cardtask board_text">${todos[id].task}</div>
                        <div class="board_carddate board_text">Due date: ${todos[id].date}</div>
                        <div class="board_cardprio board_text">Priority: ${setPriority(todos[id])} ${prioritySelector(todos[id])}</div>
                        <div class="board_assigned board_text">
                            <h4>Assigned to:</h4>
                            <!-- Hier kommen die Sachen aus der Funktion contactsLoad die noch erstellt werden muss -->
                            <li class="board_assigneditem">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="21" cy="21" r="20" fill="#1FD7C1" stroke="white" stroke-width="2" />
                                </svg>
                                Dominik Knezovic
                            </li>
                            <li class="board_assigneditem"><svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="21" r="20" fill="#1FD7C1" stroke="white" stroke-width="2"/>
                </svg>
                Dominik Knezovic</li>
                <li class="board_assigneditem"><svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="21" r="20" fill="#1FD7C1" stroke="white" stroke-width="2"/>
                </svg>
                Dominik Knezovic</li>
                        </div>
                        <div class="board_subtasks board_text" id="board_cardsubtasks">
                            <h4>Subtasks</h4></div>
                        <div class="board_deledit">Delete/Edit</div>
                    </div>
                    `;
    generateSubtasks(id);
}



function generateSubtasks(id) {
    todos[id].subtasks.forEach((subtask, index) => {
        const checkbox = document.createElement('input');
        checkbox.className = 'checkbox';
        checkbox.type = 'checkbox';
        checkbox.id = `subtask${index}`;
        checkbox.name = `subtask${index}`;
        checkbox.checked = todos[id].subtasksdone[index] === 1;

        checkbox.addEventListener('change', function () {
            todos[id].subtasksdone[index] = this.checked ? 1 : 0;
        });

        const li = document.createElement('li');
        li.className = 'board_subitem';
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(subtask));

        document.getElementById('board_cardsubtasks').appendChild(li);
    });

}
