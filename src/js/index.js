import '../css/reset.scss';
import '../css/styles.scss';
import '../css/modal.scss';
import * as layouts from './layouts'
import * as modals from './modals'
//import { v4 as uuidv4 } from 'uuid';

let todoListArray = [];
let doneListArray = [];
let archListArray = [];

let index = 0;
let statusTabs = 0;
let statusDropdown = 0;

const btnAddNewItem = document.querySelector('#btnAddNewItem');
const btnShowDoneList = document.querySelector('#btnShowDoneList');

const tabs = document.querySelector('#tabs');
const actuals = document.querySelector('#actuals');
const archived = document.querySelector('#archived');
const actualsInfo = document.querySelector('#actualsInfo');
const todoList = document.querySelector('#todoList');
const dropdown = document.querySelector('#dropdown');
const dropdownText = document.querySelector('#dropdownText');
const doneList = document.querySelector('#doneList');
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

const addItem = () => {
    if (!statusTabs) {
        tabs.style.display = 'flex';
        actuals.classList.add('active');
        archList.style.display = 'none';
    }
    const item = document.querySelector('#addItemText');
    let text = item.value.trim();
    if (text) {
        let item = {
            id: '_item_' + index++,
            //id: '_d' + uuidv4(),
            text: text
        };
        todoListArray.push(item);
        todo();
    }
    item.value = '';
    item.focus();
};

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

const todo = () => {
    if (todoListArray.length) {
        todoListArray = sortByKey(todoListArray, 'id');       
    }
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

const done = () => {
    if (doneListArray.length) { 
        doneListArray = sortByKey(doneListArray, 'id');
        dropdown.style.display = 'flex';
        dropdownText.setAttribute('value', doneListArray.length + ' highlighted items');
    }
    else {
        dropdown.style.display = 'none';
    }
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
