/* -------------------------------------------------------------------------- */
/*                               GIPHY API INFO                               */
/* -------------------------------------------------------------------------- */

/* ------------------------- GIPHY API CREDENTIALS ------------------------- */
let api_key = '4vH8UHoIqQdiqEF09F0RMipmSWYCp7Yu',
    urlApi = 'https://api.giphy.com/v1';

async function getApiInfo(url) {
    const response = await fetch(url);
    const json = await response.json();
    let data = json.data;

    return data;
}

export {api_key, urlApi, getApiInfo};
