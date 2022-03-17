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

    getStarRaitingAsNumber() {
        return cy.get(this.starRaiting).then(raiting => {
            return cy.wrap(Number(raiting.text().substring(0, raiting.text().indexOf(' '))));
        });
    }

    locator() {
        return '.s-card-container';
    }

}

export const products = new Product();
