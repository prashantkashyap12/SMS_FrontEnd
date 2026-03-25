import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttenduceMangerComponent } from './attenduce-manger.component';

describe('AttenduceMangerComponent', () => {
  let component: AttenduceMangerComponent;
  let fixture: ComponentFixture<AttenduceMangerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttenduceMangerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttenduceMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
