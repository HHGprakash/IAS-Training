import { TestBed } from '@angular/core/testing';

import { SafetyLayoutService } from './safety-layout.service';

describe('SafetyLayoutService', () => {
  let service: SafetyLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafetyLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
