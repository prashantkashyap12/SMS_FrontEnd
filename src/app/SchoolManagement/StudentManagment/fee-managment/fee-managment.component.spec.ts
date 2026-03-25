import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeManagmentComponent } from './fee-managment.component';

describe('FeeManagmentComponent', () => {
  let component: FeeManagmentComponent;
  let fixture: ComponentFixture<FeeManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
