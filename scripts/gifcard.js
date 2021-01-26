/* -------------------------------------------------------------------------- */
/*                       GIFCARD CREATION AND FUNCTIONS                       */
/* -------------------------------------------------------------------------- */
let gifCard = document.querySelector('.gifcard');
let favGifs = [];

function createGifcards(apiData, gifcardsContainer) {
    apiData.forEach(element => {
        let newGifcard = document.createElement('div');
        newGifcard.setAttribute('class', 'gifcard');
        newGifcard.innerHTML = gifCard.innerHTML;

        // newGifcard.setAttribute('style', `width: ${gifcardWidth}; height:${gifcardHeight}; background-image: url(${element.images.downsized.url})`);
        newGifcard.setAttribute('style', `background-image: url(${element.images.downsized.url})`);
        newGifcard.querySelector('.gifcard-max-gifimg').setAttribute('src', element.images.downsized.url);

        newGifcard.querySelectorAll('.gifcard-info-user').forEach(k => k.innerText = element.username);
        newGifcard.querySelectorAll('.gifcard-info-title').forEach(k => k.innerText = element.title);

        newGifcard.querySelectorAll('.gifcard-down-link').forEach(k => {
            k.setAttribute('data-href', element.images.original.url);
            k.setAttribute('download', element.title);
        });

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
        
        //Guardar en Favoritos
        element.querySelectorAll('.btn-fav').forEach(k => {
            k.addEventListener('click', (event) => {
                //Dar like y guardar en favs
                if (k.classList.contains('fav-inactive')) {
                    console.log('LIKE!')
                    console.log(element);
                    // favGifs.push(JSON.stringify(element));
                    // console.log(favGifs);
                    // localStorage.setItem('favGifsStorage', JSON.stringify(favGifs));
                    // console.log(localStorage.getItem('favGifsStorage'));
                    //Quitar like y remover de favs
                } else if (k.classList.contains('fav-active')) {
                    console.log('DISLIKE!')
                    if (favGifs.length > 0) {
                        // favGifs.splice(favGifs.indexOf(element), 1);
                        // console.log(favGifs);
                        // localStorage.setItem('favGifsStorage', JSON.stringify(favGifs));
                        // console.log(JSON.parse(localStorage.getItem('favGifsStorage')));
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