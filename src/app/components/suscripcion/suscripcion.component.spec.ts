import { SuscripcionComponent } from './suscripcion.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';



describe('SubscripcionComponent', () => {
  let component: SuscripcionComponent;
  let fixture: ComponentFixture<SuscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscripcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
