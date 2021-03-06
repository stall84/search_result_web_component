

const template = document.createElement('template') as HTMLTemplateElement;
// Create the html template that the web component will be attached to
template.innerHTML = `
    <style>
        div {
            margin-top: 20px;
            color: rgb(248,210,191);
        }
    </style>
    <div>
        <p>The Google search result of your name is <a target="_blank" rel="noopener">here!</a></p>
    </div>
`;

class SearchResult extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
        this.shadowRoot!.querySelector('a')!.href = '';


    }
    // Method must be static
    static get observedAttributes() {
        return ['name-attribute'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name == 'name-attribute') {
            this.shadowRoot!.querySelector(
                'a'
            )!.href = `https://www.google.com/search?q=${newValue}`;
        }
    }


}

window.customElements.define('search-result', SearchResult);