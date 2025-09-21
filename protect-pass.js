export const encrypt = (pass) => {
    
    let encrypted = "";
    let salt = 3;
    
    for (let i = 0; i < pass.length; i++) {
        encrypted += String.fromCharCode(pass.charCodeAt(i) + salt);
    }

    return encrypted;
}

export const decrypt = (pass) => {
    
    let encrypted = "";
    let salt = 3;
    
    for (let i = 0; i < pass.length; i++) {
        encrypted += String.fromCharCode(pass.charCodeAt(i) - salt);
    }

    return encrypted;
}