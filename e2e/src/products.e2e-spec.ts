import { NotFoundPage } from './page-objects/not-found.po';
import { browser, element, by } from 'protractor';
import { ProductsPage } from './page-objects/products.po';

describe('', () => {
    let productsPage: ProductsPage;
    let notFoundPage: NotFoundPage;

    beforeEach(() => {
        productsPage = new ProductsPage();
        notFoundPage = new NotFoundPage();
    });

    xit('should automatically navigate to create form page when goes to products page', () => {
        productsPage.navigateTo();
        expect(productsPage.getCurrentUrl()).toContain('/new');
    });

    xit('should automatically redirected to not found page when routes not found', () => {
        notFoundPage.navigateTo();
        expect(notFoundPage.getPageHeader()).toBe('Page not found!!');
    });

    xit('should display product once added', () => {
        productsPage.navigateTo();
        
        // fill new product form
        productsPage.getNameElement().sendKeys('Lamborghini');
        productsPage.getImageElement().sendKeys('https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
        productsPage.getCostElement().sendKeys(10);
        productsPage.getQuantityElement().sendKeys(10);
        
        // submit button click
        var submitButton = element(by.css('form button[type=submit]'));
        submitButton.click();

        // check whether displaied in products list
        var product = element.all(by.css('app-product-item .card .card-body .card-title')).last();
        expect(product.getText()).toContain('Lamborghini');
    });

    xit('should navigate to edit product once clicked on \'Edit\' button', async () => {
        productsPage.navigateTo();
        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();
        expect(productsPage.getCurrentUrl()).toContain('/edit'); 
    });

    xit('should fill the details in edit product form once clicked on \'Edit\' button', async () => {
        productsPage.navigateTo();
        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();
        expect(await productsPage.getNameElement().getAttribute('value')).toContain('Lamborghini');
        expect(await productsPage.getImageElement().getAttribute('value')).toContain('https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
        expect(await productsPage.getCostElement().getAttribute('value')).toContain('10');
        expect(await productsPage.getQuantityElement().getAttribute('value')).toContain('10');
    });

    xit('should fill the details in edit product form once clicked on \'Edit\' button', async () => {
        productsPage.navigateTo();
        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();
        expect(await productsPage.getNameElement().getAttribute('value')).toContain('Lamborghini');
        expect(await productsPage.getImageElement().getAttribute('value')).toContain('https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
        expect(await productsPage.getCostElement().getAttribute('value')).toContain('10');
        expect(await productsPage.getQuantityElement().getAttribute('value')).toContain('10');
    });

    xit('should reflect the product details when editted', async () => {
        productsPage.navigateTo();
        
        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();
        
        productsPage.getNameElement().sendKeys('Lamborghini-test');
        var submitButton = element(by.css('form button[type=submit]'));
        submitButton.click();

        var product = element.all(by.css('app-product-item .card .card-body .card-title')).first();
        expect(product.getText()).toContain('Lamborghini-test');
    });

    xit('should not reflect the product details when clicked cancle', async () => {
        productsPage.navigateTo();
        
        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();
        
        productsPage.getNameElement().sendKeys('Lamborghini-test');
        var cancleButton = element(by.css('form button[type=button]'));
        cancleButton.click();

        var product = element.all(by.css('app-product-item .card .card-body .card-title')).first();
        expect(product.getText()).toContain('Lamborghini');
    });

    it('should disable \'Add to Cart\' button when product quantity is zero', async () => {
        productsPage.navigateTo();
        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();
        
        productsPage.getQuantityElement().sendKeys('0');
        expect(productsPage.getQuantityElement().getAttribute('value')).toContain('0');
        var submitButton = element(by.css('form button[type=submit]'));
        await submitButton.click();

        let addToCartButton = productsPage.getAddToCartButton();
        
        expect(await addToCartButton.getAttribute('disabled')).toBeTruthy();
    });

});