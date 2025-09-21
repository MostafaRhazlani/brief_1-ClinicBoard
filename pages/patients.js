import Form from '../components/form-modal.js';
import Modal from '../components/popup-form-modal.js';
import { setData, getData } from '../localStorage.js';
import PatientCard from '../components/patient-card.js';
import DeletePopup from '../components/delete-popup.js'; // import delete popup

export default function Patients() {
    const container = document.createElement('div');
    container.className = 'content';
    container.innerHTML = `
        <div class="patient-title">
            <h2>Patients</h2>
            <button class="btn add-patient-btn">
                <i class="fa-solid fa-user-plus"></i>
                Add Patient
            </button>
        </div>
        <div class="cards-container"></div>
    `;

    // clear inputs
    const clearInputs = (inputs) => {
        inputs.forEach(input => {
            input.value = "";
        });
    }

    const cardsContainer = container.querySelector('.cards-container');

    // render all patients
    const renderPatients = () => {
        cardsContainer.innerHTML = '';
        const data = getData('clinicApp:data');
        const patients = data && data.patients ? data.patients : [];
        if (patients.length === 0) {
            cardsContainer.innerHTML = '<p>No patients found.</p>';
            return;
        }
        patients.forEach(patient => {
            cardsContainer.appendChild(PatientCard(patient));
        });
    }

    // Initial render
    renderPatients();

    // Create the form for patient creation
    const form = Form({
        fields: [
            { type: "text", id: "patient_name", label: "Patient Name", placeholder: "Enter patient name" },
            { type: "email", id: "patient_email", label: "Email", placeholder: "Enter patient email" },
            { type: "text", id: "patient_phone", label: "Phone Number", placeholder: "Enter phone number" },
            { type: "submit", value: 'Create Patient', className: 'btn' }
        ]
    });

    // Create modal form
    const modal = Modal({ content: form });
    container.appendChild(modal);

    container.querySelector('.add-patient-btn').addEventListener('click', () => {
        modal.open();
    });

    // Handle submit form to store new patient in localstorage
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = form.querySelector('#patient_name');
        const emailInput = form.querySelector('#patient_email');
        const phoneInput = form.querySelector('#patient_phone');

        const name = nameInput.value.trim()
        const email = emailInput.value.trim()
        const phone = phoneInput.value.trim()

        

        
        if (!name || !email || !phone) {
            alert('All fields are required.');
            return;
        }

        let data = getData('clinicApp:data') || {
            patients: [],
            appointments: [],
            cash: {
                receipt: [],
                expense: [],
            },
            authentication: { users: [] }
        };

        let id = data.patients.length +1;

        // // Add new patient
        data.patients.push({
            id,
            name,
            email,
            phone,
            createdAt: new Date().toISOString()
        });

        setData('clinicApp:data', data);

        alert('Patient added!');
        modal.close();
        clearInputs([nameInput, emailInput, phoneInput]);

        // // Re-render patients list
        renderPatients();
    });

    // --- Edit Modal ---
    let editModal = null;
    const showEditModal = (patient) => {

        // Create edit form with patient info
        const editForm = Form({
            fields: [
                { type: "text", id: "edit_patient_name", label: "Patient Name", value: patient.name, placeholder: "Enter patient name" },
                { type: "email", id: "edit_patient_email", label: "Email", value: patient.email, placeholder: "Enter patient email" },
                { type: "text", id: "edit_patient_phone", label: "Phone Number", value: patient.phone, placeholder: "Enter phone number" },
                { type: "submit", value: 'Update Patient', className: 'btn' }
            ]
        });

        editModal = Modal({ content: editForm });
        container.appendChild(editModal);
        editModal.open();

        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = editForm.querySelector('#edit_patient_name').value.trim();
            const email = editForm.querySelector('#edit_patient_email').value.trim();
            const phone = editForm.querySelector('#edit_patient_phone').value.trim();

            if (!name || !email || !phone) {
                alert('All fields are required.');
                return;
            }

            let data = getData('clinicApp:data');

            // Find patient by id and update
            const idx = data.patients.findIndex(p => p.id === patient.id);
            if (idx !== -1) {
                data.patients[idx].name = name;
                data.patients[idx].email = email;
                data.patients[idx].phone = phone;
                setData('clinicApp:data', data);
                alert('Patient updated!');
                editModal.close();
                renderPatients();
            }
        });
    }

    // Handle edit button click to open modal with patient info
    cardsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.edit-btn')) {
            const btn = e.target.closest('.edit-btn');
            const id = parseInt(btn.getAttribute('data-id'));
            const data = getData('clinicApp:data');
            const patient = data.patients.find(patient => patient.id === id);
            if (patient) {
                showEditModal(patient);
            }
        }

        // Handle delete button click to show confirmation popup and delete patient
        if (e.target.closest('.delete-btn')) {
            const btn = e.target.closest('.delete-btn');
            const id = parseInt(btn.getAttribute('data-id'));
            const data = getData('clinicApp:data');

            // Show delete confirmation popup
            const deleteModal = DeletePopup({
                onConfirm: () => {
                    data.patients = data.patients.filter(patient => patient.id !== id);
                    
                    setData('clinicApp:data', data);
                    renderPatients();
                },
            });
            container.appendChild(deleteModal);
            deleteModal.open();
        }
    });

    return container;
}