/// <reference types="cypress" />

import { customerPreferencesPage } from "../support/page/customerPreferencesPage";
import { homePage } from "../support/page/homePage";
import { searchResultPage } from "../support/page/searchResultPage";
const testData = require('../fixtures/testData.json');


describe('Amazon test', () => {

    beforeEach('visit home page', () => {
        homePage.visit();
    })

    it('Search & sort than wait until loading indicator disappears', () => {
        homePage.searchProduct(testData.searchedBrand);
        searchResultPage.getProducts().getTitles().should('contain', testData.searchedBrand);
        //u can use any type of sorting from fixtures/testData.json to sort
        searchResultPage.sortProductsBy(testData.sort.CustomerReview);
        //u can use any type of sorting from fixtures/testData.json to verify sort
        searchResultPage.verifySort(testData.sort.CustomerReview);
    })

    it.skip('Search & Filtering products by raiting.', () => {
        homePage.searchProduct(testData.searchedBrand);
        searchResultPage.getProducts().getTitles().should('contain', testData.searchedBrand);
        searchResultPage.getFilterBlock().getPriceBlock().setPriceFilter(testData.fromPrice, testData.toPrice);
        searchResultPage.getFilterBlock().getRaitingBlock().setRaitingHigherThan(testData.starRaiting);
        searchResultPage.getProducts().getStarRaitings().each(stringStarRaiting => {
            const starRaiting = Number(stringStarRaiting.text().match(/[+-]?\d+(\.\d+)?/g)[0]);
            expect(starRaiting).is.greaterThan(testData.starRaiting);
        });
    })

    it.skip('Search & Filtering products by price.', () => {
        homePage.searchProduct(testData.searchedBrand);
        searchResultPage.getProducts().getTitles().should('contain', testData.searchedBrand);
        searchResultPage.getFilterBlock().getPriceBlock().setPriceFilter(testData.fromPrice, testData.toPrice);
        searchResultPage.getProducts().getPrices().each(stringPrice => {
            const price = Number(stringPrice.text().match(/[+-]?\d+(\.\d+)?/g)[0]);
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