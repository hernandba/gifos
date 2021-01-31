/* -------------------------------------------------------------------------- */
/*                               TRENDING TERMS                               */
/* -------------------------------------------------------------------------- */
import {urlApi, api_key, getApiInfo} from './infoAPI.js';

let urlTrendingTerms = `${urlApi}/trending/searches?api_key=${api_key}`;
let trendingTermsPgraph = document.getElementById('trending-terms-pgraph');

getApiInfo(urlTrendingTerms).then(data => {
    for (var i = 0; i < 5; i++) {
        if (i < 4) {
            trendingTermsPgraph.innerHTML += data[i].charAt(0).toUpperCase() + data[i].slice(1) + ', ';
        } else {
            trendingTermsPgraph.innerHTML += data[i].charAt(0).toUpperCase() + data[i].slice(1) + '.';
        }
    }
}).catch(console.error);