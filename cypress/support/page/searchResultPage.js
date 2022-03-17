import { filterBlock } from "./components/filterBlock";
import { products } from "./components/product";

export class SearchResultPage {

    constructor() {
        this.filterBlock = filterBlock;
        this.products = products;
    }

    getProducts() {
        return this.products;
    }

    getFilterBlock() {
        return this.filterBlock;
    }

}

export const searchResultPage = new SearchResultPage();