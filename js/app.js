window.onload = function() {
    // Variables
    var nameRegex = /^[a-zA-Z\s]{7,}$/;
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  // According to RFC 5322 Standard
    var pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    var ageRegex = /^[0-9]{1,2}$/;
    var cityRegex = /^[a-zA-Z\s]{3,}$/;
    var idRegex = /^[0-9]{7,8}$/;
    var zipRegex = /^[A-Za-z0-9]{3,}$/;

    var errorMessages = ['At least 6 characters & space between','Email is not valid',
    'At least 8 characters (only numbers & letters)', 'At least 8 characters (only numbers & letters)',
    'Age is not valid (you must be 18 or older)', 'Phone is not valid',
    'Address is not valid','City is not valid (at least 3 characters)',
    'Zip Code is not valid (at least 3 characters)', '7 or 8 digits'];

    // Grabing elements
    const inputs = document.querySelectorAll('input');
    const sendBtn = document.querySelector('button[type="submit"]');

    // Functions
    function validInput(input) {
        const value = input.value;
        switch (input.id) {
            case 'name':
                return (nameRegex.test(value) && /\s/.test(value));
            case 'email':
                return emailRegex.test(value);
            case 'pwd':
                return pwdRegex.test(value);
            case 'pwdc':
                return pwdRegex.test(value);
            case 'age':
                return (ageRegex.test(value) && value >= 18);
            case 'phone':
                return false;
            case 'address':
                return false;
            case 'city':
                return cityRegex.test(city);
            case 'zip':
                return zipRegex.test(zip);
            case 'id':
                return idRegex.test(id);
        }
    }
    function checkBlanks(inputs) {
        for (let index = 0; index < inputs.length; index++) {
            if (inputs[index].value === "") {
                setErrorFor(inputs[index], inputs[index].id + ' cannot be blank');
                }
            };
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
    function clearInput(input) {
        const formRow = input.parentElement;
        if (formRow.classList.contains('error')) {
            formRow.className = 'form-row';
            input.value = '';
        }
    }

    // DOM Manipulation
    for (let index = 0; index < inputs.length; index++) {
        inputs[index].onblur = function() {
            if (inputs[index].value === '') {
                setErrorFor(inputs[index], inputs[index].id + ' cannot be blank');
            } else if (!validInput(inputs[index])) {
                setErrorFor(inputs[index], errorMessages[index]);
            } else {
                setSuccessFor(inputs[index]);
            }
        };
    }
    for (let index = 0; index < inputs.length; index++) {
        inputs[index].onfocus = function() {
            clearInput(inputs[index]);
        };
    }
    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkBlanks(inputs)
    });
}