import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDocComponent } from './student-doc.component';

describe('StudentDocComponent', () => {
  let component: StudentDocComponent;
  let fixture: ComponentFixture<StudentDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
