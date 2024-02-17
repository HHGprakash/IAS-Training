import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsaRoutingModule } from './isa-routing.module';
import { IsaComponent } from '../isa/isa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TopSectionComponent } from '../../top-section/top-section.component';
import { TopSectionModule } from '../../top-section/top-section.module';

@NgModule({
  declarations: [IsaComponent],
  imports: [
    CommonModule,
    IsaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    TopSectionModule
  ]
})
export class IsaModule { }
