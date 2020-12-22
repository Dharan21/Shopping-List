import { browser, by, element } from 'protractor';
export class ProductCreatePage {

    navigateTo(): Promise<any> {
        return browser.get(`${browser.baseUrl}/products/new`) as Promise<any>;
    }

}