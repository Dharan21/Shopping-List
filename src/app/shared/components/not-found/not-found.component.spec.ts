import { NotFoundComponent } from './not-found.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

describe('NotFoundComponent', () => {

    let fixture: ComponentFixture<NotFoundComponent>;
    let app: NotFoundComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NotFoundComponent]
        });
        fixture = TestBed.createComponent(NotFoundComponent);
        app = fixture.componentInstance;
    });

    it('should create component', () => {
        expect(app).toBeTruthy();
    });

    it('should render not found text', () => {
        fixture.detectChanges();
        const htmlElement = fixture.debugElement.nativeElement;
        expect(htmlElement.querySelector('h2').textContent).toContain('not found');
    });

});
