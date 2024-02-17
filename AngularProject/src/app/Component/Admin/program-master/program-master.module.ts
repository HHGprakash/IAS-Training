import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramMasterRoutingModule } from './program-master-routing.module';
import { ProgramMasterComponent } from './program-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [ProgramMasterComponent],
  imports: [
    CommonModule,
    ProgramMasterRoutingModule,
    FormsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ]
})
export class ProgramMasterModule { }
