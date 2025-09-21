import Form from '../components/form-modal.js';
import Modal from '../components/popup-form-modal.js';
import { getData, setData } from '../localStorage.js';

export default function Appoinetments() {
    const container = document.createElement('div');
    container.className = 'content';
    container.innerHTML = `
        <h2>Appoinetments</h2>
        <div class="content-card">
            <div class="card-header">
                <div class="search-box">
                    <span><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" placeholder="Search...">
                </div>
                <button class="btn add-appointment-btn">
                    <i class="fa-solid fa-plus"></i>
                    Add Appointment
                </button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Patient Name</th>
                            <th>Time</th>
                            <th>Email</th>
                            <th>Number Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Abdullah Azudia</td>
                            <td>8:00</td>
                            <td>abdullah@gmail.com</td>
                            <td>0812345678</td>
                            <td><span class="status-badge">Confirmed</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="action-btn edit-btn"><i class="fa-regular fa-pen-to-square"></i></button>
                                    <button class="action-btn delete-btn"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const form = Form({
        fields: [
            { type: "text", id: "appointment_room", label: "Room", placeholder: "Enter room" },
            { type: "text", id: "appointment_type", label: "Type", placeholder: "Enter type" },
            { type: "number", id: "appointment_duration", label: "Duration", placeholder: "Enter duration" },
            { type: "time", id: "appointment_time", label: "Time" },
            { type: "submit", value: 'Create Appointment', className: 'btn' }
        ]
    });

    // append select input before first child
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    formGroup.innerHTML = `
        <label for="appointment_patient">Patient</label>
        <select id="appointment_patient" required>
        </select>
    `
    form.insertBefore(formGroup, form.firstChild);

    // Create modal and pass form as content
    const modal = Modal({ content: form });
    container.appendChild(modal);

    // Show modal on button click
    container.querySelector('.add-appointment-btn').addEventListener('click', () => {

        // Get patients from localStorage
        const data = getData('clinicApp:data') || {
            patients: [],
            appointments: [],
            cash: [],
            authentication: { users: [] }
        };
        const patients = data.patients || [];
        
        // Fill patient select
        const patientSelect = form.querySelector('#appointment_patient');
        patientSelect.innerHTML = '<option value="">Select patient</option>' +
            patients.map(
                p => `<option value="${p.id}">${p.name}</option>`
            ).join('');

        modal.open();
    });

    // Hide modal on form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const patientSelect = form.querySelector('#appointment_patient');
        const roomInput = form.querySelector('#appointment_room');
        const typeInput = form.querySelector('#appointment_type');
        const durationInput = form.querySelector('#appointment_duration');
        const timeInput = form.querySelector('#appointment_time');

        const patientId = patientSelect.value;
        const room = roomInput.value.trim();
        const type = typeInput.value.trim();
        const duration = durationInput.value.trim();
        const time = timeInput.value.trim();

        if (!patientId || !room || !type || !duration || !time) {
            alert('All fields are required.');
            return;
        }

        // Get patient info for display
        const data = getData('clinicApp:data') || {
            patients: [],
            appointments: [],
            cash: [],
            authentication: { users: [] }
        };
        const patient = data.patients.find(p => p.id == patientId);

        // Create appointment object
        let id = data.appointments.length + 1
        const appointment = {
            id,
            patientId,
            patientName: patient.name,
            patientEmail: patient.email,
            patientPhone: patient.phone,
            room,
            type,
            duration,
            time,
            status: 'Confirmed'
        };

        // Add to localStorage
        data.appointments = data.appointments || [];
        data.appointments.push(appointment);
        setData('clinicApp:data', data);

        alert('Appointment created!');
        modal.close();

        // clear form fields
        patientSelect.value = '';
        roomInput.value = '';
        typeInput.value = '';
        durationInput.value = '';
        timeInput.value = '';

    });

    return container;
}