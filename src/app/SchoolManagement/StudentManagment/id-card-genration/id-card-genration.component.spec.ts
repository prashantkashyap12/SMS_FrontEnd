import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdCardGenrationComponent } from './id-card-genration.component';

describe('IdCardGenrationComponent', () => {
  let component: IdCardGenrationComponent;
  let fixture: ComponentFixture<IdCardGenrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdCardGenrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdCardGenrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
