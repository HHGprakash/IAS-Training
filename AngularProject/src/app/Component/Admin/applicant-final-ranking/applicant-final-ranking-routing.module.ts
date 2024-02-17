import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantFinalRankingComponent } from './applicant-final-ranking.component';

const routes: Routes = 
  [
    {
       path: '',
      component: ApplicantFinalRankingComponent
    }
    ,
    {
      path: ':ApplicantId',
      component: ApplicantFinalRankingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantFinalRankingRoutingModule { }
