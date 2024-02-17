import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingOfficerComponent } from './training-officer.component';

describe('TrainingOfficerComponent', () => {
  let component: TrainingOfficerComponent;
  let fixture: ComponentFixture<TrainingOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
