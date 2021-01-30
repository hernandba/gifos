/* -------------------------------------------------------------------------- */
/*                                TRENDING GIFS                               */
/* -------------------------------------------------------------------------- */
let trendingGifsContainer = document.querySelector('#trending-gifs-container');

getApiInfo(urlTrendingGifs).then(data => {
    createGifcards(data, trendingGifsContainer);
}).catch(console.error);