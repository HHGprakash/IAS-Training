import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantFinalRankingComponent } from './applicant-final-ranking.component';

describe('ApplicantFinalRankingComponent', () => {
  let component: ApplicantFinalRankingComponent;
  let fixture: ComponentFixture<ApplicantFinalRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantFinalRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantFinalRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
