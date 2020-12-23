import { browser, by, element, ElementFinder } from 'protractor';

export class ProductsPage {

    navigateTo(): Promise<any> {
        return browser.get(`${browser.baseUrl}/products`) as Promise<any>;
    }

    getCurrentUrl(): Promise<any> {
        return browser.getCurrentUrl() as Promise<any>;
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

    getAddToCartButton(): ElementFinder {
        return element.all(by.css('.card .card-body button')).first();
    }

    async gotoCart() {
        await element.all(by.css('nav ul li a')).last().click();
    }
}