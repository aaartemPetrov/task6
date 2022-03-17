export class CustomerPreferencesPage {

    constructor() {
        this.languageRadioButton = '#icp-language-settings input'
        this.saveChangesButton = '.a-button-input';
    }

    isOpenedAssert() {
        cy.location('pathname').should('equal', '/customer-preferences/edit/', 'Customer preferences page is opened:');
        //cy.url().should('include', '/customer-preferences/edit/');
    }

    chooseLanguageRadioButton(language = 'English') {
        cy.get(this.languageRadioButton).should('exist').each(radioButton => {
            cy.wrap(radioButton).parent().find('.a-radio-label').invoke('text').then(text => {
                if (text.includes(language)) {
                    cy.wrap(radioButton).check({ force: true });
                }
            })
        })
    }

    clickSaveChangesButton() {
        cy.get(this.saveChangesButton).click();
    }

}

export const customerPreferencesPage = new CustomerPreferencesPage();