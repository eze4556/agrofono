import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTecComponent } from './consulta-tec.component';

describe('ConsultaTecComponent', () => {
  let component: ConsultaTecComponent;
  let fixture: ComponentFixture<ConsultaTecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaTecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
