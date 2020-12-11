import { Product } from '../models/product.model';
import { ShoppingCartService } from './shopping-cart.service';

// Assignment 5 12/11/2020
describe('Shopping Cart Service', () => {
    let service: ShoppingCartService;
    beforeEach(() => {
        service = new ShoppingCartService();
        service.products = [new Product('Test', 'TestImg', 10, 10, 1), new Product('Test2', 'TestImg2', 10, 1, 2)];
    });

    it('#getProducts should return product list', () => {
        const products = service.getProducts();
        expect(products).toEqual(service.products);
    });

    it('#storeProducts should store products in the service', () => {
        const products = [new Product('Test', 'TestImg', 10, 1)];
        service.storeProducts(products);
        expect(service.products).toEqual(products);
    });

    it('#getProductsByIndex should return product on given index', () => {
        const product = service.getProductByIndex(0);
        expect(service.products[0]).toEqual(product);
    });

    describe('#getProductByName', () => {
        it('#getProductByName should return product with given name if found', () => {
            const product = service.getProductByName(service.products, 'Test');
            expect(product).toEqual(service.products[0]);
        });
    
        it('#getProductByName should return null if product not found', () => {
            const product = service.getProductByName(service.products, 'Test3');
            expect(product).toBeNull();
        });
    });
    
    describe('#getProductById', () => {
        it('#getProductById should return product with given id if found', () => {
            const product = service.getProductById(service.products, 1);
            expect(product).toEqual(service.products[0]);
        });
    
        it('#getProductById should return null if product not found', () => {
            const product = service.getProductById(service.products, 3);
            expect(product).toBeNull();
        });
    });

    it('#getCartItems should return product list in cart', () => {
        const products = service.getCartItems();
        expect(products).toEqual(service.cartItems);
    });

    describe('#addToCart', () => {
        it('#addToCart Should Add Products to cart', () => {
            service.addToCart(service.products[0]);
            const cartItems = [{...service.products[0], quantity: 1}];
            expect(JSON.stringify(service.cartItems)).toEqual(JSON.stringify(cartItems));
        });
    
        it('#addToCart Should increase products quantity in cart if already found', () => {
            service.addToCart(service.products[0]);
            service.addToCart(service.products[0]);
            const cartItems = [{...service.products[0], quantity: 2}];
            expect(JSON.stringify(service.cartItems)).toEqual(JSON.stringify(cartItems));
        });
    
        it('#addToCart Should reduce product quantity by 1 in products', () => {
            const updatedQuantity = service.products[0].quantity - 1;
            service.addToCart(service.products[0]);
            expect(service.products[0].quantity).toEqual(updatedQuantity);
        });
    });
   
});