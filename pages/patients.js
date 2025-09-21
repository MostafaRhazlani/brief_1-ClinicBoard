import Form from '../components/form-modal.js';
import Modal from '../components/popup-form-modal.js';
import { setData, getData } from '../localStorage.js';

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
        <div class="cards-container">
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
            <div class="card">
                <div class="card-head">
                    <div class="avatar"></div>
                    <div>
                        <div class="name">Alixender</div>
                        <div class="email">alex@gamil.com</div>
                    </div>
                </div>
                <div class="info">
                    N° phone: <strong>0612345678</strong>
                </div>
                <div class="date">Friday, June 26</div>
            </div>
        </div>
    `

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
        const name = form.querySelector('#patient_name').value.trim();
        const email = form.querySelector('#patient_email').value.trim();
        const phone = form.querySelector('#patient_phone').value.trim();

        if (!name || !email || !phone) {
            alert('All fields are required.');
            return;
        }

        let data = getData('clinicApp:data');

        // Add new patient
        data.patients.push({
            name,
            email,
            phone,
            createdAt: new Date().toISOString()
        });

        setData('clinicApp:data', data);

        alert('Patient added!');
        modal.close();

    });

    return container;
}