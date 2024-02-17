import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingOfficerComponent } from './training-officer.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingOfficerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingOfficerRoutingModule { }
