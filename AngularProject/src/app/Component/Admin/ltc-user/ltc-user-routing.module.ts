import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LtcUserComponent } from './ltc-user.component';

const routes: Routes = [
  {
    path: '',
    component: LtcUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LtcUserRoutingModule { }
