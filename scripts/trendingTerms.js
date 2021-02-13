/* -------------------------------------------------------------------------- */
/*                               TRENDING TERMS                               */
/* -------------------------------------------------------------------------- */
let urlTrendingTerms = `${urlApi}/trending/searches?api_key=${api_key}`;
let trendingTermsPgraph = document.getElementById('trending-terms-pgraph');
let trendingTermsState;

getApiInfo(urlTrendingTerms).then(data => {
    if (sessionStorage.getItem('darkModeStorage') != null) {
        if (JSON.parse(sessionStorage.getItem('darkModeStorage'))) {
            trendingTermsState = 'dark-mode'
        } else {
            trendingTermsState = ''
        }
    } else {
        trendingTermsState = ''
    }

    for (var i = 0; i < 5; i++) {
        if (i < 4) {
            trendingTermsPgraph.innerHTML += `<a href="#" class="link light-mode ${trendingTermsState}">${data[i].charAt(0).toUpperCase()}${data[i].slice(1)}</a>, `;
        } else {
            trendingTermsPgraph.innerHTML += `<a href="#" class="link light-mode ${trendingTermsState}">${data[i].charAt(0).toUpperCase()}${data[i].slice(1)}</a>.`;
        }
    }

    // for (var i = 0; i < 5; i++) {
    //     if (i < 4) {
    //         trendingTermsPgraph.innerHTML += '<a href="#" class="link light-mode">' + data[i].charAt(0).toUpperCase() + data[i].slice(1) + '</a>, ';
    //     } else {
    //         trendingTermsPgraph.innerHTML += '<a href="#" class="link light-mode">' + data[i].charAt(0).toUpperCase() + data[i].slice(1) + '</a>.';
    //     }
    // }

    trendingTermsPgraph.querySelectorAll('a').forEach(element => {
        element.addEventListener('click', event => {
            prepareForSearch();
            searchForGifs(element.innerText);
            srchBtn.classList.add('hide');
            srchCloseBtn.classList.remove('hide');
            srchInput.value = element.innerText;
            event.stopPropagation();
        })
    });
}).catch(console.error);