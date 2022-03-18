
import { filterBlock } from "./components/filterBlock";
import { products } from "./components/product";
import { TemporaryComponents } from "./components/temporaryComponent";
const testData = require('/cypress/fixtures/testData.json')

export class SearchResultPage {

    constructor() {
        this.topSortBlock = '#s-result-sort-select';

        this.filterBlock = filterBlock;
        this.products = products;
    }

    sortProductsBy(sortOption) {
        cy.get(this.topSortBlock).select(sortOption, { force: true });
        cy.waitUntilElementDisappear(TemporaryComponents.loadingSpinnerPlaceholder, 5000);
    }

    verifySort(sortOption) {
        switch (sortOption) {
            case testData.sort.Featured:
                cy.get(this.products.locator()).should('exist', 'Featured sort: ');
                break;
            case testData.sort.PriceLowToHigh:
                this.#verifyLowToHigh();
                break;
            case testData.sort.PriceHighToLow:
                this.#verifyHighToLow();
                break;
            case testData.sort.CustomerReview:
                this.#verifyCustomerReview();
                break;
            case testData.sort.Newest:
                throw new Error('Newest arrivals sort: Products dont contain information about arrivals.');
                break;
            default:
                throw new Error(`Sort option doesn't exist.`);
        }
    }

    #verifyLowToHigh() {
        this.products.getPrices().then(prices => {
            const pricesArray = Array.from(prices, price => {
                const pricesArray = Array.from(prices, price => Number(price.innerText.match(/[+-]?\d+(\.\d+)?/g)[0]));
                Number(price.innerText.substring(1, price.innerText.length))
            });
            for (let i = 1; i < pricesArr.length; i++) {
                expect(pricesArr[i - 1]).is.lessThan(pricesArr[i], 'Low to high price sort: ');
            }
        })
    }

    #verifyHighToLow() {
        this.products.getPrices().then(prices => {
            const pricesArray = Array.from(prices, price => Number(price.innerText.match(/[+-]?\d+(\.\d+)?/g)[0]));
            for (let i = 1; i < pricesArray.length; i++) {
                expect(pricesArray[i - 1]).is.greaterThan(pricesArray[i], 'High to low price sort: ');
            }
        })
    }

    #verifyCustomerReview() {
        this.products.getStarRaitings().then(startRaitings => {
            const starRaitingArray = Array.from(startRaitings, startRaiting => Number(startRaiting.innerText.match(/[+-]?\d+(\.\d+)?/g)[0]));
            for (let i = 1; i < starRaitingArray.length; i++) {
                expect(starRaitingArray[i - 1]).is.greaterThan(starRaitingArray[i], 'High to low raiting sort.');
            }
        })
    }

    getProducts() {
        return this.products;
    }

    getFilterBlock() {
        return this.filterBlock;
    }

}

export const searchResultPage = new SearchResultPage();