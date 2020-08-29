import {LitElement, html, customElement, css, property, eventOptions} from 'lit-element';
import {ProductItem} from './product-item'

@customElement('search-box')
export class SearchBox extends LitElement {
    static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;
    @property({type: String})
    keyword = '';

    @property()
    productItemComponents: ProductItem[] = [];

    render() {
        return html`
　　  <input type="text" id="keyword" @change="${this._onChange}" value="${this.keyword}"><button @click="${this._onClick}">検索</button>
      ${this.productItemComponents}
    `;
    }

    @eventOptions({capture: true})
    private _onClick() {
        const search: SearchBoxEvent = {
            detail: {
                keyword: this.keyword,
                callback: (async (keyword: String) => {
                    const productItemComponent = new ProductItem();
                    productItemComponent.name = keyword;
                    this.productItemComponents.push(productItemComponent);
                    const map = new Map();
                    // map.set('productItemComponents', this.productItemComponents);
                    this.update(map)
                }).bind(this)
            }
        };
        let event: CustomEvent = new CustomEvent('search-box-button-click', search);
        this.dispatchEvent(event);
    }

    @eventOptions({capture: true})
    private _onChange(e: Event) {
        this.keyword = (<HTMLInputElement>e.target).value;
    }
}

export interface SearchBoxEvent extends CustomEventInit {
    detail: {
        keyword: String,
        callback: Function
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'search-box': SearchBox;
    }
}
