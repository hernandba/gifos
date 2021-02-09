/* -------------------------------------------------------------------------- */
/*                                   MY GIFS                                  */
/* -------------------------------------------------------------------------- */
let myGifsEmpty = document.querySelector('#my-gifs-empty'),
    myGifsMoreBtn = document.querySelector('#my-gifs-more-btn');

function updateMyGifs() {
    if (myGifsResults != null) {
        if (myGifs.length > 0) {
            myGifsResults.innerHTML = "";
            myGifsEmpty.classList.add('hide');
            myGifsResults.classList.remove('hide');
            
            // getApiInfo(`${urlApi}/gifs?api_key=${api_key}&ids=${myGifs}`).then(data => {
            //     console.log(data);
            //     createGifcards(data, myGifsResults);
            // })
            createGifcards(myGifs, myGifsResults);

            if (myGifs.length > 12) {
                myGifsMoreBtn.classList.remove('hide');
            } else {
                myGifsMoreBtn.classList.add('hide');
            }
        } else {
            myGifsResults.innerHTML = "";
            myGifsResults.classList.add('hide');
            myGifsEmpty.classList.remove('hide');
        }
    }
}

updateMyGifs();