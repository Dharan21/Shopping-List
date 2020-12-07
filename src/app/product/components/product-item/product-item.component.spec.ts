import { Product } from './../../../shared/models/product.model';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ProductItemComponent } from './product-item.component';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.services';

// for Assignment 3, Date: 12/07/2020
describe('ProductItemComponent', () => {
    let fixture: ComponentFixture<ProductItemComponent>;
    let app: ProductItemComponent;
    const scServiceStub = () => ({
        addToCart: (product: Product) => ({})
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProductItemComponent],
            providers: [{
                provide: ShoppingCartService,
                useFactory: scServiceStub
            }]
        });
        fixture = TestBed.createComponent(ProductItemComponent);
        app = fixture.componentInstance;
        app.product = new Product('Test', 'Img', 10, 10);
        app.index = 0;
    });

    it('should create component', () => {
        expect(app).toBeTruthy();
    });

    it('should display the product', () => {
        fixture.detectChanges();
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h5').textContent).toContain(app.product.name);
        expect(compiled.querySelector('p').textContent).toContain(app.product.quantity.toString());
    });

    it('\'Add To Cart\' button should be disabed if the product quantity is 0', () => {
        app.product.quantity = 0;
        fixture.detectChanges();
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        const button = compiled.querySelector('button');
        expect(button.disabled).toBeTrue();
    });

    it('should add product to cart', () => {
        const scService = fixture.debugElement.injector.get(ShoppingCartService);
        const spy = spyOn(scService, 'addToCart').and.callThrough();
        app.onClick();
        expect(spy).toHaveBeenCalled();
    });
});
