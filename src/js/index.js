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
let selectedTheme = 'light';

const themes = document.querySelector('#themes');
const theme = document.querySelector('#theme');

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
        const x = +a[key].replace(/\D/g,'');
        const y = +b[key].replace(/\D/g,'');
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
};

const undoneItem = (id) => {
    const itemDone = doneListArray.find(item => item.id === id);
    doneListArray = doneListArray.filter(item => item.id !== id);
    done();
    todoListArray.push(itemDone);
    todo();
};

const archItem = (id) => {
    const itemTodo = todoListArray.find(item => item.id === id);
    todoListArray = todoListArray.filter(item => item.id !== id);
    todo();
    archListArray.push(itemTodo);
    arch();
};

const restoreItem = (id) => {
    const itemArch = archListArray.find(item => item.id === id);
    archListArray = archListArray.filter(item => item.id !== id);
    arch();
    todoListArray.push(itemArch);
    todo();
};

const cancel = (item, itemText) => {
    item.classList.remove('edit');
    itemText.setAttribute('readonly', true);
    statusEditing = false;
    showBtn(true);
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

const eventCancelEdit = (item, itemText, text) => {
    itemText.value = text;
    cancel(item, itemText);
};

const eventSaveEdit = (id, item, itemText) => {
    const index = todoListArray.findIndex((item => item.id === id));
    todoListArray[index].text = itemText.value;
    cancel(item, itemText);
};

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
                showBtn(false);

                const cancelEdit = document.querySelector(`#cancel${todo.id}`);
                cancelEdit.addEventListener('click', function(){eventCancelEdit(item, itemText, text)});

                const saveEdit = document.querySelector(`#save${todo.id}`);
                saveEdit.addEventListener('click', function(){eventSaveEdit(todo.id, item, itemText)});

                itemText.addEventListener('keydown', (event) => {
                    if (event.code == 'Enter') {
                        eventSaveEdit(todo.id, item, itemText);
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
    archListArray.forEach((arch) => {
        const archItem = document.querySelector(`#arch${arch.id}`);
        const eventRestoreItem = () => {
            restoreItem(arch.id);
            archItem.removeEventListener('click', eventRestoreItem);
        };
        archItem.addEventListener('click', eventRestoreItem);
    });
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

themes.addEventListener('click', () => {
    if (selectedTheme == 'light') {
        document.documentElement.style.setProperty('--main-bg-color', '#1e1f25');
        document.documentElement.style.setProperty('--main-text-color', '#dadada');
        document.documentElement.style.setProperty('--main-accent-color', '#fff');
        document.documentElement.style.setProperty('--secondary-accent-color', '#7d7d94');
        document.documentElement.style.setProperty('--main-overlay-color', 'rgba(255, 255, 255, 0.2)');
        document.documentElement.style.setProperty('--secondary-overlay-color', 'black');
        theme.classList.remove('fa-moon');
        theme.classList.add('fa-sun');
        selectedTheme = 'dark';
    }
    else {
        document.documentElement.style.setProperty('--main-bg-color', 'white');
        document.documentElement.style.setProperty('--main-text-color', '#575767');
        document.documentElement.style.setProperty('--main-accent-color', 'black');
        document.documentElement.style.setProperty('--secondary-accent-color', '#ebebeb');
        document.documentElement.style.setProperty('--main-overlay-color', 'rgba(0, 0, 0, 0.5)');
        document.documentElement.style.setProperty('--secondary-overlay-color', 'black');
        theme.classList.remove('fa-sun');
        theme.classList.add('fa-moon');
        selectedTheme = 'light';
    }
});
