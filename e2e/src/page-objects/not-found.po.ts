import { browser, element, by } from 'protractor';
export class NotFoundPage {

    navigateTo(): Promise<any> {
        return browser.get(`${browser.baseUrl}/dummy-url`) as Promise<any>;
    }

    getPageHeader(): Promise<any> {
        return element(by.tagName('h2')).getText() as Promise<any>;
    }

}