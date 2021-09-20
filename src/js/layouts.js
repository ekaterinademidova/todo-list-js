export const todoHTML = item => `
    <div class="list__item todo">
        <i id="todo${item.id}" class="far fa-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
        <i class="fas fa-edit"></i>
        <i id="arch${item.id}" data-btn="modalDelete" class="fas fa-trash"></i>
    </div>
`;

export const doneHTML = item => `
    <div class="list__item done">
        <i id="${item.id}" class="far fa-check-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
    </div>
`;

export const archHTML = item => `
    <div id="${item.id}" class="list__item arch">
        <i class="far fa-minus-square"></i>
        <input type="text" class="list__item-text" value="${item.text}" readonly>
    </div>
`;