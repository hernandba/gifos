/* -------------------------------------------------------------------------- */
/*                            MYGIFS INITIALIZATION                           */
/* -------------------------------------------------------------------------- */
let myGifs,
    myGifsResults = document.querySelector('#my-gifs-results');

if(localStorage.getItem('myGifsStorage') != null){
    console.log('Si habian myGifs en localStorage');
    myGifs = JSON.parse(localStorage.getItem('myGifsStorage'));
    console.log(myGifs);
}else{
    console.log('no habian myGifs en localStorage')
    myGifs = [];
    console.log(myGifs);
}