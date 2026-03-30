import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttenduceComponent } from './view-attenduce.component';

describe('ViewAttenduceComponent', () => {
  let component: ViewAttenduceComponent;
  let fixture: ComponentFixture<ViewAttenduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAttenduceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAttenduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
