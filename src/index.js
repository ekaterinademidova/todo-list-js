import './css/reset.scss'
import './css/styles.scss'

let todoListArray = []
let doneListArray = []

let index = 0

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]
        var y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })
}

let todoHTML = item => `
    <div class="list__item todo">
        <i id="${item.id}" data-btn="doneItem" class="fas fa-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
    </div>
`

function todo() {
    if (todoListArray) {
        todoListArray = sortByKey(todoListArray, 'id')
        document.querySelector('#list').classList.add('ready')
    }
    let html = todoListArray.map(todoHTML).join('')
    document.querySelector('#todoList').innerHTML = html
}

let doneHTML = item => `
    <div class="list__item done">
        <i id="${item.id}" data-btn="undoneItem" class="fas fa-check-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
    </div>
`
function done() {
    if (doneListArray) {
        doneListArray = sortByKey(doneListArray, 'id')
    }
    let html = doneListArray.map(doneHTML).join('')
    document.querySelector('#doneList').innerHTML = html
}

btnAddItem.onclick = function addItem() {
    let text = document.querySelector('#addItemText').value.trim()
    if (text) {
        let item = {
            id: index++,
            text: text
        }
        todoListArray.push(item)
        todo()
    }
    document.querySelector('#addItemText').value = ''
}

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.id
    const itemTodo = todoListArray.find(item => item.id === id)
    const itemDone = doneListArray.find(item => item.id === id)

    if (btnType === 'doneItem') {
        todoListArray = todoListArray.filter(item => item.id !== id)
        todo()
        doneListArray.push(itemTodo)
        done()
    } else if (btnType === 'undoneItem') {
        doneListArray = doneListArray.filter(item => item.id !== id)
        done()
        todoListArray.push(itemDone)
        todo()
    }
})