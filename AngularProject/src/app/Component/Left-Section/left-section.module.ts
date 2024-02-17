import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminPanelComponent } from '../Admin/admin-panel/admin-panel.component';
import { TopSectionComponent } from '../top-section/top-section.component';
import { LeftSectionRoutingModule } from './left-section-routing.module';
import { LeftSectionComponent } from './left-section.component';



@NgModule({
  declarations: [
    LeftSectionComponent,
    TopSectionComponent
  ],
  imports: [
    CommonModule,
    LeftSectionRoutingModule
  ]
})
export class LeftSectionModule { }
