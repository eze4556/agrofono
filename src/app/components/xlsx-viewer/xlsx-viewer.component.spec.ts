import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsxViewerComponent } from './xlsx-viewer.component';

describe('XlsxViewerComponent', () => {
  let component: XlsxViewerComponent;
  let fixture: ComponentFixture<XlsxViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XlsxViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XlsxViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
