import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasTecnicosComponent } from './consultas-tecnicos.component';

describe('ConsultasTecnicosComponent', () => {
  let component: ConsultasTecnicosComponent;
  let fixture: ComponentFixture<ConsultasTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultasTecnicosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultasTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
