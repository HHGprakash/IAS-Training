import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractorMasterComponent } from './contractor-master.component';

const routes: Routes = [
  {
    path:'',
    component:ContractorMasterComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorMasterRoutingModule { }
