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
let statusEditing;
let titleText;

const addItemText = document.querySelector('#addItemText');
const btnAddNewItem = document.querySelector('#btnAddNewItem');
const btnShowDoneList = document.querySelector('#btnShowDoneList');
const editTitle = document.querySelector('#editTitle');
const cancelEditTitle = document.querySelector('#cancelEditTitle');
const saveEditTitle = document.querySelector('#saveEditTitle');
const title = document.querySelector('#title');
const titleWrap = document.querySelector('#titleWrap');
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
    let text = addItemText.value.trim();
    if (text) {
        let item = {
            id: '_item_' + index++,
            //id: '_d' + uuidv4(),
            text: text
        };
        todoListArray.push(item);
        todo();
    }
    addItemText.value = '';
    addItemText.focus();
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
    statusEditing = false;
    if (todoListArray.length) {
        todoListArray = sortByKey(todoListArray, 'id');       
    }
    let html = todoListArray.map(layouts.todoHTML).join('');
    todoList.innerHTML = html;
    todoListArray.forEach((todo) => {
        const performTodoItem = document.querySelector(`#undone${todo.id}`);
        const eventPerformItem = () => {
            doneItem(todo.id);
            performTodoItem.removeEventListener('click', eventPerformItem);
        };
        performTodoItem.addEventListener('click', eventPerformItem);
        const archTodoItem = document.querySelector(`#arch${todo.id}`);
        const eventArchItem = () => {
            if (!statusEditing) {
                const modal = modals.createModal(modals.remove);
                const perform = document.querySelector(`#perform`);
                const eventPerform = () => {
                    archItem(todo.id);
                    modals.deleteModal(modal);
                    perform.removeEventListener('click', eventPerform);
                };
                perform.addEventListener('click', eventPerform);
            }
        };
        archTodoItem.addEventListener('click', eventArchItem);
        const editTodoItem = document.querySelector(`#edit${todo.id}`);
        const eventEditItem = () => {
            if (!statusEditing) {
                statusEditing = true;
                const itemText = document.querySelector(`#text${todo.id}`);
                const text = itemText.value;
                itemText.removeAttribute('readonly');
                itemText.focus();
                itemText.selectionStart = itemText.value.length;
                const item = document.querySelector(`#${todo.id}`);
                item.classList.add('edit');
                const cancel = () => {
                    item.classList.remove('edit');
                    itemText.setAttribute('readonly', true);
                    statusEditing = false;
                };
                const showBtn = (show) => {
                    const elements = document.getElementsByClassName("list__item todo");
                    for (let i = 0; i < elements.length; i++) {
                        if (show) {
                            elements[i].classList.remove('hide');
                        } else {
                            elements[i].classList.add('hide');
                        }
                    }
                };
                showBtn(false);
                const cancelEdit = document.querySelector(`#cancel${todo.id}`);
                const eventCancelEdit = () => {
                    itemText.value = text;
                    cancel();
                    showBtn(true);
                };
                cancelEdit.addEventListener('click', eventCancelEdit);
                const saveEdit = document.querySelector(`#save${todo.id}`);
                const eventSaveEdit = () => {
                    const index = todoListArray.findIndex((item => item.id === todo.id));
                    todoListArray[index].text = itemText.value;
                    cancel();
                    showBtn(true);
                };
                saveEdit.addEventListener('click', eventSaveEdit);
                itemText.addEventListener('keydown', (event) => {
                    if (event.code == 'Enter') {
                        eventSaveEdit();
                    }
                });
            }
        };
        editTodoItem.addEventListener('click', eventEditItem);
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
        const doneItem = document.querySelector(`#done${done.id}`);
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

addItemText.addEventListener('keydown', (event) => {
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

editTitle.addEventListener('click', () => {
    titleText = title.value;
    title.removeAttribute('readonly');
    title.focus();
    title.selectionStart = title.value.length;
    titleWrap.classList.add('change');
});

const cancelEdit = () => {
    title.value = titleText;
    title.setAttribute('readonly', true);
    titleWrap.classList.remove('change');
};
cancelEditTitle.addEventListener('click', cancelEdit);

const saveEdit = () => {
    titleText = title.value;
    cancelEdit();
};
saveEditTitle.addEventListener('click', saveEdit);

title.addEventListener('keydown', (event) => {
    if (event.code == 'Enter') {
        saveEdit();
    }
});