const DeletePopup = ({ onConfirm }) => {
    const modal = document.createElement('div');
    modal.className = 'delete-modal';
    modal.innerHTML = `
        <div class="confirm-delete-content">
            <div class="confirm-message">Are you sure you want to delete this patient?</div>
            <div class="confirm-actions">
                <button class="btn confirm-delete-btn">Delete</button>
                <button class="btn cancel-delete-btn">Cancel</button>
            </div>
        </div>
    `;

    // Cancel button
    modal.querySelector('.cancel-delete-btn').onclick = () => {
        modal.style.display = 'none';
    };
    // Confirm button
    modal.querySelector('.confirm-delete-btn').onclick = () => {
        if (onConfirm) onConfirm();
        modal.style.display = 'none';
    };
    modal.open = () => { modal.style.display = 'flex'; };
    modal.close = () => { modal.style.display = 'none'; };
    return modal;
};

export default DeletePopup;
