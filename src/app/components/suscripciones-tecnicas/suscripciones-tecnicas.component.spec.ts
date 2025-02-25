import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionesTecnicasComponent } from './suscripciones-tecnicas.component';

describe('SuscripcionesTecnicasComponent', () => {
  let component: SuscripcionesTecnicasComponent;
  let fixture: ComponentFixture<SuscripcionesTecnicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscripcionesTecnicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuscripcionesTecnicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
