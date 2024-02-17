import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LtcResultComponent } from './ltc-result.component';

const routes: Routes = [
  {
    path: '',
    component: LtcResultComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LtcResultRoutingModule { }
