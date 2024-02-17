import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetUsernameComponent } from './forget-username.component';

const routes: Routes = [{
  path: '',
  component: ForgetUsernameComponent
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetUsernameRoutingModule { }
