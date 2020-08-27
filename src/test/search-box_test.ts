import {SearchBox} from '../components/search-box.js';
import {fixture, html} from '@open-wc/testing';

const assert = chai.assert;

suite('search-box', () => {
  test('is defined', () => {
    const el = document.createElement('search-box');
    assert.instanceOf(el, SearchBox);
  });

  test('renders with default values', async () => {
    const el = await fixture(html`<search-box></search-box>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>SearchBox, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('renders with a set name', async () => {
    const el = await fixture(html`<search-box name="Test"></search-box>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>SearchBox, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  test('handles a click', async () => {
    const el = (await fixture(html`<search-box></search-box>`)) as SearchBox;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>SearchBox, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });
});
