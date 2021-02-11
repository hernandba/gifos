let darkModeBtn = document.querySelector('#dark-mode-btn');

darkModeBtn.addEventListener('click', event => {
    
    document.querySelectorAll('.light-mode').forEach(element => {
        element.classList.toggle('dark-mode');
    })

    document.querySelectorAll('.lit-txt-color').forEach(element => {
        element.classList.toggle('drk-txt-color');
    })
    event.stopPropagation();
})