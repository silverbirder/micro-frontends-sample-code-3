import {MyElement} from './components/my-element'
import {ProductItem} from './components/product-item'
import {SearchBox, SearchBoxEvent} from './components/search-box'

exports.MyElement = MyElement;
exports.ProductItem = ProductItem;
exports.SearchBox = SearchBox;

const searchBox = document.querySelector('search-box') as SearchBox;
searchBox?.addEventListener('search-box-button-click', async (e: Event) => {
    const {keyword, callback} = (e as CustomEvent as SearchBoxEvent).detail;
    if (callback) {
        await callback(keyword);
    }
});
searchBox?.addEventListener('search-box-keyword-history', async (e: Event) => {
    const {keyword} = (e as CustomEvent as SearchBoxEvent).detail;
    history.pushState({keyword: keyword}, "keyword", `?q=${keyword}`);
});
window.onpopstate = function (event: PopStateEvent) {
    if (event.state.keyword) {
        searchBox.dispatchKeywordEvent(event.state.keyword)
    }
};
