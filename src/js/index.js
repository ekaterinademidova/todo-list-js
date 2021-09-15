import '../css/reset.scss';
import '../css/styles.scss';
import '../css/modal.scss';
//import { v4 as uuidv4 } from 'uuid';

let todoListArray = [];
let doneListArray = [];
let archListArray = [];

let index = 0;
let statusTabs = 0;
let tabSwitcher = 0;
let statusDropdown = 0;

const btnAddNewItem = document.querySelector('#btnAddNewItem');
const btnShowDoneList = document.querySelector('#btnShowDoneList');

const tabs = document.querySelector('#tabs');
const actuals = document.querySelector(`#actuals`);
const archived = document.querySelector(`#archived`);
const actualsInfo = document.querySelector('#actualsInfo');
const todoList = document.querySelector('#todoList');
const dropdown = document.querySelector('#dropdown');
const dropdownText = document.querySelector('#dropdownText');
const doneList = document.querySelector('#doneList');
const archList = document.querySelector('#archList');

let modal;
const modalRemove = {
    title: 'Удаление элемента списка', 
    width: '400px',
    content: 'Вы собираетесь удалить элемент списка. Восстановить его будет нельзя.',
    footerButtons: [
        {text: 'Отменить', type: 'secondary'},
        {text: 'Удалить', type: 'danger'}
    ]
}

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

function doneItem(id) {
    const itemTodo = todoListArray.find(item => item.id === id);
    todoListArray = todoListArray.filter(item => item.id !== id);
    todo();
    doneListArray.push(itemTodo);
    done();
}

function undoneItem(id) {
    const itemDone = doneListArray.find(item => item.id === id);
    doneListArray = doneListArray.filter(item => item.id !== id);
    done();
    todoListArray.push(itemDone);
    todo();
}

function archItem(id) {
    const itemTodo = todoListArray.find(item => item.id === id);
    todoListArray = todoListArray.filter(item => item.id !== id);
    todo();
    archListArray.push(itemTodo);
    arch();
    deleteModal();
}

function addModal(id) {
    _createModal(modalRemove);
    modal.classList.add('open');
    const cancel = document.querySelector(`#cancel`);
    const eventCancel = () => {
        deleteModal();
        cancel.removeEventListener('click', eventCancel);
    };
    cancel.addEventListener('click', eventCancel);
    const perform = document.querySelector(`#perform`);
    const eventPerform = () => {
        archItem(id);
        perform.removeEventListener('click', eventPerform);
    };
    perform.addEventListener('click', eventPerform);
}

function deleteModal() {
    modal.classList.remove('open');
    //modal.classList.add('hide');
    setTimeout(() => {
        modal.classList.remove('hide');
    }, 200)
    modal.remove();
}

const todoHTML = item => `
    <div class="list__item todo">
        <i id="todo${item.id}" class="far fa-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
        <i class="fas fa-edit"></i>
        <i id="arch${item.id}" data-btn="modalDelete" class="fas fa-trash"></i>
    </div>
`;

const todo = () => {
    if (todoListArray.length) {
        todoListArray = sortByKey(todoListArray, 'id');       
    }
    let html = todoListArray.map(todoHTML).join('');
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
            addModal(todo.id);
        };
        archTodoItem.addEventListener('click', eventArchItem);
    });
};

const doneHTML = item => `
    <div class="list__item done">
        <i id="${item.id}" class="far fa-check-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
    </div>
`;

const done = () => {
    if (doneListArray.length) { 
        doneListArray = sortByKey(doneListArray, 'id');
        dropdown.style.display = 'flex';
        dropdownText.setAttribute('value', doneListArray.length + ' highlighted items');
    }
    else {
        dropdown.style.display = 'none';
    }
    let html = doneListArray.map(doneHTML).join('');
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

const archHTML = item => `
    <div id="${item.id}" class="list__item arch">
        <i class="far fa-minus-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
    </div>
`;

const arch = () => {
    if (archListArray.length) { 
        archListArray = sortByKey(archListArray, 'id');
    }
    let html = archListArray.map(archHTML).join('');
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

function _createModal(options) {
    const DEFAULT_WIDTH = '600px';
    modal = document.createElement('div');
    modal.classList.add('vmodal');
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Окно'}</span>
                </div>
                <div class="modal-body">
                    ${options.content || ''}
                </div>
                <div id="buttons" class="modal-footer">
                    <button id="cancel" class="btn btn-${options.footerButtons[0].type || 'secondary'}">${options.footerButtons[0].text}</button>
                    <button id="perform" class="btn btn-${options.footerButtons[1].type || 'secondary'}">${options.footerButtons[1].text}</button>
                </div>
            </div>
        </div>
    `;
    const container = document.getElementById('container');
    document.body.insertBefore(modal, container);
}