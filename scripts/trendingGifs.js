/* -------------------------------------------------------------------------- */
/*                                TRENDING GIFS                               */
/* -------------------------------------------------------------------------- */
import {urlApi, api_key, getApiInfo} from './infoAPI.js';
import {createGifcards} from './gifcard.js';

let urlTrendingGifs = `${urlApi}/gifs/trending?api_key=${api_key}&limit=25&rating=g`
let trendingGifsContainer = document.querySelector('#trending-gifs-container');

getApiInfo(urlTrendingGifs).then(data => {
    createGifcards(data, trendingGifsContainer);
}).catch(console.error);