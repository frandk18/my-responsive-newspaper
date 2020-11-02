// Grabing elements

const sendBtn = document.querySelector('button[type="submit"]');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const pwd = document.querySelector('#pwd');
const pwdc = document.querySelector('#pwdc');
const age = document.querySelector('#age');

var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  // According to RFC 5322 Standard
var pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
var ageRegex = /^[0-9]{1,2}$/;

// Functions

function checkInputs() {
    const nameValue = name.value;
    const emailValue = email.value;
    const pwdValue = pwd.value;
    const pwdcValue = pwdc.value;
    const ageValue = age.value;

    if(nameValue === '') {
        setErrorFor(name, 'Full name cannot be blank');
    } else if(!validName(nameValue)) {
        setErrorFor(name, 'At least 6 characters & space between');
    } else {
        setSuccessFor(name);
    }

    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if(!validEmail(emailValue)) {
        setErrorFor(email, 'Email is not valid');
    } else {
        setSuccessFor(email);
    }

    if(pwdValue === '') {
        setErrorFor(pwd, 'Password cannot be blank');
    } else if(!validPassword(pwdValue)) {
        setErrorFor(pwd, 'At least 8 characters (only numbers & letters)');
    } else {
        setSuccessFor(pwd);
    }
    console.log();
    if(ageValue === '') {
        setErrorFor(age, 'Age cannot be blank');
    } else if(!validAge(ageValue)) {
        setErrorFor(age, 'Age is not valid (you must be 18 or older)');
    } else {
        setSuccessFor(age);
    }
}

function setSuccessFor(input) {
    const formRow = input.parentElement;
    formRow.className = 'form-row success';
}

function setErrorFor(input, message) {
    const formRow = input.parentElement;
    const small = formRow.querySelector('small');

    small.innerText = message;
    formRow.className = 'form-row error';
}

function validName(name) {
    return (name.lenght >= 6 && /\s/.test(name));
}

function validEmail(email) {
    return emailRegex.test(email);
}

function validPassword(pwd) {
    return pwdRegex.test(pwd);
}

function validAge(age) {
    return (ageRegex.test(age) && age >= 18);
}

// DOM Manipulation

sendBtn.addEventListener('click', checkInputs);