/* -------------------------------------------------------------------------- */
/*                                  FAV GIFS                                  */
/* -------------------------------------------------------------------------- */
let favGifsEmpty = document.querySelector('#fav-gifs-empty'),
    favGifsMoreBtn = document.querySelector('#fav-gifs-more-btn'),
    trendingGifs = document.querySelector('#trending-gifs-container');

function updateFavs(){
    if (favGifs.length > 0) {
        favGifsResults.innerHTML = "";
        favGifsEmpty.classList.add('hide');
        favGifsResults.classList.remove('hide');
        createGifcards(favGifs, favGifsResults);
        if (favGifs.length > 12) {
            favGifsMoreBtn.classList.remove('hide');
        } else {
            favGifsMoreBtn.classList.add('hide');
        }
    } else if(favGifsResults != null){
        favGifsResults.innerHTML = "";
        favGifsResults.classList.add('hide');
        favGifsEmpty.classList.remove('hide');
    }
}

updateFavs();

