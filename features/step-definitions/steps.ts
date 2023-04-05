import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from 'chai';
import magicScreen from '../../pageobjects/magic_screen';
import popularScreen from '../../pageobjects/popular_screen';
import productPage from '../../pageobjects/product_page';

Given('I\'m on the main page', async () => {
    expect(
        await magicScreen.isPageDisplayed(),
        'Magic tab should be open'
    ).to.be.true;
    expect(
        await magicScreen.isMagicTabDisplayed(),
        'Magic tab should contain correct content'
    ).to.be.true;
});

When('Swipe to Popular tab', async () => {
    await magicScreen.swipeToPopular();
});

Then('Popular tab is opened', async () => {
    expect(
        await popularScreen.isPageDisplayed(),
        'Popular tab should be open'
    ).to.be.true;
});

When('I remember info of the second product', async function() {
    this.product = await popularScreen.getInfoOfTheSecondProduct();
});

Then('Product is found in search', async function() {
    const product = await popularScreen.findRememberedProductInSearch(this.product);
    expect(
        JSON.stringify(product) === JSON.stringify(this.product),
        `Products are not equal! Actual: ${JSON.stringify(product)}, Expected: ${JSON.stringify(this.product)}`
    ).to.be.true;
});

When('I open remembered product', async function() {
    await popularScreen.searchForm.clickProductFromSearch(this.product);
});

Then('Correct product is opened', async function() {
    expect(
        await productPage.isPageDisplayed(),
        'Product page should be open'
    ).to.be.true;
    expect(
        await productPage.isProductPageOpenedWithName(this.product),
        `Product page with the name '${this.product.name}' should be displayed`
    ).to.be.true;
});

Then('The number of days is the same', async function() {
    expect(
        await productPage.isNumberOfDaysSame(this.product),
        'The number of days should be the same'
    ).to.be.true;
});
