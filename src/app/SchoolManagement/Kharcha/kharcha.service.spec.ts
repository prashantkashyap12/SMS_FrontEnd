import { TestBed } from '@angular/core/testing';

import { KharchaService } from './kharcha.service';

describe('KharchaService', () => {
  let service: KharchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KharchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
