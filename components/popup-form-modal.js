const Modal = ({ content }) => {
    const modal = document.createElement('div');
    modal.className = 'popup-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn"><i class="fa-regular fa-circle-xmark"></i></button>
        </div>
    `;

    const modalContent = modal.querySelector('.modal-content');
    if (content) modalContent.appendChild(content);

    // close button
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => { modal.style.display = 'none'; };

    // to open and close modal
    modal.open = () => { modal.style.display = 'flex'; };
    modal.close = () => { modal.style.display = 'none'; };

    return modal;
};

export default Modal;
