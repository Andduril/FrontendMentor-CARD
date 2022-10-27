const nameRegex = new RegExp(/^([^0-9]*)$/, 'i');
const numberRegex = new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/, 'i');
const monthRegex = new RegExp(/(0[1-9]|1[012])/, 'i');
const yearRegex = new RegExp(/([0-9]{2})/, 'i');
const cvcRegex = new RegExp(/[0-9]{3}/, 'i');

const isEmpty = (str) => {
    return !str.trim().length;
}

const getRegex = (inputName) => {
    let result;
    switch (inputName) {
        case 'name':
            result = nameRegex;
            break;
        case 'number':
            result = numberRegex;
            break;
        case 'month':
            result = monthRegex;
            break;
        case 'year':
            result = yearRegex;
            break;
        case 'cvc':
            result = cvcRegex;
            break;
    }

    return result;
}

window.onload = () => {
    const form = document.getElementById("card-form");
    const inputs = form.querySelectorAll('input');
    const submitBtn = document.getElementById('submit-btn');
    const success = document.getElementById('success');

    const checkInputs = (input) => {
        let errorMessage = document.querySelector(`input[name=${input.name}] + .errorMessage`);
        let regex = getRegex(input.name);
        let value = input.value.replace(/ /g, '');

        if (isEmpty(value)) {
            errorMessage.innerHTML = "Can't be blank";
            input.classList.add('error');
            errorMessage.classList.add('show');
            return false;
        } else {
            if (!value.match(regex)) {
                errorMessage.innerHTML = "Wrong format";
                input.classList.add('error');
                errorMessage.classList.add('show');
                return false;
            }

            errorMessage.classList.remove('show');
            input.classList.remove('error');
            return true;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('focusout', () => {
            checkInputs(input);
        })
    })

    submitBtn.addEventListener('click', () => {
        inputs.forEach((input) => {
            if(!checkInputs(input)) {
                return;
            }
        })

        form.classList.add('hide');
        success.classList.add('show');
    })

};