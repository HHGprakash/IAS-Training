import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractorTrainingComponent } from './contractor-training.component';

const routes: Routes = [
  {
    path:'',
    component:ContractorTrainingComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorTrainingRoutingModule { }
