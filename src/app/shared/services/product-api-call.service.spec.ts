import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { TestBed } from '@angular/core/testing';
import { ShoppingCartService } from './shopping-cart.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { Product } from '../models/product.model';

// for Assignment 5, Date: 12/14/2020
describe('ProductApiService', () => {
    let service: ProductApiService;

    beforeEach(() => {
        const scServiceStub = () => ({
            storeProducts: () => ({})
        });
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                ProductApiService,
                {
                    provide: ShoppingCartService,
                    useFactory: scServiceStub
                }
            ]
        });
        service = TestBed.inject(ProductApiService);
    });

    it('should create service', () => {
        expect(service).toBeTruthy();
    });

    it('should call http get method to obtain dummy data', (done) => {
        service.getDummyData().then((data) => {
            expect(data).toBeTruthy();
            done();
        });
    });

    it('should call http get method to obtain products', (done) => {
        service.fetchProducts().subscribe((data) => {
            expect(data).toBeTruthy();
            done();
        });
    });

});

// for Assignment 5, Date: 12/14/2020
describe('ProductApiService with Mock HTTP', () => {
    let service: ProductApiService;
    let httpClientSpy: { get: jasmine.Spy };
    class MockScService {
        storeProducts: () => ({})
    }

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        service = new ProductApiService(<any> httpClientSpy, new ShoppingCartService());
    });

    it('should not call http get method to obtain dummy data', (done) => {
        httpClientSpy.get.and.returnValue(of([{id: 1}]));
        service.getDummyData().then((data) => {
            expect(data).toBeTruthy();
            done();
        });
    });

    it('should not call http get method to obtain products', (done) => {
        httpClientSpy.get.and.returnValue(of([new Product('Test', 'TestImg', 10, 10, 1)]));
        service.fetchProducts().subscribe((data) => {
            expect(data).toBeTruthy();
            done();
        });
    });
})