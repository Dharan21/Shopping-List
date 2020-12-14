import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductApiService } from 'src/app/shared/services/product-api-call.service';
import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

    let fixture: ComponentFixture<HeaderComponent>;
    let app: HeaderComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductApiService],
            declarations: [HeaderComponent]
        });
        fixture = TestBed.createComponent(HeaderComponent);
        app = fixture.componentInstance;
    });

    it('should create component', () => {
        expect(app).toBeTruthy();
    });

    // for Assignment 3, Date: 12/07/2020
    it('should contains nav links', () => {
        expect(app.navMenu).toBeTruthy();
        expect(app.navMenu.map(x => x.text)).toContain('Products');
        expect(app.navMenu.map(x => x.text)).toContain('Cart');
    });

    it('should display nav links', () => {
        fixture.detectChanges();
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        const links = compiled.getElementsByClassName('nav-link');
        const linksArray = [].slice.call(links).map(x => x.textContent);
        expect(linksArray).toContain('Products');
        expect(linksArray).toContain('Cart');
    });

    // for Assignment 6, Date: 12/14/2020
    it('Auth Lable should be changed to \'Logout\' | jasmine.done', (done) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('nav > div > div').textContent.trim()).toBe('Login');
        let service = fixture.debugElement.injector.get(ProductApiService);
        let spy = spyOn(service, 'asyncMethodForUnitTesting').and.returnValue(Promise.resolve(true));
        app.ngOnInit();
        spy.calls.mostRecent().returnValue.then(() => {
            fixture.detectChanges();
            compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('nav > div > div').textContent.trim()).toBe('Logout');
            done();
        });
    });

    it('Auth Lable should be changed to \'Logout\' | async() and whenStable()', async(() => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('nav > div > div').textContent.trim()).toBe('Login');
        let service = fixture.debugElement.injector.get(ProductApiService);
        spyOn(service, 'asyncMethodForUnitTesting').and.returnValue(Promise.resolve(true));
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('nav > div > div').textContent.trim()).toBe('Logout');
        });
        app.ngOnInit();
    }));

    it('should get dummy data | jasmine.done', (done) => {
        let service = fixture.debugElement.injector.get(ProductApiService);
        let spy = spyOn(service, 'getDummyData').and.returnValue(Promise.resolve([{ id: 1 }]));
        app.getDummyData();
        spy.calls.mostRecent().returnValue.then(() => {
            expect(app.dummyData).toEqual([{ id: 1 }]);
            done();
        });
    })

    it('should get dummy data | async() and whenStable()', async () => {
        let service = fixture.debugElement.injector.get(ProductApiService);
        spyOn(service, 'getDummyData').and.returnValue(Promise.resolve([{ id: 1 }]));
        app.getDummyData();
        fixture.whenStable().then(() => {
            expect(app.dummyData).toEqual([{ id: 1 }]);
        });
    })

    it('should get dummy data | fakeAsync() and tick()', fakeAsync(() => {
        let service = fixture.debugElement.injector.get(ProductApiService);
        spyOn(service, 'getDummyData').and.returnValue(Promise.resolve([{ id: 1 }]));
        app.getDummyData();
        tick();
        expect(app.dummyData).toEqual([{ id: 1 }]);
    }));

});
