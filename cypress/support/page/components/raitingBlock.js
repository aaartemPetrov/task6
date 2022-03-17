export class RaitingBlock {

    constructor() {
        this.raitingList = '#reviewsRefinements li';
    }

    setRaitingHigherThan(intNumber) {
        if (intNumber < 1 || intNumber > 4) {
            throw new Error("intNumber can be only 1,2,3 or 4. Actual: " + intNumber);
        }
        cy.get(this.raitingList).not('.a-spacing-micro').each(starRaitingItem => {
            if (starRaitingItem.text().trim().charAt(0) == intNumber) {
                cy.wrap(starRaitingItem).click();
            }
        })
    }

    locator() {
        return '#reviewsRefinements';
    }

}

export const raitingBlock = new RaitingBlock();