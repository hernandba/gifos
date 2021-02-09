/* -------------------------------------------------------------------------- */
/*                                   MY GIFS                                  */
/* -------------------------------------------------------------------------- */
let myGifsEmpty = document.querySelector('#my-gifs-empty'),
    myGifsMoreBtn = document.querySelector('#my-gifs-more-btn');

let offsetMyGifs = 12;

function updateMyGifs() {
    if (myGifsResults != null) {
        if (myGifs.length > 0) {
            myGifsResults.innerHTML = "";
            myGifsEmpty.classList.add('hide');
            myGifsResults.classList.remove('hide');
            
            if(myGifs.length > offsetMyGifs){
                myGifsMoreBtn.classList.remove('hide');
            }else{
                myGifsMoreBtn.classList.add('hide');
            }

            if(myGifs.length > offsetMyGifs && myGifsMoreBtn.classList.contains('hide')){
                console.log('yeah')
                offsetMyGifs = myGifs.length;
            }

            createGifcards(myGifs.slice(0, offsetMyGifs), myGifsResults);
        } else {
            myGifsResults.innerHTML = "";
            myGifsResults.classList.add('hide');
            myGifsEmpty.classList.remove('hide');
        }
    }
}

myGifsMoreBtn.addEventListener('click', event => {
    offsetMyGifs+= 12;
    if(offsetMyGifs > myGifs.length){
        offsetMyGifs = myGifs.length;
        myGifsMoreBtn.classList.add('hide');
    }
    updateMyGifs();
    event.stopPropagation();
})

updateMyGifs();