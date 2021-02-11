/* -------------------------------------------------------------------------- */
/*                                TRENDING GIFS                               */
/* -------------------------------------------------------------------------- */
let trendingGifsContainer = document.querySelector('#trending-gifs-container')
    leftArrow = document.querySelector('.arrow-left'),
    rightArrow = document.querySelector('.arrow-right'),
    trendingGifsSlider = document.querySelector('#trending-gifs-slider');

let scrollSize;
trendingGifsSlider.scrollLeft = 0;

getApiInfo(urlTrendingGifs).then(data => {
    createGifcards(data, trendingGifsContainer);

    leftArrow.addEventListener('click', event => {
        
        scrollSize = trendingGifsSlider.scrollLeft - 1000;
        if(scrollSize < 0){scrollSize = 0};
        trendingGifsSlider.scroll(scrollSize, 0);
        // console.log(`scrollSize = ${scrollSize}`)
        event.stopPropagation();
    })
    
    rightArrow.addEventListener('click', event => {
        scrollSize = trendingGifsSlider.scrollLeft + 1000;
        trendingGifsSlider.scroll(scrollSize, 0);
        // console.log(`scrollSize = ${scrollSize}`)
        event.stopPropagation();
    })

}).catch(console.error);