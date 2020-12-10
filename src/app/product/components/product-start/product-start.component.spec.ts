import { ProductStartComponent } from './product-start.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AuthServiceForUnitTesting } from './auth-service-for-unit-testing.service';

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

// for Assignment 4, Date: 12/09/2020
describe('ProductStartComponent With Mock Service', () => {
    let app: ProductStartComponent;
    let authService: AuthServiceForUnitTesting;

    beforeEach(() => {
        authService = new AuthServiceForUnitTesting();
        app = new ProductStartComponent(authService);
    });

    afterEach(() => {
        localStorage.removeItem('token');
        app = null;
        authService = null;
    });

    it('#isLoggedIn should return correct user login status', () => {
        localStorage.setItem('token', 'Test');
        let isLoggedIn = app.isLoggedIn();
        expect(isLoggedIn).toBeTrue();
        localStorage.removeItem('token');
        isLoggedIn = app.isLoggedIn();
        expect(isLoggedIn).not.toBeTrue();
    });

    it('#isLoggedIn should call #isAuthenticated of service', () => {
        const spy = spyOn(authService, 'isAuthenticated').and.callThrough();
        app.isLoggedIn();
        expect(spy).toHaveBeenCalled();
    });

});
