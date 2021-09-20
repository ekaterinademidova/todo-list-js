import '../css/reset.scss';
import '../css/styles.scss';
<<<<<<< HEAD
import '../css/modal.scss';
import * as layouts from './layouts'
import * as modals from './modals'
//import { v4 as uuidv4 } from 'uuid';

let todoListArray = [];
let doneListArray = [];
let archListArray = [];
=======

let todoListArray = [];
let doneListArray = [];
>>>>>>> 13aab49434d7b75dd7a421b449e1b4d910630530

let index = 0;
let statusTabs = 0;
let statusDropdown = 0;

const btnAddNewItem = document.querySelector('#btnAddNewItem');
const btnShowDoneList = document.querySelector('#btnShowDoneList');

const tabs = document.querySelector('#tabs');
<<<<<<< HEAD
const actuals = document.querySelector('#actuals');
const archived = document.querySelector('#archived');
const actualsInfo = document.querySelector('#actualsInfo');
=======
>>>>>>> 13aab49434d7b75dd7a421b449e1b4d910630530
const todoList = document.querySelector('#todoList');
const dropdown = document.querySelector('#dropdown');
const dropdownText = document.querySelector('#dropdownText');
const doneList = document.querySelector('#doneList');
<<<<<<< HEAD
const archList = document.querySelector('#archList');

const sortByKey = (array, key) => 
    array.sort((a, b) => {
        const x = +a[key].replace(/\D/g,'');;
        const y = +b[key].replace(/\D/g,'');;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

const showActuals = () => {
    archived.classList.remove('active');
    actuals.classList.add('active');
    actualsInfo.style.display = 'block';
    archList.style.display = 'none';
};
actuals.addEventListener('click', showActuals);

const showArchived = () => {
    actuals.classList.remove('active');
    archived.classList.add('active');
    actualsInfo.style.display = 'none';
    archList.style.display = 'block';
};
archived.addEventListener('click', showArchived);
=======

const sortByKey = (array, key) => 
    array.sort((a, b) => {
        const x = a[key];
        const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

>>>>>>> 13aab49434d7b75dd7a421b449e1b4d910630530

const addItem = () => {
    if (!statusTabs) {
        tabs.style.display = 'flex';
<<<<<<< HEAD
        actuals.classList.add('active');
        archList.style.display = 'none';
=======
>>>>>>> 13aab49434d7b75dd7a421b449e1b4d910630530
    }
    const item = document.querySelector('#addItemText');
    let text = item.value.trim();
    if (text) {
        let item = {
<<<<<<< HEAD
            id: '_item_' + index++,
            //id: '_d' + uuidv4(),
=======
            id: index++,
>>>>>>> 13aab49434d7b75dd7a421b449e1b4d910630530
            text: text
        };
        todoListArray.push(item);
        todo();
    }
    item.value = '';
    item.focus();
};

<<<<<<< HEAD
const doneItem = (id) => {
    const itemTodo = todoListArray.find(item => item.id === id);
    todoListArray = todoListArray.filter(item => item.id !== id);
    todo();
    doneListArray.push(itemTodo);
    done();
}

const undoneItem = (id) => {
    const itemDone = doneListArray.find(item => item.id === id);
    doneListArray = doneListArray.filter(item => item.id !== id);
    done();
    todoListArray.push(itemDone);
    todo();
}

const archItem = (id) => {
    const itemTodo = todoListArray.find(item => item.id === id);
    todoListArray = todoListArray.filter(item => item.id !== id);
    todo();
    archListArray.push(itemTodo);
    arch();
}
=======
const todoHTML = item => `
    <div class="list__item todo">
        <i id="${item.id}" data-btn="doneItem" class="far fa-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
    </div>
`;
>>>>>>> 13aab49434d7b75dd7a421b449e1b4d910630530

const todo = () => {
    if (todoListArray.length) {
        todoListArray = sortByKey(todoListArray, 'id');       
    }
<<<<<<< HEAD
    let html = todoListArray.map(layouts.todoHTML).join('');
    todoList.innerHTML = html;
    todoListArray.forEach((todo) => {
        const performTodoItem = document.querySelector(`#todo${todo.id}`);
        const eventPerformItem = () => {
            doneItem(todo.id);
            performTodoItem.removeEventListener('click', eventPerformItem);
        };
        performTodoItem.addEventListener('click', eventPerformItem);
        const archTodoItem = document.querySelector(`#arch${todo.id}`);
        const eventArchItem = () => {
            const modal = modals.createModal(modals.remove);
            const perform = document.querySelector(`#perform`);
            const eventPerform = () => {
                archItem(todo.id);
                modals.deleteModal(modal);
                perform.removeEventListener('click', eventPerform);
            };
            perform.addEventListener('click', eventPerform);
        };
        archTodoItem.addEventListener('click', eventArchItem);
    });
};

=======
    let html = todoListArray.map(todoHTML).join('');
    todoList.innerHTML = html;
};

const doneHTML = item => `
    <div class="list__item done">
        <i id="${item.id}" data-btn="undoneItem" class="far fa-check-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
    </div>
`;

>>>>>>> 13aab49434d7b75dd7a421b449e1b4d910630530
const done = () => {
    if (doneListArray.length) { 
        doneListArray = sortByKey(doneListArray, 'id');
        dropdown.style.display = 'flex';
        dropdownText.setAttribute('value', doneListArray.length + ' highlighted items');
    }
    else {
        dropdown.style.display = 'none';
    }
<<<<<<< HEAD
    let html = doneListArray.map(layouts.doneHTML).join('');
    doneList.innerHTML = html;
    doneListArray.forEach((done) => {
        const doneItem = document.querySelector(`#${done.id}`);
        const eventCancelItem = () => {
            undoneItem(done.id);
            doneItem.removeEventListener('click', eventCancelItem);
        };
        doneItem.addEventListener('click', eventCancelItem);
    });
};

const arch = () => {
    if (archListArray.length) { 
        archListArray = sortByKey(archListArray, 'id');
    }
    let html = archListArray.map(layouts.archHTML).join('');
    archList.innerHTML = html;
=======
    let html = doneListArray.map(doneHTML).join('');
    doneList.innerHTML = html;
>>>>>>> 13aab49434d7b75dd7a421b449e1b4d910630530
};

btnAddNewItem.addEventListener('click', () => {
    statusTabs++;
    addItem();
});

document.addEventListener('keydown', (event) => {
    if (event.code == 'Enter') {
        addItem();
    }
});

btnShowDoneList.addEventListener('click', () => {
    if (statusDropdown) {
        btnShowDoneList.classList.remove('fa-chevron-right');
        btnShowDoneList.classList.add('fa-chevron-down');
        doneList.style.display = 'block';
        statusDropdown++;
    }
    else {
        btnShowDoneList.classList.remove('fa-chevron-down');
        btnShowDoneList.classList.add('fa-chevron-right');
        doneList.style.display = 'none';
        statusDropdown--;
    }
});
<<<<<<< HEAD
=======

document.addEventListener('click', (event) => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.id;
    const itemTodo = todoListArray.find(item => item.id === id);
    const itemDone = doneListArray.find(item => item.id === id);

    if (btnType === 'doneItem') {
        todoListArray = todoListArray.filter(item => item.id !== id);
        todo();
        doneListArray.push(itemTodo);
        done();
    } else if (btnType === 'undoneItem') {
        doneListArray = doneListArray.filter(item => item.id !== id);
        done();
        todoListArray.push(itemDone);
        todo();
    }
});
>>>>>>> 13aab49434d7b75dd7a421b449e1b4d910630530
