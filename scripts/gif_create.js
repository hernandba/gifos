/* -------------------------------------------------------------------------- */
/*                                GIF CREATION                                */
/* -------------------------------------------------------------------------- */
let recordInit = document.querySelector('#record-init'),
    recordPermit = document.querySelector('#record-permit'),
    video = document.querySelector('video'),
    recordSteps = document.querySelectorAll('.step'),
    recordTime = document.querySelector('#record-time'),
    recordRepeat = document.querySelector('#record-repeat'),
    startBtn = document.querySelector('#start-btn'),
    recordBtn = document.querySelector('#record-btn'),
    stopBtn = document.querySelector('#stop-btn'),
    uploadBtn = document.querySelector('#upload-btn');

/* ------------------------------ START BUTTON ----------------------------- */
startBtn.addEventListener('click', event => {
    recordInit.classList.add('hide');
    recordPermit.classList.remove('hide');
    startBtn.classList.add('hide');
    recordSteps[0].classList.add('step-active');
    getStreamAndRecord();
    event.stopPropagation();
});

/* ------------------------------ RECORD BUTTON ----------------------------- */
recordBtn.addEventListener('click', event => {
    recordBtn.classList.add('hide');
    stopBtn.classList.remove('hide');
    recordTime.classList.remove('hide');
    event.stopPropagation();
});

/* ------------------------------- STOP BUTTON ------------------------------ */
stopBtn.addEventListener('click', event => {
    stopBtn.classList.add('hide');
    uploadBtn.classList.remove('hide');
    recordTime.classList.add('hide');
    recordRepeat.classList.remove('hide');
    event.stopPropagation();
})

/* ------------------------------ UPLOAD BUTTON ----------------------------- */
uploadBtn.addEventListener('click', event => {
    recordSteps[1].classList.remove('step-active');
    recordSteps[2].classList.add('step-active');
    uploadBtn.classList.add('hide');
    recordRepeat.classList.add('hide');
    event.stopPropagation();
})

function getStreamAndRecord(){
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {
                max: 480
            }
        }
    }).then(stream => {
        recordPermit.classList.add('hide');
        recordBtn.classList.remove('hide');
        recordSteps[0].classList.remove('step-active');
        recordSteps[1].classList.add('step-active');
        video.classList.remove('hide');
        video.srcObject = stream;
        video.play()
    });
}

// function subirAGiphy() {
//     let formData = new FormData();
//     formData.append('file', recordRTC.getBlob(), 'myGif.gif');
//     let finalGif = formData.get('file');
//     console.log(finalGif);

//     fetch('https://upload.giphy.com/v1/gifs?api_key={inserteAquiSuAPI_KEY}}', {
//         method: 'POST',
//         body: formData
//     })
//     .then(res => res.json())
//     .then(data => localStorage.setItem('favoritos' + cantidadFavoritosGuardados, data.data.id));
//     console.log("Gif subido con éxito");
// }