import { Observable } from 'rxjs';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {

    let fixture: ComponentFixture<HeaderComponent>;
    let app: HeaderComponent;
    const apiServiceStub = () => ({
        fetchProducts: (): Observable<any> => new Observable()
    });

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

});
