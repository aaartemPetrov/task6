export class Product {

    constructor() {
        this.productTitle = '.s-card-container a.a-link-normal .a-text-normal';
        this.price = 'span.a-price';
        this.starRaiting = 'i.a-icon-star-small span';
    }

    getPrices() {
        return cy.get(this.price);
    }

    getTitles() {
        return cy.get(this.productTitle);
    }

    getStarRaitings() {
        return cy.get(this.starRaiting);
    }

    locator() {
        return '.s-card-container';
    }

}

export const products = new Product();
