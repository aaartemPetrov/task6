import { header } from "./components/header";


export class HomePage {

    constructor() {
        this.header = header;
    }

    validateHomePage() {
        this.header.validateHeader();
    }

    saveChosenLanguageAsVar(varName) {
        this.getHeader().getTopMenu().getAllMenu().languageButtonText().as(varName);
    }

    isOpenedAssert() {
        cy.location('pathname').should('equal', '/', 'Home page opened:');
    }

    searchProduct(string) {
        this.getHeader().typeSearchLine(string);
        this.getHeader().clickSubmitButton();
    }

    visit() {
        cy.visit('/');
    }

    getHeader() {
        return this.header;
    }

}

export const homePage = new HomePage();