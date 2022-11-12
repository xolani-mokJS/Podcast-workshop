import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js'
import { store } from '../store.js'

class Component extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '<div>podcast-episode</div>'
    }
}

customElements.define('podcast-episode', Component)