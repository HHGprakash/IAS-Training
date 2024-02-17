import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorMasterRoutingModule } from './contractor-master-routing.module';
import { ContractorMasterComponent } from './contractor-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [ContractorMasterComponent],
  imports: [
    CommonModule,
    ContractorMasterRoutingModule,
    FormsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})
export class ContractorMasterModule { }
