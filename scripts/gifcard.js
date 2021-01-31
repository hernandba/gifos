/* -------------------------------------------------------------------------- */
/*                       GIFCARD CREATION AND FUNCTIONS                       */
/* -------------------------------------------------------------------------- */
import {gifcardTemplate} from './modules/gifcard_template.js';
import {favGifs, favGifsResults} from './favs_init.js';
import {updateFavs} from './favs.js';

//Gets gifcard template from document
// let gifCard = document.querySelector('.gifcard');
//
function createGifcards(apiData, gifcardsContainer) {
    apiData.forEach(element => {
        let gifId = element.id,
            gifUser = element.username,
            gifTitle = element.title;

        let gifDisplay, gifDownlink;
        if (typeof (element.images) != 'undefined') {
            gifDisplay = element.images.downsized.url;
            gifDownlink = element.images.original.url;
        } else {
            gifDisplay = element.display;
            gifDownlink = element.downlink;;
        }

        let newGifcard = document.createElement('div');
        newGifcard.setAttribute('class', 'gifcard');
        newGifcard.innerHTML = gifcardTemplate.innerHTML;
        
        // newGifcard.innerHTML = gifCard.innerHTML;

        newGifcard.querySelector('#gifId').innerText = gifId;

        // newGifcard.setAttribute('style', `width: ${gifcardWidth}; height:${gifcardHeight}; background-image: url(${element.images.downsized.url})`);
        newGifcard.setAttribute('style', `background-image: url(${gifDisplay})`);
        newGifcard.querySelector('.gifcard-max-gifimg').setAttribute('src', gifDisplay);

        newGifcard.querySelectorAll('.gifcard-info-user').forEach(k => k.innerText = gifUser);
        newGifcard.querySelectorAll('.gifcard-info-title').forEach(k => k.innerText = gifTitle);

        newGifcard.querySelectorAll('.gifcard-down-link').forEach(k => {
            k.setAttribute('data-href', gifDownlink);
            k.setAttribute('download', gifTitle);
        });
        //Change btn-fav state if gifcard is already saved on favGifs LocalStorage
        if (favGifs.length > 0) {
            favGifs.forEach(j => {
                if (j.id === gifId) {
                    newGifcard.querySelectorAll('.btn-fav').forEach(k => k.classList.remove('fav-inactive'))
                    newGifcard.querySelectorAll('.btn-fav').forEach(k => k.classList.add('fav-active'))
                }
            })
        }
        gifcardsContainer.appendChild(newGifcard);
    });

    /* --------------- GIFCARDS BUTTONS FUNCTIONALITIES -------------- */
    //Applies to gifcards on chosen container
    let gifCards = gifcardsContainer.querySelectorAll('.gifcard');

    gifCards.forEach(element => {
        //Fullview when touched
        element.addEventListener('click', (event) => {
            if (element.querySelector('.gifcard-max-container').classList.contains('hide')) {
                element.querySelector('.gifcard-max-container').classList.remove('hide');
            }
            event.stopPropagation();
        });

        //Fullview click on btn-max
        element.querySelector('.btn-max').addEventListener('click', (event) => {
            element.querySelector('.gifcard-max-container').classList.remove('hide');
            event.stopPropagation();
        });

        //Close fullview when click on btn-close
        element.querySelector('.btn-close').addEventListener('click', (event) => {
            element.querySelector('.gifcard-max-container').classList.add('hide');
            event.stopPropagation();
        });

        //Save/delete from favs
        element.querySelectorAll('.btn-fav').forEach(k => {
            k.addEventListener('click', (event) => {
                //Actions if liked
                if (k.classList.contains('fav-inactive')) {
                    //Save to favGifs LocalStorage
                    favGifs.push({
                        id: element.querySelector('#gifId').innerText,
                        username: element.querySelector('.gifcard-info-user').innerText,
                        title: element.querySelector('.gifcard-info-title').innerText,
                        display: element.querySelector('.gifcard-max-gifimg').getAttribute('src'),
                        downlink: element.querySelector('.gifcard-down-link').getAttribute('data-href')
                    });
                    localStorage.setItem('favGifsStorage', JSON.stringify(favGifs));
                    //Update favs
                    if (favGifsResults != null) {
                        console.log('like!')
                        updateFavs();
                    }
                //Actions if unlike
                } else if (k.classList.contains('fav-active')) {
                    //Update favGifs LocalStorage
                    if (favGifs.length > 0) {
                        for (let i = 0; i < favGifs.length; i++) {
                            if (favGifs[i].id === element.querySelector('#gifId').innerText) {
                                favGifs.splice(i, 1);
                                localStorage.setItem('favGifsStorage', JSON.stringify(favGifs));
                            }
                        }
                    }
                    //Update favs and btn-fav state (like/unlike) on equal gifcard of trendings 
                    if (favGifsResults != null) {
                        console.log('dislike!')
                        updateFavs();
                        // trendingGifsContainer.querySelectorAll('.gifcard').forEach(gifCard => {
                        //     if (gifCard.querySelector('#gifId').innerText === element.querySelector('#gifId').innerText) {
                        //         gifCard.querySelectorAll('.btn-fav').forEach(j => j.classList.remove('fav-active'))
                        //         gifCard.querySelectorAll('.btn-fav').forEach(j => j.classList.add('fav-inactive'))
                        //     }
                        // })
                    }
                }
                //Change btn-fav state (like/unlike)
                element.querySelectorAll('.btn-fav').forEach(j => j.classList.toggle('fav-inactive'))
                element.querySelectorAll('.btn-fav').forEach(j => j.classList.toggle('fav-active'))
                event.stopPropagation();
            });
        });

        //Download - Applies on <a> but not on button
        element.querySelectorAll('.gifcard-down-link').forEach(k => {
            k.addEventListener('click', (event) => {
                //Found on: https://stackoverflow.com/questions/50042406/instant-download-image-on-button-click/50042482
                var url = k.getAttribute('data-href');
                var fileName = k.getAttribute('download');
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "blob";
                xhr.onload = function () {
                    var urlCreator = window.URL || window.webkitURL;
                    var imageUrl = urlCreator.createObjectURL(this.response);
                    var tag = document.createElement('a');
                    tag.href = imageUrl;
                    tag.download = fileName;
                    document.body.appendChild(tag);
                    tag.addEventListener('click', event => event.stopPropagation());//Added by me
                    tag.click();
                    document.body.removeChild(tag);
                }
                xhr.send();
                //-------------------Ends
                event.preventDefault();
                event.stopPropagation();
            })
        })
    })
}

export {createGifcards};