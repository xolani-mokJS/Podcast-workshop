import { html, LitElement, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store } from '../store.js'

class Component extends LitElement {
    static get properties() {
        return {
            previews: { state: true },
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
        if (this.previews === state.previews) return
        this.previews = state.previews
    }

    disconnectedCallback() { store.unsubscribe(this.storeChange) }

    static styles = css `
        body{
            margin: 0;
            background-color: black;
            color: white;
        }

        .list{
            color: black;
            list-style: none;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: center;
            width: 200px;
            margin: 20px;
            padding: 15px;
            background-color: white;
            border-radius: 15px;
        }

        img{
            width: 100%;
        }

        .newList{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
        }

        button{
            cursor: pointer;
            border: none;
            background-color: white;
            margin: 15px;
            font-size: 18px;
        }


        
    `;

    render() {
        /**
         * @type {import('../types').preview[]}
         */
        const preview = this.previews

        const list = preview.map(({ title,id , image, seasons}) => {
            const clickHandler = () => store.loadSingle(id)
           
           return html`
                <li class="list">
                    <img src='${image}'>
                    <button @click="${clickHandler}">${title}</button>
                    <span>(${seasons} Seasons)</span>
                </li>
                `
        })

        return html`
            <ul class='newList'>
                ${list}
            </ul>
        `
    }
}

customElements.define('podcast-view-list', Component)