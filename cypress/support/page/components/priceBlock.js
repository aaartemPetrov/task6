export class PriceBlock {

    constructor() {
        this.minPriceFilter = '#low-price';
        this.maxPriceFilter = '#high-price';
        this.goButton = '#a-autoid-1';
    }

    setPriceFilter(from, to) {
        this.typeMinPrice(from);
        this.typeMaxPrice(to);
        this.clickGoButton();
    }

    typeMinPrice(price) {
        cy.get(this.minPriceFilter).clear().type(price);
    }

    typeMaxPrice(price) {
        cy.get(this.maxPriceFilter).clear().type(price);
    }

    clickGoButton() {
        cy.get(this.goButton).click();
    }

    locator() {
        return '#priceRefinements';
    }

}

export const priceBlock = new PriceBlock();