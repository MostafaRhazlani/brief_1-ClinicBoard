const Input = ({type = "", placeholder = "", className, value = "", id = "", label = ""}) => {
    
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';

    if(label) {
        const labelEl = document.createElement('label');
        labelEl.htmlFor = id;
        labelEl.innerText = label
        formGroup.appendChild(labelEl);
    }

    const input =  document.createElement('input');
    input.className = className;
    input.type = type;
    input.placeholder = placeholder;
    input.value = value;
    if(id) input.id = id;

    formGroup.appendChild(input);

    return formGroup;
}

export default Input;