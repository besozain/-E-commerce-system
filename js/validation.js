
const validateInput =function (inputElement, errorElement, pattern) {
    if (pattern.test(inputElement.value.trim())) {
        inputElement.style.border = "3px solid green";

        errorElement.style.visibility = "hidden";
    } else {
        inputElement.style.border = "3px solid red";
        inputElement.value = "";
        errorElement.style.visibility = "visible";
        // inputElement.focus();
    }
}

const checkField= function (inputElement, errorElement, pattern) {
    if (!pattern.test(inputElement.value.trim())) {
        inputElement.style.border = "3px solid red";
        errorElement.style.visibility = "visible";
        allValid = false;
    } else {
        inputElement.style.border = "3px solid green";
        errorElement.style.visibility = "hidden";
    }
}