import { browser, element, by, ElementFinder } from 'protractor';
export class ProductEditPage {

    navigateTo(): Promise<any> {
        return browser.get(`${browser.baseUrl}/products/0/edit`) as Promise<any>;
    }

 

}