import '../css/reset.scss';
import '../css/styles.scss';
import '../css/modal.scss';

let todoListArray = [];
let doneListArray = [];
let archListArray = [];

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
const archList = document.querySelector('#archList');

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
        <i onclick="doneItem(${item.id})"class="far fa-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
        <i class="fas fa-edit"></i>
        <i onclick="addModal()" class="fas fa-trash"></i>
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
        <i onclick="undoneItem(${item.id})" class="far fa-check-square"></i>
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

const archHTML = item => `
    <div class="list__item arch">
        <i class="fas fa-minus-square"></i>
        <input type="text" class="list__item-text"  value="${item.text}" readonly>
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

// $(".fa-square").click(function (id) {  
//     const itemTodo = todoListArray.find(item => item.id === id);
//     todoListArray = todoListArray.filter(item => item.id !== id);
//     todo();
//     doneListArray.push(itemTodo);
//     done();
// });

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

function addModal() {
    _createModal(modalRemove);
    modal.classList.add('open');
}

function deleteModal() {
    modal.classList.remove('open');
    modal.classList.add('hide');
    setTimeout(() => {
        modal.classList.remove('hide');
    }, 200)
    modal.remove();
}

function deleteItem(id) {
    const itemTodo = todoListArray.find(item => item.id === id);
    todoListArray = todoListArray.filter(item => item.id !== id);
    todo();
    archListArray.push(itemTodo);
    arch();
    deleteModal();
}





// document.addEventListener('click', (event) => {
//     event.preventDefault();
//     const btnType = event.target.dataset.btn;
//     const id = +event.target.id;
//     const itemTodo = todoListArray.find(item => item.id === id);
//     const itemDone = doneListArray.find(item => item.id === id);

//     if (btnType === 'doneItem') {
//         todoListArray = todoListArray.filter(item => item.id !== id);
//         todo();
//         doneListArray.push(itemTodo);
//         done();
//     } else if (btnType === 'undoneItem') {
//         doneListArray = doneListArray.filter(item => item.id !== id);
//         done();
//         todoListArray.push(itemDone);
//         todo();
//     } 
//     else if (btnType === 'remove') {
//         _createModal(modalRemove);
//         modal.classList.add('open')
//     }
//     if (btnType === 'remove-yes') {
//         todoListArray = todoListArray.filter(item => item.id !== id);
//         todo();
//         archListArray.push(itemTodo);
//         arch();
        
//         modal.classList.remove('open');
//         modal.classList.add('hide');
//         setTimeout(() => {
//             modal.classList.remove('hide')
//         }, 200)
//         modal.remove();
//     } else if (btnType === 'remove-no') {
//         modal.classList.remove('open');
//         modal.classList.add('hide');
//         setTimeout(() => {
//             modal.classList.remove('hide')
//         }, 200)
//         modal.remove();
//     }
    
// });

const modalRemove = {
    title: 'Вы уверены, что хотите удалить этот элемент списка?', 
    width: '400px',
    content: 'gfdg',
    footerButtons: [
        {text: 'Отменить', type: 'secondary'},
        {text: 'Удалить', type: 'danger'}
    ]
}

let modal;

function _createModal(options) {
    const DEFAULT_WIDTH = '600px';
    modal = document.createElement('div');
    modal.classList.add('vmodal');
    modal.innerHTML = `
        <div class="modal-overlay"  data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Окно'}</span>
                    <span class="modal-close" data-close="true">&times;</span>
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
                <div class="modal-footer">
                    <button onclick="deleteModal()" class="btn btn-${options.footerButtons[0].type || 'secondary'}">${options.footerButtons[0].text}</button>
                    <button onclick="deleteItem(${item.id})" class="btn btn-${options.footerButtons[1].type || 'secondary'}">${options.footerButtons[1].text}</button>
                </div>
            </div>
        </div>
    `;
    const container = document.getElementById('container');
    document.body.insertBefore(modal, container);
}

// function _createModal() {
//     const modal = document.createElement('div');
//     modal.classList.add('vmodal');
//     modal.insertAdjacentHTML('afterbegin', `
//         <div class="modal-overlay">
//             <div class="modal-window">
//                 <div class="modal-header">
//                     <div class="modal-title">Modal title</div>
//                     <div class="modal-close">&times;</div>
//                 </div>
//                 <div class="modal-body">
//                     <p>Lorem ipsum dolor sit.</p>
//                     <p>Lorem ipsum dolor sit.</p>
//                 </div>
//                 <div class="modal-footer">
//                     <button>Ok</button>
//                     <button>Cancel</button>
//                 </div>
//             </div>
//         </div>
//     `);
//     document.body.appendChild(modal);
//     return modal;
// }

// const modal = _createModal();

    
        // open() {
        //     $modal.classList.add('open');
        // },
        // close() {
        //     $modal.classList.remove('open');
        // },
        // destroy() {
    












//const modal = $.modal()
//console.log(modal);
//modal.open()
//modal.open()


