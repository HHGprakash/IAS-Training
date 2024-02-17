import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ApplicantFinalRankingRoutingModule } from './applicant-final-ranking-routing.module';
import { ApplicantFinalRankingComponent } from './applicant-final-ranking.component';


@NgModule({
  declarations: [
    ApplicantFinalRankingComponent
  ],
  imports: [
    CommonModule,
    ApplicantFinalRankingRoutingModule,    
  ]
})
export class ApplicantFinalRankingModule { }
