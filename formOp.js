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

/* "is valid" setup */
var nameValid = false;
var emailValid = false;
var telValid = false;
var berichtValid = false;

/* swear checker */
const bannedWords = [ 'poo', 'pee', 'piss', 'ass' ];
function swearCheck(field) {
    return bannedWords.some(bannedWord => field.includes(bannedWord));   // returns true if input field contains a swear listed in bannedWords const
}                                                                        // the scunthorpe problem can go eat my ass

// checks if email is a valid email
function emailCheck(field) {
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(field);
}

// checks if phone number contains numbers only
function telCheck(field) {
    return /^\d+$/.test(field);
    // regex checks string for any non-number characters. returns false if there are
}

/* submitButton.addEventListener("click", () => console.log('bababa ' + telCheck(telInput))); debug feature */


submitButton.addEventListener("click", () => fieldReparse());
submitButton.addEventListener("click", () => checkIfValid());
/* making it check via click event listener ensures that errors wont show up the minute you open the page, only when you actually interact with the form */

/* checks if input field of each category is either empty or contains swears */
function checkIfValid() {

    // clears all errors beforehand before setting them, preventing two errors showing up at the same time (which makes sense, because one error needs to have no characters in the field whereas the other one literally need characters to spell out a slur.)
    clearAllInvalid(nameInput) ; clearAllInvalid(emailInput) ; clearAllInvalid(telInput) ; clearAllInvalid(berichtInput); 

    // vvv check if field is empty                                                                   vvv special regex checks for email and phone number                                                vvv check if field contains swears                                                                      vvv if it is not empty and does not contain swears, change the xEmpty and xSwear variables to false and clear all related errors
    if (!nameField.length)      { nameValid = false ;    setInvalid(nameInput, 'lengthError') }                                                                                                         else if (swearCheck(nameField))      { nameValid = false ; setInvalid(nameInput, 'inputError') }        else { nameValid = true ; clearAllInvalid(nameInput) };
    if (!emailField.length)     { emailValid = false ;   setInvalid(emailInput, 'lengthError') }     else if (!emailCheck(emailField))  { emailValid = false ; setInvalid(emailInput, 'inputError') }   else if (swearCheck(emailField))     { emailValid = false ; setInvalid(emailInput, 'inputError') }      else { emailValid = true ; clearAllInvalid(emailInput) };
    if (!telField.length)       { telValid = false ;     setInvalid(telInput, 'lengthError') }       else if (!telCheck(telField))      { telValid = false ; setInvalid(telInput, 'inputError') }       else if (swearCheck(telField))       { telValid = false ; setInvalid(telInput, 'inputError') }          else { telValid = true ; clearAllInvalid(telInput) };
    if (!berichtField.length)   { berichtValid = false ; setInvalid(berichtInput, 'lengthError') }                                                                                                      else if (swearCheck(berichtField))   { berichtValid = false ; setInvalid(berichtInput, 'inputError') }  else { berichtValid = true ; clearAllInvalid(berichtInput) };
    // if text field is empty, set the corresponding xEmpty value to true and run the function that enables corresponding UI
    // if text field contains swears, set the corresponding xSwear value to true and run the function that enables corresponding UI
    // if text field is not empty nor contains swears, set the corresponding xEmpty value to false and run the function that disables corresponding UI

    // if there are no errors, send the form!
    if (nameValid === true && emailValid === true && telValid === true && berichtValid === true) { sendForm() };
}

function sendForm() {
    console.log("############# FORM RECIEVED #############");
    console.log(nameField + " | " + emailField + " | " + telField);
    console.log(berichtField);
    console.log("##########################################");
}

/* invalid input handling */
/* set an error if needed. selector = which field has the error, type = what kind of error; invalid input/field left empty etc */
function setInvalid(selector, type) {
    selector.style.borderColor = "red";                     /* sets border color to red to indicate its invalid */
    var selectorError = (selector.name + 'Input_' + type);  /* combines name of error element and type of error to create a string */
    var referenceVariable = eval(selectorError);            /* said string is used to refer to a variable by the same name; the error text element */
    referenceVariable.style.display = 'initial';            /* make said element appear */
}

function clearInvalid(selector, type) {
    selector.style.borderColor = prim;                      /* sets border color to default to indicate its valid again */
    var selectorError = (selector.name + 'Input_' + type); 
    var referenceVariable = eval(selectorError);
    referenceVariable.style.display = 'none';               /* make element disappear */
}

function clearAllInvalid(selector) {
    selector.style.borderColor = prim;

    var selectorError_empty = (selector.name + 'Input_lengthError');    // clears "is empty" error
    var referenceVariable_empty = eval(selectorError_empty);
    referenceVariable_empty.style.display = 'none';   

    var selectorError_input = (selector.name + 'Input_inputError');     // clears "contains swears" error
    var referenceVariable_input = eval(selectorError_input);
    referenceVariable_input.style.display = 'none';
}