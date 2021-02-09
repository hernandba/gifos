/* -------------------------------------------------------------------------- */
/*                                  FAV GIFS                                  */
/* -------------------------------------------------------------------------- */
let favGifsEmpty = document.querySelector('#fav-gifs-empty'),
    favGifsMoreBtn = document.querySelector('#fav-gifs-more-btn'),
    trendingGifs = document.querySelector('#trending-gifs-container');

let offsetFavs = 12;

function updateFavs() {
    if (favGifsResults != null) {
        if (favGifs.length > 0) {
            favGifsResults.innerHTML = "";
            favGifsEmpty.classList.add('hide');
            favGifsResults.classList.remove('hide');

            if(favGifs.length > offsetFavs){
                favGifsMoreBtn.classList.remove('hide');
            }else{
                favGifsMoreBtn.classList.add('hide');
            }

            if(favGifs.length > offsetFavs && favGifsMoreBtn.classList.contains('hide')){
                console.log('yeah')
                offsetFavs = favGifs.length;
            }

            createGifcards(favGifs.slice(0, offsetFavs), favGifsResults);
        } else {
            favGifsResults.innerHTML = "";
            favGifsResults.classList.add('hide');
            favGifsEmpty.classList.remove('hide');
        }
    }
}

if(favGifsMoreBtn != null){
    favGifsMoreBtn.addEventListener('click', event => {
        offsetFavs+= 12;
        if(offsetFavs > favGifs.length){
            offsetFavs = favGifs.length;
            favGifsMoreBtn.classList.add('hide');
        }
        updateFavs();
        event.stopPropagation();
    })
}

updateFavs();