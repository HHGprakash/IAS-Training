import { TestBed } from '@angular/core/testing';

import { ForgetUsernameService } from './forget-username.service';

describe('ForgetUsernameService', () => {
  let service: ForgetUsernameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetUsernameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
