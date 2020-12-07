import { ProductStartComponent } from './product-start.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

// for Assignment 3, Date: 12/07/2020
describe('ProductStartComponent', () => {
    let fixture: ComponentFixture<ProductStartComponent>;
    let app: ProductStartComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ProductStartComponent]
        });
        fixture = TestBed.createComponent(ProductStartComponent);
        app = fixture.componentInstance;
    });

    it('should create component', () => {
        expect(app).toBeTruthy();
    });

    it('should display text', () => {
        fixture.detectChanges();
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h3').textContent).toContain('Please select a product to edit');
    });

});
