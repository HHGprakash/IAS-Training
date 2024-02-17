import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantDetailsRoutingModule } from './applicant-details-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LtcUserRoutingModule } from '../ltc-user/ltc-user-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ApplicantDetailsRoutingModule,
    FormsModule,
    LtcUserRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule.forRoot(),
  ]
})
export class ApplicantDetailsModule { }
