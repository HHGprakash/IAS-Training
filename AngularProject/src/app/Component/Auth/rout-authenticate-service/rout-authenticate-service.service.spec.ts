import { TestBed } from '@angular/core/testing';

import { RoutAuthenticateServiceService } from './rout-authenticate-service.service';

describe('RoutAuthenticateServiceService', () => {
  let service: RoutAuthenticateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutAuthenticateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
