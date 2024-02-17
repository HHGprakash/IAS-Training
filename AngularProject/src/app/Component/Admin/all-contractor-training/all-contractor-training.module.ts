import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllContractorTrainingRoutingModule } from './all-contractor-training-routing.module';
import { AllContractorTrainingComponent } from './all-contractor-training.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AllContractorTrainingComponent
  ],
  imports: [
    CommonModule,
    AllContractorTrainingRoutingModule,
    FormsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})
export class AllContractorTrainingModule { }
