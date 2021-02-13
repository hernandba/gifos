let darkModeBtn = document.querySelector('#dark-mode-btn'),
    darkModeState;

    //Check for darkMode info on sessionStorage
if (sessionStorage.getItem('darkModeStorage') != null) {
    darkModeState = JSON.parse(sessionStorage.getItem('darkModeStorage'))
    if (darkModeState) {
        changeDarkMode()
    }
} else {
    darkModeState = false;
}

darkModeBtn.addEventListener('click', event => {
    darkModeState = !darkModeState;
    sessionStorage.setItem('darkModeStorage', JSON.stringify(darkModeState));
    changeDarkMode();
    event.stopPropagation();
})

function changeDarkMode() {
    if (darkModeBtn.classList.contains('dark-mode')) {
        darkModeBtn.innerText = 'Modo Nocturno'
    } else {
        darkModeBtn.innerText = 'Modo Diurno'
    }

    document.querySelectorAll('.light-mode').forEach(element => {
        element.classList.toggle('dark-mode');
    })

    document.querySelectorAll('.lit-txt-color').forEach(element => {
        element.classList.toggle('drk-txt-color');
    })
}