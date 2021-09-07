import '../css/reset.scss';
import '../css/styles.scss';

let todoListArray = [];
let doneListArray = [];

let index = 0;
let statusTabs = 0;
let statusDropdown = 0;

const btnAddNewItem = document.querySelector('#btnAddNewItem');
const btnShowDoneList = document.querySelector('#btnShowDoneList');

const tabs = document.querySelector('#tabs');
const todoList = document.querySelector('#todoList');
const dropdown = document.querySelector('#dropdown');
const dropdownText = document.querySelector('#dropdownText');
const doneList = document.querySelector('#doneList');

const sortByKey = (array, key) => 
    array.sort((a, b) => {
        const x = a[key];
        const y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });


const addItem = () => {
    if (!statusTabs) {
        tabs.style.display = 'flex';
    }
    const item = document.querySelector('#addItemText');
    let text = item.value.trim();
    if (text) {
        let item = {
            id: index++,
            text: text
        };
        todoListArray.push(item);
        todo();
    }
    item.value = '';
    item.focus();
};

const todoHTML = item => `
    <div class="list__item todo">
        <i id="${item.id}" data-btn="doneItem" class="far fa-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
    </div>
`;

const todo = () => {
    if (todoListArray.length) {
        todoListArray = sortByKey(todoListArray, 'id');       
    }
    let html = todoListArray.map(todoHTML).join('');
    todoList.innerHTML = html;
};

const doneHTML = item => `
    <div class="list__item done">
        <i id="${item.id}" data-btn="undoneItem" class="far fa-check-square"></i>
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