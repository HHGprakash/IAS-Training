import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopSectionRoutingModule } from './top-section-routing.module';
import { TopSectionComponent } from './top-section.component';


@NgModule({
  declarations: [
    TopSectionComponent
  ],
  imports: [
    CommonModule,
    TopSectionRoutingModule
  ],
  exports: [TopSectionComponent]
})
export class TopSectionModule { }
