import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeStractureComponent } from './fee-stracture.component';

describe('FeeStractureComponent', () => {
  let component: FeeStractureComponent;
  let fixture: ComponentFixture<FeeStractureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeStractureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeStractureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
