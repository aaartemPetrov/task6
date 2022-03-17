/// <reference types="cypress" />

import { customerPreferencesPage } from "../support/page/customerPreferencesPage";
import { homePage } from "../support/page/homePage";
import { searchResultPage } from "../support/page/searchResultPage";
const testData = require('../fixtures/testData.json');


describe('Amazon test', () => {

    beforeEach('visit home page', () => {
        homePage.visit();
    })

    it('Search & Filtering products by raiting.', () => {
        homePage.searchProduct(testData.searchedBrand);
        searchResultPage.getProducts().getTitles().should('contain', testData.searchedBrand);
        searchResultPage.getFilterBlock().getPriceBlock().setPriceFilter(testData.fromPrice, testData.toPrice);
        searchResultPage.getFilterBlock().getRaitingBlock().setRaitingHigherThan(testData.starRaiting);
        searchResultPage.getProducts().getStarRaitingAsNumber().should('be.greaterThan', testData.starRaiting);
    })

    it('Search & Filtering products by price.', () => {
        homePage.searchProduct(testData.searchedBrand);
        searchResultPage.getProducts().getTitles().should('contain', testData.searchedBrand);
        searchResultPage.getFilterBlock().getPriceBlock().setPriceFilter(testData.fromPrice, testData.toPrice);
        searchResultPage.getProducts().getPrices().each(stringPrice => {
            const price = Number(stringPrice.text().substring(1, stringPrice.text().indexOf('.')));
            expect(price).greaterThan(testData.fromPrice);
            expect(price).lessThan(testData.toPrice);
        })
    })

    it.skip('Validate Home Page.', () => {
        homePage.validateHomePage();
        cy.log('Home page is valide.');
    })

    it.skip('Change language check.', () => {
        homePage.getHeader().getTopMenu().clickAllMenuButton();
        homePage.saveChosenLanguageAsVar('oldLanguage');
        homePage.getHeader().getTopMenu().getAllMenu().clickLanguageButton();
        customerPreferencesPage.isOpenedAssert();
        customerPreferencesPage.chooseLanguageRadioButton(testData.language);
        customerPreferencesPage.clickSaveChangesButton();

        homePage.isOpenedAssert();
        homePage.getHeader().getTopMenu().clickAllMenuButton();
        homePage.getHeader().getTopMenu().getAllMenu().languageButtonText().then(newLanguage => {
            cy.get('@oldLanguage').then(oldLanguage => {
                expect(oldLanguage).not.equal(newLanguage);
            })
        })

    })

    it.skip('Search.', () => {
        homePage.searchProduct(testData.searchedBrand);
        searchResultPage.getProducts().getTitles().should('contain', testData.searchedBrand);
    })

    it.skip('login.', () => {
        cy.amazonLogin(Cypress.env('email'), Cypress.env('password'));
        homePage.visit();
    })

})