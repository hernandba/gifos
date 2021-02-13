/* -------------------------- MOBILE MENU FUNCTIONS ------------------------- */
let btnHam = document.querySelector('.btn-ham'),
    btnHamClose = document.querySelector('.btn-ham-close'),
    navMenu = document.querySelector('#nav-menu');

btnHam.addEventListener('click', (event) => {
    showNavMenuMob();
    event.stopPropagation();
});

btnHamClose.addEventListener('click', (event) => {
    showNavMenuMob();
    event.stopPropagation();
});

function showNavMenuMob(){
    btnHam.classList.toggle('hide');
    btnHamClose.classList.toggle('hide');
    
    navMenu.classList.toggle('nav-menu-hide');
    navMenu.classList.toggle('nav-menu-show');
}