/* -------------------------------------------------------------------------- */
/*                                TRENDING GIFS                               */
/* -------------------------------------------------------------------------- */
let trendingGifsContainer = document.querySelector('#trending-gifs-container');

getApiInfo(urlTrendingGifs).then(data => {
    createGifcards(data, trendingGifsContainer);

    if (typeof (favGifsResults) != 'undefined') {
        trendingGifsContainer.querySelectorAll('.gifcard').forEach(gifcard => {
            gifcard.querySelectorAll('.btn-fav').forEach(btnFav => {
                btnFav.addEventListener('click', event => {
                    if (favGifs.length > 0) {
                        favGifsResults.innerHTML = "";
                        favGifsEmpty.classList.add('hide');
                        favGifsResults.classList.remove('hide');
                        createGifcards(favGifs, favGifsResults);
                        console.log(favGifsResults.querySelectorAll('.gifcard').length)
                        if (favGifs.length > 12) {
                            favGifsMoreBtn.classList.remove('hide');
                        }else{
                            favGifsMoreBtn.classList.add('hide');
                        }
                    } else {
                        favGifsResults.innerHTML = "";
                        favGifsResults.classList.add('hide');
                        favGifsEmpty.classList.remove('hide');
                    }
                    event.stopPropagation();
                })
            })
        });
    }

}).catch(console.error);