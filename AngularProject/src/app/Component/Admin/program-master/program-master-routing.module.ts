import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramMasterComponent } from './program-master.component';

const routes: Routes =  [
  {
    path:'',
    component:ProgramMasterComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramMasterRoutingModule { }
