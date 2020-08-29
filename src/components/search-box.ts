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
                keyword: this.keyword
            }
        };
        let event: CustomEvent = new CustomEvent('search-box-button-click', search);
        this.dispatchEvent(event);
    }

    @eventOptions({capture: true})
    private _onChange(e: Event) {
        this.keyword = (<HTMLInputElement>e.target).value;
        const productItemComponent = new ProductItem();
        productItemComponent.name = this.keyword;
        this.productItemComponents.push(productItemComponent);
    }
}

export interface SearchBoxEvent extends CustomEventInit {
    detail: {
        keyword: String
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'search-box': SearchBox;
    }
}
