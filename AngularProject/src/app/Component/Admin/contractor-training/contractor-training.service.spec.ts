import { TestBed } from '@angular/core/testing';

import { ContractorTrainingService } from './contractor-training.service';

describe('ContractorTrainingService', () => {
  let service: ContractorTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractorTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
