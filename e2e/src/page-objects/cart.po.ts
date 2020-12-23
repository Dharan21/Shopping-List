import { browser, element, by, ElementFinder, ElementArrayFinder } from 'protractor';
export class CartPage {

    navigateTo(): Promise<any> {
        return browser.get(`${browser.baseUrl}/cart`) as Promise<any>;
    }

    getFirstCartItemName(): ElementFinder {
        return element.all(by.css('.card .card-body .card-title')).first();
    }

    getAllCartItems(): ElementArrayFinder {
        return element.all(by.css('.card'));
    }

    getFirstCartItemQuantity(): ElementFinder {
        return element.all(by.css('.card .card-body p.card-text')).first();
    }

    async clickRemoveSingleQuantityButtonForFirstItem() {
        await element.all(by.css('.card .card-body button.btn-warning')).first().click();
    }

    async clickRemoveFromCartButtonForFirstItem() {
        await element.all(by.css('.card .card-body button.btn-danger')).first().click();
    }
    
}