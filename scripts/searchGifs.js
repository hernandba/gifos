/* -------------------------------------------------------------------------- */
/*                                 SEARCH GIFS                                */
/* -------------------------------------------------------------------------- */
import {urlApi, api_key, getApiInfo} from './infoAPI.js';
import {createGifcards} from './gifcard.js';

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
let urlSrchSuggests = `${urlApi}/gifs/search/tags?api_key=${api_key}&q=`;
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

let srchResultsContainer = document.querySelector('#srch-results-container'),
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