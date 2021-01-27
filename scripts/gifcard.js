/* -------------------------------------------------------------------------- */
/*                       GIFCARD CREATION AND FUNCTIONS                       */
/* -------------------------------------------------------------------------- */
let gifCard = document.querySelector('.gifcard');

let favGifs;
if (localStorage.length > 0) {
    console.log('Si habia inf en localStorage');
    favGifs = JSON.parse(localStorage.getItem('favGifsStorage'));
    console.log(favGifs);
} else {
    console.log('No habia info en localStorage');
    favGifs = [];
}

function createGifcards(apiData, gifcardsContainer) {
    apiData.forEach(element => {
        let gifId = element.id;
        let gifUser = element.username;
        let gifTitle = element.title;
        let gifDisplay = element.images.downsized.url || element.display;
        let gifDownlink = element.images.original.url || element.downlink;

        let newGifcard = document.createElement('div');
        newGifcard.setAttribute('class', 'gifcard');
        newGifcard.innerHTML = gifCard.innerHTML;

        newGifcard.querySelector('#gifId').innerText = gifId;

        // newGifcard.setAttribute('style', `width: ${gifcardWidth}; height:${gifcardHeight}; background-image: url(${element.images.downsized.url})`);
        newGifcard.setAttribute('style', `background-image: url(${gifDisplay})`);
        newGifcard.querySelector('.gifcard-max-gifimg').setAttribute('src', gifDisplay);

        newGifcard.querySelectorAll('.gifcard-info-user').forEach(k => k.innerText = gifUser);
        newGifcard.querySelectorAll('.gifcard-info-title').forEach(k => k.innerText = gifTitle);

        newGifcard.querySelectorAll('.gifcard-down-link').forEach(k => {
            k.setAttribute('data-href', gifDownlink);
            k.setAttribute('download', gifTitle);
        });

        if (favGifs.length > 0) {
            favGifs.forEach(j => {
                if (j.id === gifId) {
                    newGifcard.querySelectorAll('.btn-fav').forEach(k => k.classList.remove('fav-inactive'))
                    newGifcard.querySelectorAll('.btn-fav').forEach(k => k.classList.add('fav-active'))
                }
            })
        }

        // // newGifcard.setAttribute('style', `width: ${gifcardWidth}; height:${gifcardHeight}; background-image: url(${element.images.downsized.url})`);
        // newGifcard.setAttribute('style', `background-image: url(${element.images.downsized.url})`);
        // newGifcard.querySelector('.gifcard-max-gifimg').setAttribute('src', element.images.downsized.url);

        // newGifcard.querySelectorAll('.gifcard-info-user').forEach(k => k.innerText = element.username);
        // newGifcard.querySelectorAll('.gifcard-info-title').forEach(k => k.innerText = element.title);

        // newGifcard.querySelectorAll('.gifcard-down-link').forEach(k => {
        //     k.setAttribute('data-href', element.images.original.url);
        //     k.setAttribute('download', element.title);
        // });

        gifcardsContainer.appendChild(newGifcard);
    });

    /* --------------- AGREGRAR FUNCIONALIDAD A BOTONES DE GIFCARDS -------------- */
    //Aplica para los gifcards dentro del container seleccionado
    let gifCards = gifcardsContainer.querySelectorAll('.gifcard');

    gifCards.forEach(element => {
        // Maximizar con toque en gifcard
        element.addEventListener('click', (event) => {
            if (element.querySelector('.gifcard-max-container').classList.contains('hide')) {
                element.querySelector('.gifcard-max-container').classList.remove('hide');
            }
            event.stopPropagation();
        });

        //Maximizar con click en btn-max
        element.querySelector('.btn-max').addEventListener('click', (event) => {
            element.querySelector('.gifcard-max-container').classList.remove('hide');
            event.stopPropagation();
        });

        //Cerra ventana maximizada con click en btn-close
        element.querySelector('.btn-close').addEventListener('click', (event) => {
            element.querySelector('.gifcard-max-container').classList.add('hide');
            event.stopPropagation();
        });

        //Guardar/Eliminar de Favoritos
        element.querySelectorAll('.btn-fav').forEach(k => {
            k.addEventListener('click', (event) => {
                //Dar like y guardar en favs
                if (k.classList.contains('fav-inactive')) {
                    console.log('LIKE!')
                    favGifs.push({
                        id: element.querySelector('#gifId').innerText,
                        username: element.querySelector('.gifcard-info-user').innerText,
                        title: element.querySelector('.gifcard-info-title').innerText,
                        display: element.querySelector('.gifcard-max-gifimg').getAttribute('src'),
                        downlink: element.querySelector('.gifcard-down-link').getAttribute('data-href')
                    });
                    // console.log(`Gif Id: ${element.querySelector('#gifId').innerText} AGREGADO favs`)
                    // console.log(favGifs);
                    localStorage.setItem('favGifsStorage', JSON.stringify(favGifs));
                    // console.log(localStorage.getItem('favGifsStorage'));

                    //Quitar like y remover de favs
                } else if (k.classList.contains('fav-active')) {
                    console.log('DISLIKE!')
                    if (favGifs.length > 0) {
                        for (let i = 0; i < favGifs.length; i++) {
                            if (favGifs[i].id === element.querySelector('#gifId').innerText) {
                                favGifs.splice(i, 1);
                                // console.log(`Gif Id: ${element.querySelector('#gifId').innerText} ELIMANDO favs`)
                                // console.log(favGifs);
                                localStorage.setItem('favGifsStorage', JSON.stringify(favGifs));
                                // console.log(localStorage.getItem('favGifsStorage'));
                            }
                        }
                    }
                }
                element.querySelectorAll('.btn-fav').forEach(j => j.classList.toggle('fav-inactive'))
                element.querySelectorAll('.btn-fav').forEach(j => j.classList.toggle('fav-active'))
                event.stopPropagation();
            });
        });

        //Descargar - Se aplica sobre el <a> y no directamente en el boton
        element.querySelectorAll('.gifcard-down-link').forEach(k => {
            k.addEventListener('click', (event) => {
                //Esto lo encontré en: https://stackoverflow.com/questions/50042406/instant-download-image-on-button-click/50042482
                var url = k.getAttribute('data-href');
                var fileName = k.getAttribute('download');
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "blob";
                xhr.onload = function () {
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(this.response);
                    var tag = document.createElement('a');
                    tag.href = imageUrl;
                    tag.download = fileName;
                    document.body.appendChild(tag);
                    tag.addEventListener('click', event => event.stopPropagation());
                    tag.click();
                    document.body.removeChild(tag);
                }
                xhr.send();
                //-------------------Hasta aquí
                event.preventDefault();
                event.stopPropagation();
            })
        })
    })
}