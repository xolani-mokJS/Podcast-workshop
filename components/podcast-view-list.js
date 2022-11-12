import { html, LitElement, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store } from '../store.js'

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

class Component extends LitElement {
    static get properties() {
        return {
            previews: { state: true },
            sorting: { state: true },
            search: { state: true },
        }
    }

    constructor() {
        super()
        this.disconnectStore = connect((state) => {
            if (this.previews !== state.previews) { this.previews = state.previews }
            if (this.sorting !== state.sorting) { this.sorting = state.sorting }
            if (this.search !== state.search) { this.search = state.search } 
        })
    }

    disconnectedCallback() {this.disconnectedStore()}

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
            font-size: 24px;
        }
    `;

    render() {
        /**
         * @type {import('../types').preview[]}
         */

        const preview = this.previews

        const filteredPreviews = previews.filter(item => {
            if (!this.search) return true
            return item.title.toLowerCase().includes(this.search.toLowerCase())
        })

        const sortedPreviews = filteredPreviews.sort((a, b) => {
            if (this.sorting === 'a-z') return a.title.localeCompare(b.title)
            if (this.sorting === 'z-a') return b.title.localeCompare(a.title)

            const dateA = new Date(a.updated).getTime()
            const dateB = new Date(b.updated).getTime()

            if (this.sorting === 'oldest-latest') return dateA - dateB
            if (this.sorting === 'latest-oldest') return dateB - dateA

            throw new Error('Invalid sorting')
         })

        const list = preview.map(({ title,id, updated, image,genres, seasons}) => {
            const clickHandler = () => store.loadSingle(id)

            const date = new Date(updated)
            const day = date.getDate()
            const month = MONTHS[date.getMonth() - 1]
            const year = date.getFullYear()
           
           return html`
                <li class="list">
                    <img src='${image}'>
                    <p>${genres}</p>
                    <button @click="${clickHandler}">${title}</button>
                    <span>(${seasons} Seasons)</span> 
                    <p> Updated: ${day} ${month} ${year}</p>
                </li>
                `
        })

       
        return html`
            <podcast-controls></podcast-controls>
            ${list.length > 0 ? html`<ul class="newList">${list}</ul>` : html`<div>No matches</div>`}
        `
    }
}

customElements.define('podcast-view-list', Component)