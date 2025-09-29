"use strict";

const openMenu = document.getElementById('openmenu');
const closeMenu = document.getElementById('closemenu');
const menu = document.getElementById('menudiv');

openMenu.addEventListener('click', function () {
    menu.style.display = 'flex';    /* opens mobile menu */
});

closeMenu.addEventListener('click', function () {
    menu.style.display = 'none';    /* closes mobile menu */
});