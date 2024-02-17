import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeftSectionComponent } from './left-section.component';

const routes: Routes = [
  {
    path: '',
    component: LeftSectionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeftSectionRoutingModule { }
