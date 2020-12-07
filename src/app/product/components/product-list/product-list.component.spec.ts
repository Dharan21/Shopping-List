import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.services';
import { Product } from 'src/app/shared/models/product.model';

// for Assignment 3, Date: 12/07/2020
describe('ProductListComponent', () => {
    let fixture: ComponentFixture<ProductListComponent>;
    let app: ProductListComponent;

    const scServiceStub = () => ({
        getProducts: () => ([new Product('Test', 'Img', 10, 10)]),
        productsChanged: ({ subscribe: () => ({}) })
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProductListComponent],
            providers: [
                {
                    provide: ShoppingCartService,
                    useFactory: scServiceStub
                }
            ]
        });
        fixture = TestBed.createComponent(ProductListComponent);
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

    it('should display product details', () => {
        app.ngOnInit();
        fixture.detectChanges();
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-product-item')).toBeTruthy();
    });

    it('should not display product details', () => {
        const scService = fixture.debugElement.injector.get(ShoppingCartService);
        spyOn(scService, 'getProducts').and.returnValue([]);
        app.ngOnInit();
        fixture.detectChanges();
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('app-product-item')).not.toBeTruthy();
    });

});
