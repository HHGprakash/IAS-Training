import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LtcResultRoutingModule } from './ltc-result-routing.module';
import { LtcResultComponent } from './ltc-result.component';

@NgModule({
  declarations: [LtcResultComponent],
  imports: [
    CommonModule,
    LtcResultRoutingModule,    
    FormsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class LtcResultModule { }
