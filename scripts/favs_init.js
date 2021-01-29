/* -------------------------------------------------------------------------- */
/*                             FAVS INITIALIZATION                            */
/* -------------------------------------------------------------------------- */
let favGifs;

if (localStorage.length > 0) {
    console.log('Si habia inf en localStorage');
    favGifs = JSON.parse(localStorage.getItem('favGifsStorage'));
} else {
    console.log('No habia info en localStorage');
    favGifs = [];
}