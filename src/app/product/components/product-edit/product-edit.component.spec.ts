import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

import { ProductEditComponent } from './product-edit.component';

// for Assignment 3, Date: 12/07/2020
describe('ProductEditComponent', () => {
    let fixture: ComponentFixture<ProductEditComponent>;
    let app: ProductEditComponent;
    const scServiceStub = () => ({
        getProductByIndex: (index: number) => new Product('Test', 'Img', 10, 10)
    });
    const activatedRouteStub = () => ({
        params: of({ id: 1 })
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProductEditComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useFactory: activatedRouteStub
                },
                {
                    provide: ShoppingCartService,
                    useFactory: scServiceStub
                }
            ],
            imports: [RouterTestingModule]
        });
        fixture = TestBed.createComponent(ProductEditComponent);
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

    it('edit mode should be true when there is id inside activate route', () => {
        app.ngOnInit();
        expect(app.editMode).toBeTrue();
    });

    it('edit mode should be false when there is no id inside activate route', () => {
        const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
        activatedRoute.params = of();
        app.ngOnInit();
        expect(app.editMode).not.toBeTrue();
    });

});
