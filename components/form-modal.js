import Input from './input-modal.js';

const Form = ({ fields = [] }) => {

    const form = document.createElement('form');

    const authForm = document.createElement('div');
    authForm.className = 'auth-form';
    form.appendChild(authForm);

    fields.forEach(field => {
        authForm.appendChild(Input(field));
    })
    
    return form;
}

export default Form;