window.onload = function() {
    // Variables
    var nameRegex = /^[a-zA-Z\s]{7,}$/;
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  // According to RFC 5322 Standard
    var pwdRegex = /^[a-zA-Z0-9\s]{8,}$/;
    var ageRegex = /^[0-9]{1,2}$/;
    var telRegex = /^1?[0-9]{7,}$/;
    var addRegex = /^[a-zA-Z0-9\s]{5,}$/;
    var cityRegex = /^[a-zA-Z\s]{3,}$/;
    var idRegex = /^[0-9]{7,8}$/;
    var zipRegex = /^[a-zA-Z0-9]{3,}$/;

    var errorMessages = ['At least 6 characters and space between','Not valid',
    'At least 8 characters, only numbers and letters', 'Passwords do not match',
    'You must be 18 or older', 'At least 7 digits, no spaces, dashes or brackets',
    'At least 5 characters, only letters, numbers and space between','At least 3 characters)',
    'At least 3 characters', 'Not valid, 7 or 8 digits'];

    // Grabing elements
    const inputs = document.querySelectorAll('input');
    const sendBtn = document.querySelector('button[type="submit"]');

    // Functions
    function validInput(input) {
        const value = input.value;
        var checkRes; 
        switch (input.id) {
            case 'name':
                checkRes = (nameRegex.test(value) && /\s/.test(value));
                break;
            case 'email':
                checkRes = emailRegex.test(value);
                break;
            case 'password':
                checkRes = pwdRegex.test(value);
                break;
            case 'password-confirm':
                checkRes = value == document.querySelector('input[id="password"]').value;
                break;
            case 'age':
                checkRes = (ageRegex.test(value) && value >= 18);
                break;
            case 'phone':
                checkRes = telRegex.test(value);
                break;
            case 'address':
                checkRes = (addRegex.test(value) && /\s/.test(value));
                break;
            case 'city':
                checkRes = cityRegex.test(value);
                break;
            case 'zip':
                checkRes = zipRegex.test(value);
                break;
            case 'id':
                checkRes = idRegex.test(value);
                break;
        }
        return checkRes;
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
    function sendCheck(form) {
        var errorString = '';
        var sendString = '';
        for (let index = 0; index < form.length; index++) {
            if (form[index].value === '') {
                setErrorFor(form[index], form[index].id + ' cannot be blank');
            }
            if (form[index].parentElement.classList.contains('error')) {
                errorString += (form[index].previousElementSibling.innerHTML + ': ' + form[index].parentElement.lastElementChild.innerHTML + '\n');
            } else {
                sendString += (form[index].previousElementSibling.innerHTML + ': ' + form[index].value + '\n');
            }
        }
        (errorString.length > 0) ? alert(errorString) : alert(sendString);
    }
    function bonusTrack(input) {
        const bonusTitle = document.getElementById('bonus');
        bonusTitle.className = 'hello show';
        bonusTitle.innerHTML = 'Hello ' + input.value;
        if (input.value === '') {
            bonusTitle.className = 'hello';
        }
    }

    // DOM Manipulation
    for (let index = 0; index < inputs.length; index++) {
        if (index == 0) {
            inputs[index].onkeyup = function (e) {
                e.preventDefault();
                bonusTrack(inputs[index]);
            };
        }
        inputs[index].onblur = function() {
            if (inputs[index].value === '') {
                setErrorFor(inputs[index], inputs[index].id + ' cannot be blank');
            } else if (!validInput(inputs[index])) {
                setErrorFor(inputs[index], errorMessages[index]);
            } else {
                setSuccessFor(inputs[index]);
            }
        };
        inputs[index].onfocus = function() {
            clearInput(inputs[index]);
        };
    }
    sendBtn.onclick = function(e) {
        e.preventDefault();
        sendCheck(inputs);
    };
}