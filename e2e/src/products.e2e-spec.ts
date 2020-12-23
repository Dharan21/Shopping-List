import { ProductEditPage } from './product/page-objects/product-edit.po';
import { ProductCreatePage } from './product/page-objects/product-create.po';
import { browser, element, by, logging } from 'protractor';

import { NotFoundPage } from './page-objects/not-found.po';
import { ProductsPage } from './page-objects/products.po';
import { CartPage } from './page-objects/cart.po';

describe('', () => {
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let notFoundPage: NotFoundPage;
    let productCreatePage: ProductCreatePage;
    let productEditPage: ProductEditPage;

    beforeEach(() => {
        productsPage = new ProductsPage();
        cartPage = new CartPage();
        productCreatePage = new ProductCreatePage();
        productEditPage = new ProductEditPage();
        notFoundPage = new NotFoundPage();
    });

    it('should automatically navigate to create form page when goes to products page', async () => {
        await productsPage.navigateTo();
        expect(await productsPage.getCurrentUrl()).toContain('/new');
    });

    it('should automatically redirected to not found page when routes not found', async () => {
        await notFoundPage.navigateTo();
        expect(await notFoundPage.getPageHeader()).toBe('Page not found!!');
    });

    it('should display product once added', async () => {
        await productsPage.navigateTo();

        // fill new product form
        await productsPage.getNameElement().sendKeys('Lamborghini');
        await productsPage.getImageElement()
            .sendKeys('https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
        await productsPage.getCostElement().sendKeys(10);
        await productsPage.getQuantityElement().sendKeys(10);

        // submit button click
        var submitButton = element(by.css('form button[type=submit]'));
        await submitButton.click();

        // check whether displaied in products list
        var product = element.all(by.css('app-product-item .card .card-body .card-title')).last();
        expect(await product.getText()).toContain('Lamborghini');
    });

    it('should navigate to edit product once clicked on \'Edit\' button', async () => {
        await productsPage.navigateTo();
        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();
        expect(productsPage.getCurrentUrl()).toContain('/edit');
    });

    it('should fill the details in edit product form once clicked on \'Edit\' button', async () => {
        productsPage.navigateTo();
        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();
        expect(await productsPage.getNameElement().getAttribute('value')).toContain('Lamborghini');
        expect(await productsPage.getImageElement().getAttribute('value'))
            .toContain(
                'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            );
        expect(await productsPage.getCostElement().getAttribute('value')).toContain('10');
        expect(await productsPage.getQuantityElement().getAttribute('value')).toContain('10');
    });

    it('should reflect the product details when editted', async () => {
        await productsPage.navigateTo();

        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();

        await productsPage.getNameElement().clear();
        await productsPage.getNameElement().sendKeys('Lamborghini-test');
        var submitButton = element(by.css('form button[type=submit]'));
        await submitButton.click();

        var product = element.all(by.css('app-product-item .card .card-body .card-title')).first();
        expect(await product.getText()).toContain('Lamborghini-test');
    });

    it('should not reflect the product details when clicked cancle', async () => {
        await productsPage.navigateTo();

        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();

        await productsPage.getNameElement().clear();
        await productsPage.getNameElement().sendKeys('Lamborghini-test');
        var cancleButton = element(by.css('form button[type=button]'));
        await cancleButton.click();

        var product = element.all(by.css('app-product-item .card .card-body .card-title')).first();
        expect(await product.getText()).toContain('Lamborghini');
    });

    it('should disable \'Add to Cart\' button when product quantity is zero', async () => {
        await productsPage.navigateTo();
        var editLink = element.all(by.css("app-product-item .card .card-body a")).first();
        await editLink.click();

        await productsPage.getQuantityElement().clear();
        await productsPage.getQuantityElement().sendKeys('0');
        var submitButton = element(by.css('form button[type=submit]'));
        await submitButton.click();

        let addToCartButton = productsPage.getAddToCartButton();
        await addToCartButton.click();

        expect(await addToCartButton.getAttribute('disabled')).toBeTruthy();
    });

    it('should display product in cart when added', async () => {
        await productsPage.navigateTo();

        let addToCartButton = productsPage.getAddToCartButton();
        await addToCartButton.click();

        await productsPage.gotoCart();
        expect(await cartPage.getFirstCartItemName().getText()).toContain('Lamborghini');
    });

    it('should add product quantity in cart when product is already in cart and clicked on \'Add to Cart\' button',
        async () => {
            await productsPage.navigateTo();

            let addToCartButton = productsPage.getAddToCartButton();
            await addToCartButton.click();
            await addToCartButton.click();

            await productsPage.gotoCart();
            let quantity = await (await cartPage.getFirstCartItemQuantity().getText()).split(':')[1].trim();
            expect(+quantity).toBe(2);
        });

    it('should remove single quantity of product from cart when clicked on \'Remove Single Quantity\' button',
        async () => {
            await productsPage.navigateTo();

            let addToCartButton = productsPage.getAddToCartButton();
            await addToCartButton.click();
            await addToCartButton.click();

            await productsPage.gotoCart();
            await cartPage.clickRemoveSingleQuantityButtonForFirstItem();
            let quantity = await (await cartPage.getFirstCartItemQuantity().getText()).split(':')[1].trim();
            expect(+quantity).toBe(1);
        });

    it('should remove product from cart when clicked on \'Remove from Cart\' button', async () => {
        await productsPage.navigateTo();

        let addToCartButton = productsPage.getAddToCartButton();
        await addToCartButton.click();

        await productsPage.gotoCart();
        await cartPage.clickRemoveFromCartButtonForFirstItem();
        let products = await cartPage.getAllCartItems();
        expect(products.length).toBe(0);
    });

});