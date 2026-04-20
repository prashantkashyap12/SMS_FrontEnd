import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowKharchaComponent } from './show-kharcha.component';

describe('ShowKharchaComponent', () => {
  let component: ShowKharchaComponent;
  let fixture: ComponentFixture<ShowKharchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowKharchaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowKharchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
