/* -------------------------- MOBILE MENU FUNCTIONS ------------------------- */
let btnHam = document.querySelector('.btn-ham'),
    navMenu = document.querySelector('#nav-menu');

btnHam.addEventListener('click', (event) => {
    navMenu.classList.toggle('nav-menu-hide');
    navMenu.classList.toggle('nav-menu-show');
    event.stopPropagation();
});