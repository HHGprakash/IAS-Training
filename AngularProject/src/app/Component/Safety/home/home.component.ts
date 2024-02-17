import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { CommonService } from 'src/app/Common/commonService';
import { dataConstant } from '../../../constant/dataConstant';
import { ContractorMasterService } from '../../Admin/contractor-master/contractor-master.service';
import { ContractorTrainingService } from '../../Admin/contractor-training/contractor-training.service';
import { ProgramMasterService } from '../../Admin/program-master/program-master.service';
import { IsaService } from '../isa/isa.service';
import { urlConstant } from '../../../constant/urlConstant';
import { forEach } from 'underscore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ObjIsa: any = {}; objdetail: any; objdetail1: any;
  modalRef: BsModalRef; modalReference: any;
  IsValid = false;
  ContractorMasterList: any[];
  ProgramMasterList: any[];

  constructor(private isaService: IsaService,
    private contractorTrainingService: ContractorTrainingService,
    private BsModalService: BsModalService,
    private toastr: ToastrService,
    private contractorMasterService: ContractorMasterService,
    private programMasterService: ProgramMasterService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.GetSortedContractorTraining();
  }

  LtcUserList: any = []; CandidateList: any = []; ContractorList: any = [];
  GetSortedContractorTraining() {
    this.contractorTrainingService.GetSortedContractorTraining().subscribe((response: any) => {

      this.LtcUserList = response.aspNetUsersViewModel;
      this.CandidateList = response.contractorTraining;
      this.CandidateList = _.sortBy(this.CandidateList, "TotalRank");
      this.objdetail1 = this.CandidateList;
    },
      error => {
        this.toastr.error("Error to get all user.");
      }
    );
  }

  //Valiadation
  isValidateForm(Home: NgForm) {
    this.IsValid = true;
    if (Home.invalid) {
      return;
    }
    return this.IsValid;
  }

  //View detail
  btnViewDetail(Home: NgForm, listisa: any, ViewDetails: TemplateRef<any>) {
    if (!this.isValidateForm(Home)) {
      return;
    }
    this.contractorMasterService.GetAllContractorMaster().subscribe((response: any) => {
      this.ContractorMasterList = response;    
      this.GetAllProgramMaster(ViewDetails);
    },
      error => {
        this.commonService.toastErrorMsg("Error", "Error to get Contractor Master.");
      }
    );
  }


  //Close Modal
  CloseModal() {
    this.modalRef.hide();
  }



  GetContractorTraining(ViewDetails: string | TemplateRef<any> | (new (...args: any[]) => any)) {
    this.isaService.GetContractorTraining(this.ObjIsa.Id).subscribe((response: any) => {
      this.GetSortedContractorTraining();
      if (response.status == "Success") {
        this.objdetail = response.data;
      
        this.objdetail.PassportPhotopath = urlConstant.ContractorTraining.PassportPhotoPath + "" + this.objdetail.id + "/" + this.objdetail.passportPhotoName;
        if (this.objdetail.passportPhotoName == null) {
          this.objdetail.PassportPhotopath = null;
        }

        if (this.ContractorMasterList && this.objdetail.contractorId != 'Select' && this.objdetail.contractorId)
          this.objdetail.contractorName = this.ContractorMasterList.filter(r => r.id == this.objdetail.contractorId)[0].contractorName;

       

        if (this.ContractorMasterList && this.objdetail.contractorId != 'Select' && this.objdetail.contractorId)
          this.objdetail.contractorName = this.ContractorMasterList.filter(r => r.id == this.objdetail.contractorId)[0].contractorName;

        this.objdetail.employment.forEach((obj: any) => {
          if (obj.fromMonth >= 0) {
            obj.fromMonth = dataConstant.Months[obj.fromMonth];
          }
          if (obj.toMonth >= 0) {
            obj.toMonth = dataConstant.Months[obj.toMonth];
          }
        })
        if (this.ProgramMasterList && this.objdetail.programApplyingId != 'Select' && this.objdetail.programApplyingId)
          this.objdetail.programApplying = this.ProgramMasterList.filter(x => x.id == this.objdetail.programApplyingId)[0].program;

        if (this.objdetail.additionalSkills) {
          this.objdetail.additionalSkills.forEach((obj: any) => {
            if (this.ProgramMasterList && obj.whichprogramme != 'Select' && obj.whichprogramme)
              obj.whichprogrammeName = this.ProgramMasterList.filter(r => r.id == obj.whichprogramme)[0].program;
          });
        }

        this.modalRef = this.BsModalService.show(ViewDetails, Object.assign({}, { class: 'gray modal-xl' }));
      }
      else {
        this.commonService.toastErrorMsg("Error", "Record not found");
      }
    }, error => {
      this.commonService.toastErrorMsg('Error', "Error to get Data");
    });
  }

  openPassportPhoto() {
    let url = this.objdetail.PassportPhotopath
    if (url != null) {
      window.open(url, '_blank');
    }
  }

  GetAllProgramMaster(ViewDetails: TemplateRef<any>) {
    this.programMasterService.GetAllProgramMaster().subscribe((response: any) => {
      this.ProgramMasterList = response;
      this.GetContractorTraining(ViewDetails)
    },
      error => {
        this.commonService.toastErrorMsg("Error", "Error to get all user.");
      }
    );
  }

  DownloadFile(fileName: string, fileURL: any, FileExt: string) {
    var FinalUrl = fileURL;

    const isIEOrEdge = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
    if (isIEOrEdge) {
      var _window = window.open(urlConstant.ContractorTraining.Documents + FinalUrl, '_blank');
      if (_window != null) {
        _window.document.close();
      }
      if (FileExt == 'doc' || FileExt == 'docx') {
        if (_window != null) {
          _window.document.execCommand('Save', true, fileName || urlConstant.ContractorTraining.Documents + FinalUrl)
        }
      } else {
        if (_window != null) {
          _window.document.execCommand('SaveAs', true, fileName || urlConstant.ContractorTraining.Documents + FinalUrl)
        }
      }
      if (_window != null) {
        _window.close();
      }
    } else {
      var link = document.createElement("a");
      link.download = fileName;
      link.href = urlConstant.ContractorTraining.Documents + FinalUrl;
      window.open(link.href, "_blank");
    }
  }

}
