/* -------------------------------------------------------------------------- */
/*                               GIPHY API INFO                               */
/* -------------------------------------------------------------------------- */

/* ------------------------- GIPHY API CREDENTIALS ------------------------- */
let api_key = '4vH8UHoIqQdiqEF09F0RMipmSWYCp7Yu',
    urlApi = 'https://api.giphy.com/v1',
    urlTrendingGifs = `${urlApi}/gifs/trending?api_key=${api_key}&limit=25&rating=g`,
    urlSrchSuggests = `${urlApi}/gifs/search/tags?api_key=${api_key}&q=`;

async function getApiInfo(url) {
    const response = await fetch(url);
    const json = await response.json();
    let data = json.data;

    return data;
}
