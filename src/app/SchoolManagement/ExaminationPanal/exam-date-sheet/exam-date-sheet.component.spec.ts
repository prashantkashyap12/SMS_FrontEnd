import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDateSheetComponent } from './exam-date-sheet.component';

describe('ExamDateSheetComponent', () => {
  let component: ExamDateSheetComponent;
  let fixture: ComponentFixture<ExamDateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamDateSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamDateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
