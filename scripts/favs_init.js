/* -------------------------------------------------------------------------- */
/*                             FAVS INITIALIZATION                            */
/* -------------------------------------------------------------------------- */
let favGifs,
    favGifsResults = document.querySelector('#fav-gifs-results');

if (localStorage.getItem('favGifsStorage') != null) {
    console.log('Si habia inf en localStorage');
    favGifs = JSON.parse(localStorage.getItem('favGifsStorage'));
    console.log(favGifs)
} else {
    console.log('No habia info en localStorage');
    favGifs = [];
    console.log(favGifs)
}