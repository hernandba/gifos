/* -------------------------------------------------------------------------- */
/*                                 SEARCH GIFS                                */
/* -------------------------------------------------------------------------- */

/* --------------------------- PREPARE FOR SEARCH --------------------------- */
function prepareForSearch() {
    //Hide header
    header.classList.add('hide');
    //Hide search suggestions list
    srchSuggestList = document.querySelector('#srch-suggest-list')
    srchSuggestList.classList.add('hide');
    //Clear previous gif search results (if applies)
    srchResultsGifsContainer.innerHTML = "";
    //Show search results container (if applies)
    srchResultsContainer.classList.remove('hide');
}

/* ------------------------- GENERAL SEARCH FUNCTION ------------------------ */
let urlSrch;

function searchForGifs(query) {
    srchQuery = query;
    srchTitle.innerText = srchQuery;
    srchOffset = 0;

    urlSrch = `${urlApi}/gifs/search?api_key=${api_key}&q=${srchQuery}&limit=12&offset=${srchOffset}&rating=&lang=es`;
    getApiInfo(urlSrch).then(data => {
        if (data.length === 0) {
            srchNoResults.classList.remove('hide');
            srchResultsMoreBtn.classList.add('hide');
        } else {
            srchNoResults.classList.add('hide');
            createGifcards(data, srchResultsGifsContainer);
            srchResultsMoreBtn.classList.remove('hide');
        }
    });
}

/* ------------------------ CREATE SEARCH SUGGESTIONS ----------------------- */
function createSearchSuggestions() {
    srchSuggestList = document.querySelector('#srch-suggest-list');
    if (srchInput.value !== "") {
        getApiInfo(urlSrchSuggests + srchInput.value).then(data => {
            srchSuggestList.innerHTML = "";
            // console.log(data);
            if (data.length > 0) {
                data.forEach(element => {
                    let newSrchSuggest = document.createElement('div');
                    newSrchSuggest.classList.add('srch-suggest');
                    newSrchSuggest.innerHTML = srchSuggest.innerHTML;
                    newSrchSuggest.querySelector('#srch-suggest-txt').innerText = element.name;
                    srchSuggestList.appendChild(newSrchSuggest);
                });
                srchSuggestList.classList.remove('hide');

                // ADD CLICK-TO-SEARCH FUNCTION TO SEARCH SUGGESTIONS
                allSrchSuggestions = document.querySelectorAll('.srch-suggest');
                allSrchSuggestions.forEach(element => {
                    element.addEventListener('click', (event) => {
                        srchInput.value = element.innerText;
                        prepareForSearch();
                        searchForGifs(element.innerText);
                        event.stopPropagation();
                    });
                });
            } else {
                // console.log('Consulta sin sugerencias');
                srchSuggestList.classList.add('hide');
            }
        });
    } else {
        srchSuggestList.classList.add('hide');
    }
}

/* ------------------------- SEARCH FIELD FUNCTIONS ------------------------- */
let srchBar = document.querySelector('#srch-bar'),
    srchInput = document.querySelector('#srch-input'),
    srchBtn = document.querySelector('#srch-btn'),
    srchCloseBtn = document.querySelector('#srch-close-btn'),
    srchField = document.querySelector('#srch-field'),
    srchTitle = document.querySelector('#srch-results-title'),
    header = document.querySelector('header');

let srchSuggestList = document.querySelector('#srch-suggest-list'),
    srchSuggest = document.querySelector('.srch-suggest'),
    allSrchSuggestions;
srchSuggestList.removeChild(srchSuggest);

let srchQuery, srchOffset,
    srchResultsMoreBtn = document.querySelector('#srch-results-more-btn'),
    srchNoResults = document.querySelector('#srch-no-results');

let srchResultsContainer = document.querySelector('#srch-results-container');
srchResultsGifsContainer = document.querySelector('#srch-results-gifs-container');

//CLOSE SEARCH BUTTON (CROSS)
srchCloseBtn.addEventListener('click', (event) => {
    if (srchInput.value == "") {
        srchTitle.innerText = "";
        srchResultsGifsContainer.innerHTML = "";
        srchResultsContainer.classList.add('hide');
        header.classList.remove('hide');
        srchBtn.classList.remove('hide');
        srchCloseBtn.classList.add('hide');
    } else {
        srchInput.value = null;
        srchInput.focus();
        srchSuggestList = document.querySelector('#srch-suggest-list')
        srchSuggestList.classList.add('hide');
    }
    event.stopPropagation();
});

//SEARCH BUTTON (LUPE)
srchBtn.addEventListener('click', () => {
    srchQuery = srchInput.value;
    srchTitle.innerText = srchQuery;
})

//CLICK INSIDE/OUTSIDE SEARCH BAR OPTIONS 
window.addEventListener('click', (event) => {
    if (srchBar.contains(event.target)) {
        // console.log('click dentro del campo de busqueda');
        srchInput.focus();
        srchBtn.classList.add('hide');
        srchCloseBtn.classList.remove('hide');

        header.classList.add('hide');

        //Show search suggestions list if click inside
        createSearchSuggestions();
    } else {
        // console.log('click fuera del campo de busqueda');
        srchCloseBtn.classList.add('hide');
        srchBtn.classList.remove('hide');
        srchSuggestList = document.querySelector('#srch-suggest-list')
        srchSuggestList.classList.add('hide');

        header.classList.remove('hide');
    }
});

//"VER MAS" BUTTON
srchResultsMoreBtn.addEventListener('click', (event) => {
    srchOffset += 12;
    urlSrch = `${urlApi}/gifs/search?api_key=${api_key}&q=${srchQuery}&limit=12&offset=${srchOffset}&rating=&lang=es`;
    getApiInfo(urlSrch).then(data => {
        createGifcards(data, srchResultsGifsContainer);
        // console.log(data.length)
        if (data.length < 12) {
            srchResultsMoreBtn.classList.add('hide');
        }
    });

    event.stopPropagation();
});

/* --------------------- KEYBOARD SEARCH FIELD FUNCTIONS -------------------- */
srchInput.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'Enter':
            if (srchInput.value !== "") {
                prepareForSearch();
                searchForGifs(srchInput.value);
            }
            break;

        case 'ArrowDown':
            allSrchSuggestions = document.querySelectorAll('.srch-suggest');
            console.log(allSrchSuggestions);
            break;

        default:
            // GENERATE SEARCH SUGGESTIONS WHILE TAPPING
            createSearchSuggestions();
            break;
    }
});

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
                k.classList.toggle('fav-inactive');
                k.classList.toggle('fav-active');
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