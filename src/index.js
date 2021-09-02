import './css/reset.scss'
import './css/styles.scss'

let todoListArray = []
let index = 0
let todoListHTML = ''

let todoItemHTML = (newItem) => `
    <div class="list__item todo">
        <i class="fas fa-square"></i>
        <input type="text" class="list__item-text" value="${newItem.text}" readonly>
        <i class="fas fa-edit"></i>
        <i class="fas fa-trash"></i>
    </div>
` 

addNewItem.onclick = function render() {
    let textItem = document.querySelector('#addItemText').value.trim()
    if (textItem) {
        let newItem = {
            id: index++,
            text: textItem
        }
        todoListArray.push(newItem)
        todoListHTML += todoItemHTML(newItem)
        document.querySelector('#todoList').innerHTML = todoListHTML
    }
    document.querySelector('#addItemText').value = ''
}