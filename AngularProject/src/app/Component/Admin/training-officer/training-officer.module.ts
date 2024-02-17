import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingOfficerRoutingModule } from './training-officer-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TrainingOfficerRoutingModule,
    NgbModule,
    ModalModule.forRoot(),
  ]
})
export class TrainingOfficerModule { }
