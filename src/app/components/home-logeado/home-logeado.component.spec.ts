import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLogeadoComponent } from './home-logeado.component';

describe('HomeLogeadoComponent', () => {
  let component: HomeLogeadoComponent;
  let fixture: ComponentFixture<HomeLogeadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLogeadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeLogeadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
