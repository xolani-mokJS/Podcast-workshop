/***
 * @typedef {object} preview
 * @property {string} id
 * @property {string} title
 * @property {string} image
 * @property {number} seasons
 * @property {string[]} genre
 * @property {string} updated
 */

/**
 * @typedef {object} episode
 * @property {number} episode
 * @property {string} description
 * @property {string} title
 * @property {string} file
 */

/**
 * @typedef {object} season
 * @property {number} season
 * @property {string} title
 * @property {string} image
 * @property {episode[]} episodes
 */

/**
 * @typedef {object} show 
 * @property {string} id
 * @property {string} title
 * @property {season[]} seasons
 *@property {string} image
 * @property {string[]} genres
 * @property {string} updated
 */

const newList = document.getElementById('newList');

const getPodcasts = async ()=> {
    const res = await fetch ("https://podcast-api.netlify.app/shows");

    if (!res.ok) {
        newList.innerHTML = "Could not get any Podcoasts";
        return
    }
    
    /**
     * @type {preview[]}
     */

    const data = await res.json();

    let newHtml =  '';

    for (const { image, id, title, seasons} of data){
            newHtml = `
            ${newHtml}
            <li class="list">
            <image class="preview-image" src="${image}">
            <button data-preview-button ="${id}">${title} <span>(${seasons} Seasons)</span></button>
            </li>`
    }

    newList.innerHTML = newHtml;

    }

    /**
     * @param {string} id
     */

    const getSinglePodcast = async (id) => {
        newList.innerHTML = `Loading...`;

        const res = await fetch (`https://podcast-api.netlify.app/id/${id}`);

        if (!res.ok) {
            newList.innerHTML = "Could not get podcast";
            return
        }

        /** 
         * @type {show}
         */

        const data = await res.json();

        let seasonsList =  '';

        for (const {title, image} of data.seasons){
            seasonsList = `
            ${seasonsList}

            <li class="list">
            <image class="preview-image" src="${image}">
            ${title}
            </li>
            `
        }

        newList.innerHTML = `
        <div class="seasonList">
        <button class="back-button" data-action="back"> Go back to main page </button>
        <h2> ${data.title}</h2>
        <ul> ${seasonsList}</ul> </div>
        
        `
}

document.body.addEventListener('click', (event) => {
    const {previewButton, action } = event.target.dataset;

    if (action && action === 'back') {
        getPodcasts();
        return;
    }

    if (!previewButton) return
    getSinglePodcast(previewButton);
})

getPodcasts();

