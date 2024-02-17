import { TestBed } from '@angular/core/testing';

import { LtcUserService } from './ltc-user.service';

describe('LtcUserService', () => {
  let service: LtcUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LtcUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
