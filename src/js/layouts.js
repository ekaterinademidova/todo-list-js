export const todoHTML = item => `
    <div id="${item.id}" class="list__item todo">
        <i id="undone${item.id}" class="far fa-square"></i>
        <input id="text${item.id}" type="text" class="list__item-text" value="${item.text}" readonly>
        <i id="edit${item.id}" class="fas fa-edit"></i>
        <i id="arch${item.id}" class="fas fa-trash"></i>
        <i id="cancel${item.id}" class="fas fa-times"></i>
        <i id="save${item.id}" class="fas fa-save"></i>
    </div>
`;

export const doneHTML = item => `
    <div class="list__item done">
        <i id="done${item.id}" class="far fa-check-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
    </div>
`;

export const archHTML = item => `
    <div id="${item.id}" class="list__item arch">
        <i class="far fa-minus-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
        <i id="restore${item.id}" class="fas fa-undo-alt"></i>
    </div>
`;