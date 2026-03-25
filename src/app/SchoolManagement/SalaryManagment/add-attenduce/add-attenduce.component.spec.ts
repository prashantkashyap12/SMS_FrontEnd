import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttenduceComponent } from './add-attenduce.component';

describe('AddAttenduceComponent', () => {
  let component: AddAttenduceComponent;
  let fixture: ComponentFixture<AddAttenduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAttenduceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAttenduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
