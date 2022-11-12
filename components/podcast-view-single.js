import { html, LitElement, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store, connect } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            single: { state: true },
        }
    }

    constructor() {
        super()
        this.disconnectStore = connect((state) => {
            if (this.single === state.single) return
            this.single = state.single
        })
    }

    disconnectedCallback() { this.disconnectStore() }

    /**
     * @param {import('../types').state} state 
     */

    static styles = css `

    body{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    .single-show{
        color: black;
        list-style: none;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        width: 600px;
        margin: 20px;
        padding: 15px;
        background-color: white;
        border-radius: 15px;
    }

    img{
        width: 100%;
    }

    .season{
        color: black;
        background-color: #efefef;
        width: 600px;
        text-align: center;
        padding: 20px;
        border-radius: 5px;
        margin:20px;
    }

    .season-title{
        font-size: 24px;
    }

    .episode{
        padding: 20px;
    }

    .episode-title{
        font-size: 20px;
    }

    button{
        background-color: red;
        color: black;
        font-size:20px;
        padding: 10px;
        border-radius: 5px;
        margin: 20px;
}

    
    `

    render() {
        /**
         * @type {import('../types').show}
         */
        const show = this.single
        if (!show) {
            return html`<div></div>`
        }
        
        const backHandler = () => store.loadList()

        const seasons = show.seasons.map(({ episodes, title }) => {
            return html`
                <div class="season">
                    <h2 class='season-title'>${title}</h2>
                    ${episodes.map(({ file, title: innerTitle }) => {
                        return html`
                            <div>
                                <hr>
                                <div class='episode'>
                                <p class='episode-title'>${innerTitle}</p>
                                <audio controls>
                                    <source src=${file}>
                                </audio>
                            </div> 
                            </div>
                        `
                    })}
                </div>
            `
        })

      
        
        return html` 
        <button @click="${backHandler}">Back to all list</button>
            
            <div class='single-show'>
            <img src='${show.image}'>
            <span> ${show.genres}</span>
             <h1>${show.title || ''}</h1>
             <p>${show.description}</p>
            </div>
            ${seasons}
        `
    }
}

customElements.define('podcast-view-single', Component)