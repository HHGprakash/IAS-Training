import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsaComponent } from './isa.component';

const routes: Routes = [
  {
    path: '',
    component: IsaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IsaRoutingModule { }
