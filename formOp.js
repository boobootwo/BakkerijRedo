"use strict";
console.log("script loaded!") /* debug feature */

var prim = '#D8BC69';
var darkPrim = '#bf9d39';
var textColor = '#1e1e20';

/* get elements */
/* nameInput is the <input> tag, nameField is that actual text inside */
const nameInput = document.getElementById('contactform_naam');
const emailInput = document.getElementById('contactform_email');
const telInput = document.getElementById('contactform_tel');
const berichtInput = document.getElementById('contactform_bericht');

var nameField = nameInput.value;
var emailField = emailInput.value;
var telField = telInput.value;
var berichtField = berichtInput.value;

const submitButton = document.getElementById('contactform_verzenden');

/* invalid input text get elements */
/* a _lengtherror is if there are 0 characters in the input field. a _inputerror is if the input field contains slurs or otherwise invalid characters.*/
let naamInput_lengthError = document.getElementById('contactform_naam_leeg');
let naamInput_inputError = document.getElementById('contactform_naam_ongeldig');
let emailInput_lengthError = document.getElementById('contactform_email_leeg');
let emailInput_inputError = document.getElementById('contactform_email_ongeldig');
let telInput_lengthError = document.getElementById('contactform_tel_leeg');
let telInput_inputError = document.getElementById('contactform_tel_ongeldig');
let berichtInput_lengthError = document.getElementById('contactform_bericht_leeg');
let berichtInput_inputError = document.getElementById('contactform_bericht_ongeldig');

/* reparse length of field */
function fieldReparse() {
    nameField = nameInput.value;
    emailField = emailInput.value;
    telField = telInput.value;
    berichtField = berichtInput.value;
}

/* "is empty" setup */
var nameEmpty = false;
var emailEmpty = false;
var telEmpty = false;
var berichtEmpty = false;

submitButton.addEventListener("click", () => fieldReparse());
submitButton.addEventListener("click", () => checkIfEmpty());
/* making it check via click event listener ensures that errors wont show up the minute you open the page, only when you actually interact with the form */

/* "is empty" checkers */
function checkIfEmpty() {
    if (!nameField.length)      { nameEmpty = true ;    setInvalid(nameInput, 'lengthError') }      else { nameEmpty = false ;     clearInvalid(nameInput, 'lengthError') };
    if (!emailField.length)     { emailEmpty = true ;   setInvalid(emailInput, 'lengthError')}      else { emailEmpty = false ;    clearInvalid(emailInput, 'lengthError') };
    if (!telField.length)       { telEmpty = true ;     setInvalid(telInput, 'lengthError')}        else { telEmpty = false ;      clearInvalid(telInput, 'lengthError') };
    if (!berichtField.length)   { berichtEmpty = true ; setInvalid(berichtInput, 'lengthError')}    else { berichtEmpty = false ;  clearInvalid(berichtInput, 'lengthError') };

    console.log(nameEmpty, emailEmpty, telEmpty, berichtEmpty); /* debug feature */
    console.log(nameField.length, emailField.length, telField.length, berichtField.length); /* debug feature */
}

/* invalid input handling */

/* set an error if needed. selector = which field has the error, type = what kind of error, invalid input/field left empty etc */
function setInvalid(selector, type) {
    selector.style.borderColor = "red";                     /* sets border color to red to indicate its invalid */
    var selectorError = (selector.name + 'Input_' + type);  /* combines name of error element and type of error to create a string */
    var referenceVariable = eval(selectorError);            /* said string is used to refer to a variable by the same name; the error text element */
    referenceVariable.style.display = 'initial';            /* make said element appear */
}

function clearInvalid(selector, type) {
    selector.style.borderColor = prim;
    var selectorError = (selector.name + 'Input_' + type);
    var referenceVariable = eval(selectorError);
    referenceVariable.style.display = 'none';
}