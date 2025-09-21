const PatientCard = (patient) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-head">
            <div class="avatar"></div>
            <div>
                <div class="name">${patient.name}</div>
                <div class="email">${patient.email}</div>
            </div>
        </div>
        <div class="info">
            N° phone: <strong>${patient.phone}</strong>
        </div>
        <div class="date-action-row">
            <div class="action-buttons">
                <button class="action-btn edit-btn" data-id="${patient.id}"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="action-btn delete-btn" data-id="${patient.id}"><i class="fa-regular fa-trash-can"></i></button>
            </div>
            <span class="date">${new Date(patient.createdAt).toDateString()}</span>
        </div>
    `;
    return card;
};

export default PatientCard;
