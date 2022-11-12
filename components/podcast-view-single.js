import { html, LitElement, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            single: { state: true },
        }
    }

    constructor() {
        super()
        const state = store.subscribe(this.storeChange)
        this.storeChange(state)
    }

    /**
     * @param {import('../types').state} state 
     */
    storeChange = (state) => {
        if (this.single === state.single) return
        this.single = state.single
    }

    disconnectedCallback() { store.unsubscribe(this.storeChange) }

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
    
    `

    render() {
        /**
         * @type {import('../types').show}
         */
        const show = this.single
        const backHandler = () => store.loadList()

        return html` 
        <button @click="${backHandler}">👈 Back</button>
            
            <div class='single-show'>
            <img src='${show.image}'>
            <span> ${show.genre}</span>
             <h1>${show.title || ''}</h1>
             <p>${show.description}</p>
            </div>
        `
    }
}

customElements.define('podcast-view-single', Component)