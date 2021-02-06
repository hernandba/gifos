/* -------------------------------------------------------------------------- */
/*                            MYGIFS INITIALIZATION                           */
/* -------------------------------------------------------------------------- */

let myGifs;

if(localStorage.getItem('myGifsStorage') != null){
    console.log('Si habian myGifs en localStorage');
    myGifs = JSON.parse(localStorage.getItem('myGifsStorage'));
    console.log(`myGifs = ${myGifs}`);
}else{
    console.log('no habian myGifs en localStorage')
    myGifs = [];
    console.log(`myGifs = ${myGifs}`);
}