import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContractorTrainingComponent } from './all-contractor-training.component';

describe('AllContractorTrainingComponent', () => {
  let component: AllContractorTrainingComponent;
  let fixture: ComponentFixture<AllContractorTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllContractorTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContractorTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
