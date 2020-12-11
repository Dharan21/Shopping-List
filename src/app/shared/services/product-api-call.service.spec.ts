import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Product } from '../models/product.model';
describe('ProductApiService', () => {
    let service: ProductApiService;

    beforeEach(() => {
        const scServiceStub = () => ({
            storeProducts: () => ({})
        });
        const httpStub = () => ({
            get: (url: string) => of()
        });
        TestBed.configureTestingModule({
            providers: [
                ProductApiService,
                {
                    provide: ShoppingCartService,
                    useFactory: scServiceStub
                },
                {
                    provide: HttpClient,
                    useFactory: httpStub
                }
            ]
        });
        service = TestBed.inject(ProductApiService);
    });

    // it('fake api call to get products', () => {
        
    //     const products = [new Product('Test', 'TestImg', 10, 10, 1),
    //         new Product('Test2', 'TestImg2', 10, 1, 2)];
    //     const httpClientSpy: { get: jasmine.Spy } = jasmine.createSpyObj('HttpClient', ['get']);
    //     httpClientSpy.get.and.returnValue(of(products));
    //     service.fetchProducts();
    //     expect(httpClientSpy.get.calls.count()).toBe(1);
    // });
});