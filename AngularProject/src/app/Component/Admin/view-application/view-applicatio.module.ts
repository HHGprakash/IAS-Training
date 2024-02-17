import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewApplicatioRoutingModule } from './view-applicatio-routing.module';
import { ViewApplicationComponent } from './view-application.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    ViewApplicationComponent
  ],
  imports: [
    CommonModule,
    ViewApplicatioRoutingModule,
    FormsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})
export class ViewApplicatioModule { }
