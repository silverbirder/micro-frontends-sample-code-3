import {MyElement} from './components/my-element'
import {ProductItem} from './components/product-item'
import {SearchBox, SearchBoxEvent} from './components/search-box'

exports.MyElement = MyElement;
exports.ProductItem = ProductItem;
exports.SearchBox = SearchBox;

const searchBox = document.querySelector('search-box') as SearchBox;
searchBox?.addEventListener('search-box-button-click', async (e: Event) => {
    const {keyword, callback} = (e as CustomEvent as SearchBoxEvent).detail;
    await callback(keyword);
});
