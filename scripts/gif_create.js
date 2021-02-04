/* -------------------------------------------------------------------------- */
/*                                GIF CREATION                                */
/* -------------------------------------------------------------------------- */
let recordInit = document.querySelector('#record-init'),
    recordPermit = document.querySelector('#record-permit'),
    video = document.querySelector('video'),
    rawGif = document.querySelector('#raw-gif'),
    recordSteps = document.querySelectorAll('.step'),
    recordTime = document.querySelector('#record-time'),
    recordRepeat = document.querySelector('#record-repeat'),
    startBtn = document.querySelector('#start-btn'),
    recordBtn = document.querySelector('#record-btn'),
    stopBtn = document.querySelector('#stop-btn'),
    uploadBtn = document.querySelector('#upload-btn');

let recorder, blob;

/* ------------------------------ START BUTTON ----------------------------- */
startBtn.addEventListener('click', event => {
    recordInit.classList.add('hide');
    recordPermit.classList.remove('hide');
    startBtn.classList.add('hide');
    recordSteps[0].classList.add('step-active');

    getStreamAndRecord();

    event.stopPropagation();
});

function getStreamAndRecord() {
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
        recordTime.classList.remove('hide');
        recordTime.innerHTML = '00:00:00';

        recordSteps[0].classList.remove('step-active');
        recordSteps[1].classList.add('step-active');

        video.classList.remove('hide');
        video.srcObject = stream;
        video.play()

        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 1,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: () => {
                console.log('recording started')
            }
        });
    });
}

/* ------------------------------ RECORD BUTTON ----------------------------- */
let timeInterval, seconds = '00',
    minutes = '00',
    hours = '00';

recordBtn.addEventListener('click', event => {
    recordBtn.classList.add('hide');
    stopBtn.classList.remove('hide');

    // console.log(recorder);

    recorder.startRecording();
    timeInterval = setInterval(timer, 1000);

    event.stopPropagation();
});

function timer() {
    if (seconds < 59) {
        seconds++;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
    } else {
        seconds = '00';
        if (minutes < 59) {
            minutes++;
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
        } else {
            minutes = '00';
            hours++;
            if (hours < 10) {
                hours = '0' + hours;
            }
        }
    }
    recordTime.innerHTML = `${hours}:${minutes}:${seconds}`;
}

/* ------------------------------- STOP BUTTON ------------------------------ */
stopBtn.addEventListener('click', event => {
    stopBtn.classList.add('hide');
    uploadBtn.classList.remove('hide');
    recordTime.classList.add('hide');
    recordRepeat.classList.remove('hide');

    recorder.stopRecording(() => {
        blob = recorder.getBlob();

        rawGif.setAttribute('style', `background-image: url(${URL.createObjectURL(blob)})`);
        video.classList.add('hide');
        rawGif.classList.remove('hide');

        console.log(blob);
    });
    clearInterval(timeInterval);

    event.stopPropagation();
})

/* ------------------------ REPEAT RECORD AFTER STOP ------------------------ */
recordRepeat.addEventListener('click', event => {
    //Reset recorder
    recorder.reset();
    //Hide record-repeat link
    recordRepeat.classList.add('hide');
    //Hide pre-rawGif
    rawGif.classList.add('hide');
    //Show video
    video.classList.remove('hide');
    //Reset and show timer
    seconds = '00', minutes = '00', hours = '00';
    recordTime.innerHTML = '00:00:00';
    recordTime.classList.remove('hide');
    //Hide upload-btn
    uploadBtn.classList.add('hide');
    //Show record-btn
    recordBtn.classList.remove('hide');

    event.stopPropagation();
})

/* ------------------------------ UPLOAD BUTTON ----------------------------- */
uploadBtn.addEventListener('click', event => {
    recordSteps[1].classList.remove('step-active');
    recordSteps[2].classList.add('step-active');
    recordRepeat.classList.add('hide');

    rawGif.querySelector('#loading-gif').classList.replace('hide', 'raw-overlay')

    setTimeout(() => {
        rawGif.querySelector('#loading-gif').classList.replace('raw-overlay', 'hide')
        rawGif.querySelector('#uploaded-gif').classList.replace('hide', 'raw-overlay')
    }, 3000);

    uploadBtn.classList.add('hide');
    event.stopPropagation();
})

function subirAGiphy() {
    let formData = new FormData();
    formData.append('file', recordRTC.getBlob(), 'myGif.gif');
    let finalGif = formData.get('file');
    console.log(finalGif);

    fetch(`https://upload.giphy.com/v1/gifs?api_key=${api_key}`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => console.log(data));

    // .then(data => localStorage.setItem('favoritos' + cantidadFavoritosGuardados, data.data.id));
    console.log("Gif subido con éxito");
}