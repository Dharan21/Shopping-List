import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NgxSpinnerService } from 'ngx-spinner';

import { ProductMainComponent } from './product-main.component';
import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from 'src/app/shared/models/product.model';

describe('ProductMainComponent', () => {

    let fixture: ComponentFixture<ProductMainComponent>;
    let app: ProductMainComponent;

    beforeEach(() => {
        const apiServiceStub = () => ({
            fetchProducts: () => ({ subscribe: () => ({ unsubscribe: () => ({}) }) })
        });
        const scServiceStub = () => ({
            getProducts: () => ([])
        });
        const spinnerServiceStub = () => ({
            show: () => ({}),
            hide: () => ({})
        });
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ProductMainComponent],
            providers: [
                {
                    provide: ProductApiService,
                    useFactory: apiServiceStub
                },
                {
                    provide: ShoppingCartService,
                    useFactory: scServiceStub
                },
                {
                    provide: NgxSpinnerService,
                    useFactory: spinnerServiceStub
                }
            ]
        });
        fixture = TestBed.createComponent(ProductMainComponent);
        app = fixture.componentInstance;
    });

    it('should create component', () => {
        expect(app).toBeTruthy();
    });

    it('should run #ngOnInit when products count is 0', () => {
        const apiService = fixture.debugElement.injector.get(ProductApiService);
        const spy = spyOn(apiService, 'fetchProducts').and.callThrough();
        app.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should run #ngOnInit when products count is grater than 0', () => {
        const scService = fixture.debugElement.injector.get(ShoppingCartService);
        const apiService = fixture.debugElement.injector.get(ProductApiService);
        spyOn(scService, 'getProducts').and.returnValue([new Product('Test', 'TestImageUrl', 10, 10)]);
        const spy = spyOn(apiService, 'fetchProducts').and.callThrough();
        app.ngOnInit();
        expect(spy).not.toHaveBeenCalled();
    });

});

// for Assignment 4, Date: 12/09/2020
describe('ProductMainComponent with Mock services with classes', () => {
    class MockApiService {
        fetchProducts = () => ({ subscribe: () => ({ unsubscribe: () => ({}) }) });
    }
    class MockScService {
        getProducts = () => ([]);
    }
    class MockSpinnerService {
        show = () => ({});
        hide = () => ({});
    }
    let fixture: ComponentFixture<ProductMainComponent>;
    let app: ProductMainComponent;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ProductMainComponent],
            providers: [
                {
                    provide: ProductApiService,
                    useClass: MockApiService
                },
                {
                    provide: ShoppingCartService,
                    useClass: MockScService
                },
                {
                    provide: NgxSpinnerService,
                    useClass: MockSpinnerService
                }
            ]
        });
        fixture = TestBed.createComponent(ProductMainComponent);
        app = fixture.componentInstance;
    });

    it('should create component', () => {
        expect(app).toBeTruthy();
    });

    it('should call #ngOnInit', () => {
        const spy = spyOn(app, 'ngOnInit').and.callThrough();
        app.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should call #fetchProducts when products count is 0', () => {
        const apiService = fixture.debugElement.injector.get(ProductApiService);
        const spy = spyOn(apiService, 'fetchProducts').and.callThrough();
        app.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it(`shouldn't call #fetchProducts when products count is grater than 0`, () => {
        const scService = fixture.debugElement.injector.get(ShoppingCartService);
        const apiService = fixture.debugElement.injector.get(ProductApiService);
        spyOn(scService, 'getProducts').and.returnValue([new Product('Test', 'TestImageUrl', 10, 10)]);
        const spy = spyOn(apiService, 'fetchProducts').and.callThrough();
        app.ngOnInit();
        expect(spy).not.toHaveBeenCalled();
    });
});
