import {ProductItem} from '../components/product-item.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('product-item', () => {
  test('is defined', () => {
    const el = document.createElement('product-item');
    assert.instanceOf(el, ProductItem);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<product-item></product-item>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>ProductItem, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<product-item name="Test"></product-item>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>ProductItem, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = (await fixture(html`<product-item></product-item>`)) as ProductItem;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>ProductItem, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });
});
