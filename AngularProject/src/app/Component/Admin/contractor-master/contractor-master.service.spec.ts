import { TestBed } from '@angular/core/testing';

import { ContractorMasterService } from './contractor-master.service';

describe('ContractorMasterService', () => {
  let service: ContractorMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
