import './css/reset.scss'
import './css/styles.scss'

let todoListArray = []
let doneListArray = []
const dropdownText = ' highlighted items'

let index = 0
let status = 0

const sortByKey = (array, key) => 
    array.sort((a, b) => {
        const x = a[key]
        const y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
    })

const todoHTML = item => `
    <div class="list__item todo">
        <i id="${item.id}" data-btn="doneItem" class="fas fa-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
    </div>
`

const todo = () => {
    if (todoListArray) {
        todoListArray = sortByKey(todoListArray, 'id')       
        document.querySelector('#tabs').style.display = 'flex'
    }
    let html = todoListArray.map(todoHTML).join('')
    document.querySelector('#todoList').innerHTML = html
}

const doneHTML = item => `
    <div class="list__item done">
        <i id="${item.id}" data-btn="undoneItem" class="fas fa-check-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
    </div>
`
const done = () => {
    if (doneListArray.length) { 
        doneListArray = sortByKey(doneListArray, 'id') 
        document.querySelector('#dropdown').style.display = 'flex'
        document.querySelector('#dropdownText').setAttribute('value', doneListArray.length + dropdownText)
    }
    else {
        document.querySelector('#dropdown').style.display = 'none'
    }
    let html = doneListArray.map(doneHTML).join('')
    document.querySelector('#doneList').innerHTML = html
}

btnAddNewItem.addEventListener('click', () => {
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
})

btnShowDoneList.addEventListener('click', () => {
    if (status) {
        document.querySelector('#btnShowDoneList').classList.remove('fa-chevron-right')
        document.querySelector('#btnShowDoneList').classList.add('fa-chevron-down')
        document.querySelector('#doneList').style.display = 'block'
        status++
    }
    else {
        document.querySelector('#btnShowDoneList').classList.remove('fa-chevron-down')
        document.querySelector('#btnShowDoneList').classList.add('fa-chevron-right')
        document.querySelector('#doneList').style.display = 'none'
        status--
    }
})

document.addEventListener('click', (event) => {
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