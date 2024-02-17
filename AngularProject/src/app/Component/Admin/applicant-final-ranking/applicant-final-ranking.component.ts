import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../Common/commonService';
import { ContractorTrainingService } from '../contractor-training/contractor-training.service';
import * as _ from 'underscore';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-applicant-final-ranking',
  templateUrl: './applicant-final-ranking.component.html',
  styleUrls: ['./applicant-final-ranking.component.scss']
})
export class ApplicantFinalRankingComponent implements OnInit {

  Application: any = {};
  Ranks: any = [];
  Total: any = 0;
  @ViewChild('epltable') epltable: ElementRef;

  constructor(private contractorTrainingService: ContractorTrainingService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService) { }


  ngOnInit(): void {
    var ApplicantId = this.route.snapshot.paramMap.get('ApplicantId');
    this.GetSingleContractorTraining(ApplicantId);
  }


  GetSingleContractorTraining(ApplicantId: any) {
    this.contractorTrainingService.GetSingleContractorTraining(ApplicantId).subscribe((response: any) => {
      this.Application = response;
      this.Application.qualification = ""
      _.each(this.Application.education, (obj: any) => {
        if (obj.qualification) {
          if (this.Application.qualification == "") {
            this.Application.qualification = obj.qualification;
          }
          else {
            this.Application.qualification = this.Application.qualification.concat(",", obj.qualification);
          }
        }
      });

      this.Ranks = this.commonService.GetRanking(this.Application);
      _.each(this.Ranks, (item: any) => {
        if (item.value)
          this.Total += item.value;
      });
    },
      Error => {
        this.commonService.toastErrorMsg('Error', "Error to get Data");
      }
    );
  }

  exportToExcel() {    
    setTimeout(() => {
      const ws: xlsx.WorkSheet =
        xlsx.utils.table_to_sheet(this.epltable.nativeElement);
      delete (ws['1'])
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      xlsx.writeFile(wb, "excel-" + new Date().getTime() + '.xlsx');      
    })
  }
}
