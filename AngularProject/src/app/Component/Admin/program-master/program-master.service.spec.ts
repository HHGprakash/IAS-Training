import { TestBed } from '@angular/core/testing';

import { ProgramMasterService } from './program-master.service';

describe('ProgramMasterService', () => {
  let service: ProgramMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
