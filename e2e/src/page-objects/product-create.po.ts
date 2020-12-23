import { browser, by, element, ElementFinder } from 'protractor';
export class ProductCreatePage {

    navigateTo(): Promise<any> {
        return browser.get(`${browser.baseUrl}/products/new`) as Promise<any>;
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