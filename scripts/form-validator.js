const form = document.getElementById('contact-form');
const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
const emailInput = document.getElementById('email');
const snumInput = document.getElementById('snum');

const inputs = form.querySelectorAll('input:not([type="submit"])');

form.addEventListener('submit', validate);

inputs.forEach(function (input) {
    input.addEventListener('focus', function () {
        removeErrorMessage(input);
    })
});

function validate(e) {
    inputs.forEach(function (input) {
        removeErrorMessage(input);
    });

    const fname = fnameInput.value.trim();
    const lname = lnameInput.value.trim();
    const email = emailInput.value.trim();
    const snum = snumInput.value.trim();

    let isFormValid = true;

    const sNumPattern = new RegExp("^(a|A)[0-9]{8}$");
    const emailPattern = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

    if (fname === '' || fname === null) {
        isFormValid = false;
        insertErrorMessage(fnameInput, 'Please enter First Name.');
    }

    if (lname === '' || lname === null) {
        isFormValid = false;
        insertErrorMessage(lnameInput, 'Please enter Last Name.');
    }

    if (email === '' || email === null) {
        isFormValid = false;
        insertErrorMessage(emailInput, 'Please enter E-mail.');
    } else if (emailPattern.test(email) === false) {
        isFormValid = false;
        insertErrorMessage(emailInput, 'Please enter a valid E-mail.');
    }

    if (sNumPattern.test(snum)) {
        isFormValid = false;
        insertErrorMessage(sNumInput, 'Please enter a valid Student Number.');
    }

    if (isFormValid === false) {
        e.preventDefault();
        return false;
    } else {
        return true;
    }

}


// Helper Functions

// Insert an error message
function insertErrorMessage(input, errorMessage) {
    const errorEl = document.createElement('span');
    errorEl.innerHTML = errorMessage;
    errorEl.classList.add('error');
    input.parentNode.insertBefore(errorEl, input.nextSibling);
}

// Remove an error message
function removeErrorMessage(input) {
    if (input && input.nextSibling.className === 'error') {
        input.parentNode.removeChild(input.nextSibling);
    }
}