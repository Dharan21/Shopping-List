import { browser, element, by, ElementFinder } from 'protractor';
export class ProductEditPage {

    navigateTo(): Promise<any> {
        return browser.get(`${browser.baseUrl}/products/0/edit`) as Promise<any>;
    }

    async clearNameElement() {
        element(by.css('input[formControlName=name]')).clear();
    }

    async clearImageElement() {
        element(by.css('input[formControlName=image]')).clear();
    }

    async clearCostElement() {
        element(by.css('input[formControlName=cost]')).clear();
    }
    
    async clearQuantityElement() {
        element(by.css('input[formControlName=quantity]')).clear();
    }

    getNameElement(): ElementFinder {
        return element(by.css('input[formControlName=name]'));
    }

    getImageElement(): ElementFinder {
        return element(by.css('input[formControlName=image]'));
    }

    getCostElement(): ElementFinder {
        return element(by.css('input[formControlName=cost]'));
    }
    
    getQuantityElement(): ElementFinder {
        return element(by.css('input[formControlName=quantity]'));
    }

}