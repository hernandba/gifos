/* -------------------------------------------------------------------------- */
/*                                  FAV GIFS                                  */
/* -------------------------------------------------------------------------- */
let favGifsResults = document.querySelector('#fav-gifs-results'),
    favGifsEmpty = document.querySelector('#fav-gifs-empty'),
    favGifsMoreBtn = document.querySelector('#fav-gifs-more-btn'),
    trendingGifs = document.querySelector('#trending-gifs-container');

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
} else {
    favGifsResults.innerHTML = "";
    favGifsResults.classList.add('hide');
    favGifsEmpty.classList.remove('hide');
}

favGifsResults.querySelectorAll('.gifcard').forEach(gifcard => {
    gifcard.querySelectorAll('.btn-fav').forEach(btnFav => {
        btnFav.addEventListener('click', event => {
            console.log('click')
            console.log(favGifs)
            // if (favGifs.length > 0) {
            //     favGifsResults.innerHTML = "";
            //     favGifsEmpty.classList.add('hide');
            //     favGifsResults.classList.remove('hide');
            //     createGifcards(favGifs, favGifsResults);
            //     if (favGifs.length > 12) {
            //         favGifsMoreBtn.classList.remove('hide');
            //     }else{
            //         favGifsMoreBtn.classList.add('hide');
            //     }
            // } else {
            //     favGifsResults.innerHTML = "";
            //     favGifsResults.classList.add('hide');
            //     favGifsEmpty.classList.remove('hide');
            // }
            event.stopPropagation();
        })
        // if(btnFav.classList.contains('fav-active')){
        //     btnFav.addEventListener('click', event => {
        //         console.log('Click en fav gif')
        //         //Que se elimine del contenedor
        //         // favGifsResults.removeChild(gifcard);
        //         if (favGifs.length > 0) {
        //             favGifsResults.innerHTML = "";
        //             favGifsEmpty.classList.add('hide');
        //             createGifcards(favGifs, favGifsResults);
        //             if (favGifs.length > 12) {
        //                 favGifsMoreBtn.classList.remove('hide');
        //             }
        //         } else {
        //             favGifsResults.innerHTML = "";
        //             favGifsResults.classList.add('hide');
        //             favGifsEmpty.classList.remove('hide');
        //         }

        //         //Que se le quite el "like" al mismo gifcard si está
        //         //en el contenedor de los trendings
        //         trendingGifs.querySelectorAll('.gifcard').forEach(gifTrending => {
        //             if(gifcard.querySelector('#gifId').innerText === gifTrending.querySelector('#gifId').innerText){
        //                 gifTrending.querySelectorAll('.btn-fav').forEach(btn => {
        //                     btn.classList.remove('fav-active');
        //                     btn.classList.add('fav-inactive');
        //                 })
        //             }
        //         })

        //         event.stopPropagation();
        //     })
        // }
    })
});