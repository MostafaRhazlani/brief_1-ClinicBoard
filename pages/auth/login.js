import Form from '../../components/form-modal.js';
import { getData, setData } from '../../localStorage.js';

const  Login = () => {
    const container = document.createElement('div');
    container.className = "auth-container"
    container.innerHTML = `
        <div class="auth-content">
            <div class="logo">
                <img width="60" src="../../img/clinic_logo.png" alt="clinic logo">
                <span>Cliniva</span>
            </div>
        </div>
    `;
    const authContainer = container.querySelector('.auth-content');
    
    
    const form = Form({
        fields: [
            { type: "email", id: "email", label: "Email", placeholder: "Enter your email here" },
            { type: "password", id: "password", label: "Password", placeholder: "Enter your password here" },
            { type: "submit", value: 'Login', className: 'btn' }
        ]
    });

    authContainer.appendChild(form);

    const p = document.createElement('p');
    p.textContent = 'You don\'t have account - ';
    const span = document.createElement('span');
    
    span.textContent = 'Register';
    p.appendChild(span);

    span.addEventListener('click', () => {
        window.navigateTo('/register');
    })

    authContainer.appendChild(p);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        if (!email || !password) {
            alert('Fields are required.');
            return;
        }
        const data = getData('clinicApp:data');
        if (!data || !data.authentication || !data.authentication.users) {
            alert('No users found.');
            return;
        }
        const user = data.authentication.users.find(user => user.email === email && user.password === password);
        if (user) {
            setData('authUser', { full_name: user.full_name, email: user.email });
            alert('Login successful!');
            window.navigateTo('/');
        } else {
            alert('Invalid email or password!');
        }
    });
    
    return container
}

export default Login