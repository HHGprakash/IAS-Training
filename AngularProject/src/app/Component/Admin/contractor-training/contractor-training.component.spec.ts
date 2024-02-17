import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorTrainingComponent } from './contractor-training.component';

describe('ContractorTrainingComponent', () => {
  let component: ContractorTrainingComponent;
  let fixture: ComponentFixture<ContractorTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
