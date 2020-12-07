import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

    let fixture: ComponentFixture<HeaderComponent>;
    let app: HeaderComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
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

});
