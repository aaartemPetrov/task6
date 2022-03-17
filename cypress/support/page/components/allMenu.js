export class AllMenu {

    constructor() {
        this.languageButton = '#hmenu-icp-language';
    }

    languageButtonText() {
        return cy.get(this.languageButton).invoke('text');
    }

    clickLanguageButton() {
        cy.get(this.languageButton).click();
    }

    locator() {
        return '#hmenu-canvas';
    }

}

export const allMenu = new AllMenu();