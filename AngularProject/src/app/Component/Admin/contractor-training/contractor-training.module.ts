import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorTrainingRoutingModule } from './contractor-training-routing.module';
import { ContractorTrainingComponent } from './contractor-training.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [ContractorTrainingComponent],
  imports: [
    CommonModule,
    ContractorTrainingRoutingModule,
    FormsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),

  ]
})
export class ContractorTrainingModule { }
