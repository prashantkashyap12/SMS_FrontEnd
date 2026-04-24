import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintKharchaComponent } from './print-kharcha.component';

describe('PrintKharchaComponent', () => {
  let component: PrintKharchaComponent;
  let fixture: ComponentFixture<PrintKharchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintKharchaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrintKharchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
