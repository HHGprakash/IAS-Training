import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LtcUserRoutingModule } from './ltc-user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LtcUserComponent } from './ltc-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [LtcUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    LtcUserRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule.forRoot(),
  ],

providers: [
    DatePipe,
  ]
})
export class LtcUserModule { }
