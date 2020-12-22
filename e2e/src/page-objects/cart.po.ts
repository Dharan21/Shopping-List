import { browser } from 'protractor';
export class CartPage {

    navigateTo(): Promise<any> {
        return browser.get(`${browser.baseUrl}/cart`) as Promise<any>;
    }
    
}