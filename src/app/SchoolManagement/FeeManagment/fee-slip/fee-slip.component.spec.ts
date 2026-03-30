import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeSlipComponent } from './fee-slip.component';

describe('FeeSlipComponent', () => {
  let component: FeeSlipComponent;
  let fixture: ComponentFixture<FeeSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeSlipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
