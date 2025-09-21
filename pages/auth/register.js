import Form from '../../components/form-modal.js';
import { encrypt } from '../../protect-pass.js';
import { setData, getData } from '../../localStorage.js';

const Register = () => {
    const container = document.createElement('div');
    container.className = "auth-container";
    container.innerHTML = `
        <div class="auth-content">
            <div class="logo">
                <img width="60" src="../../img/clinic_logo.png" alt="clinic logo" />
                <span>Cliniva</span>
            </div>
        </div>
    `;

    const authContainer = container.querySelector('.auth-content');
    
    
    const form = Form({
        fields: [
            { type: "text", id: "full_name", label: "Full Name", placeholder: "Enter your full name here" },
            { type: "email", id: "email", label: "Email", placeholder: "Enter your email here" },
            { type: "password", id: "password", label: "Password", placeholder: "Enter your password here" },
            { type: "password", id: "confirm_password", label: "Confirm Password", placeholder: "Confirm your password" },
            { type: "submit", value: 'Register', className: 'btn' }
        ]
    });

    authContainer.appendChild(form);

    const p = document.createElement('p');
    p.textContent = 'Already have account - ';
    const span = document.createElement('span');
    span.textContent = 'Login';
    p.appendChild(span);

    span.addEventListener('click', () => {
        window.navigateTo('/login');
    })

    authContainer.appendChild(p);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const full_name = form.querySelector('#full_name').value;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        const confirm_password = form.querySelector('#confirm_password').value;

        // validation for inputs
        if (!password || !email || !password || !confirm_password) {
            alert('Fields are required.');
            return;
        }
        if (password !== confirm_password) {
            alert('Passwords do not match!');
            return;
        }

        // get exesting data or create new schema
        let data = getData('clinicApp:data') || {
            patients: [],
            appointments: [],
            cash: [],
            authentication: { users: [] }
        };

        // Add user if not exists
        if (data.authentication.users.find(user => user.email === email)) {
            alert('User already exists!');
            return;
        }

        // Add new user
        data.authentication.users.push({ full_name, email, password: encrypt(password) });
        setData('clinicApp:data', data);

        alert('Account created!');
        window.navigateTo('/login');
    });

    return container
}

export default Register