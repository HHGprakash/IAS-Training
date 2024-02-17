import { TestBed } from '@angular/core/testing';

import { LtcResultService } from './ltc-result.service';

describe('LtcResultService', () => {
  let service: LtcResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LtcResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
