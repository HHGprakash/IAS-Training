import { TestBed } from '@angular/core/testing';

import { TrainingOfficerService } from './training-officer.service';

describe('TrainingOfficerService', () => {
  let service: TrainingOfficerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingOfficerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
