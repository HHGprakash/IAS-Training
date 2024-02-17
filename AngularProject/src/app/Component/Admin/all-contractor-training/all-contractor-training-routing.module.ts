import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllContractorTrainingComponent } from './all-contractor-training.component';

const routes: Routes = [
  {
    path: '',
    component: AllContractorTrainingComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllContractorTrainingRoutingModule { }
