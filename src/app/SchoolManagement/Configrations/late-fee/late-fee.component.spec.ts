import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateFeeComponent } from './late-fee.component';

describe('LateFeeComponent', () => {
  let component: LateFeeComponent;
  let fixture: ComponentFixture<LateFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateFeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LateFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
