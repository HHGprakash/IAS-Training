import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafetyRoutingModule } from './safety-routing.module';
import { SafetyLayoutComponent } from './safety-layout/safety-layout.component';


@NgModule({
  declarations: [
    SafetyLayoutComponent
  ],
  imports: [
    CommonModule,
    SafetyRoutingModule
  ]
})
export class SafetyModule { }
