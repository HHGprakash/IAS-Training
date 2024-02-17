import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeftSectionComponent } from '../Left-Section/left-section.component';
import { TopSectionComponent } from '../top-section/top-section.component';
import { TopSectionModule } from '../top-section/top-section.module';
import { AdminRoutingModule } from './admin-routing.module';
import { TrainingOfficerComponent } from './training-officer/training-officer.component';
import { ApplicantDetailsComponent } from './applicant-details/applicant-details.component';





@NgModule({
  declarations: [
    LeftSectionComponent, TrainingOfficerComponent, ApplicantDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TopSectionModule
  ]
})
export class AdminModule { }
