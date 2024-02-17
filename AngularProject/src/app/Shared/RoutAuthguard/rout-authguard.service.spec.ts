import { TestBed } from '@angular/core/testing';

import { RoutAuthguardService } from './rout-authguard.service';

describe('RoutAuthguardService', () => {
  let service: RoutAuthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutAuthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
