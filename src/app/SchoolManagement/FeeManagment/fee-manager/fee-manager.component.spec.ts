import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeManagerComponent } from './fee-manager.component';

describe('FeeManagerComponent', () => {
  let component: FeeManagerComponent;
  let fixture: ComponentFixture<FeeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
