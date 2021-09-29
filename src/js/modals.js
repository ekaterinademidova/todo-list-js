export const remove = {
    title: 'Removing a list item', 
    width: '400px',
    content: 'You are about to remove a list item. It will be possible to restore it from the list of archived items.',
    footerButtons: [
        {text: 'Cancel', type: 'secondary'},
        {text: 'Delete', type: 'danger'}
    ]
};

export const restore = {
    title: 'Restore a list item', 
    width: '400px',
    content: 'You are about to restore a list item.',
    footerButtons: [
        {text: 'Cancel', type: 'secondary'},
        {text: 'Restore', type: 'danger'}
    ]
};

export const createModal = (options) => {
    const DEFAULT_WIDTH = '600px';
    let modal = document.createElement('div');
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

    setTimeout(() => {
        modal.classList.add('open');
    }, 100)
    const cancel = document.querySelector(`#cancel`);
    const eventCancel = () => {
        deleteModal(modal);
        cancel.removeEventListener('click', eventCancel);
    };
    cancel.addEventListener('click', eventCancel);

    return modal;
};

export const deleteModal = (modal) => {
    modal.classList.add('hide');
    modal.classList.remove('open');
    setTimeout(() => {
        modal.classList.remove('hide');
        modal.remove();
    }, 200)
};