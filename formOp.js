"use strict";
console.log("script loaded!") /* debug feature */

/* get elements */
/* nameInput is the <input> tag, nameField is that actual text inside */
const nameInput = document.getElementById('contactform_naam');
const emailInput = document.getElementById('contactform_email');
const telInput = document.getElementById('contactform_tel');
const berichtInput = document.getElementById('contactform_bericht');

const nameField = nameInput.value;
const emailField = emailInput.value;
const telField = telInput.value;
const berichtField = berichtInput.value;

const submitButton = document.getElementById('contactform_verzenden');

/* "is empty" setup */
var nameEmpty = false;
var emailEmpty = false;
var telEmpty = false;
var berichtEmpty = false;

/* "is empty" checkers */

submitButton.addEventListener("click", () => checkIfEmpty());
/* making it check via click event listener ensures that errors wont show up the minute you open the page, only when you actually interact with the form */

function checkIfEmpty() {
    if (!nameField.length)      { nameEmpty = true };
    if (!emailField.length)     { emailEmpty = true };
    if (!telField.length)       { telEmpty = true };
    if (!berichtField.length)   { berichtEmpty = true };

    console.log(nameEmpty, emailEmpty, telEmpty, berichtEmpty); /* debug feature */
}