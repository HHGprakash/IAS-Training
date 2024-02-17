import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/Common/commonService';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ContractorTrainingService } from './../contractor-training/contractor-training.service';
import { ActivatedRoute, Router } from '@angular/router'; import { dataConstant } from '../../../constant/dataConstant';
import * as _ from 'underscore';
import { ContractorMasterService } from '../contractor-master/contractor-master.service';
import { ProgramMasterService } from '../program-master/program-master.service';
import { urlConstant } from '../../../constant/urlConstant';
import { ToastrService } from 'ngx-toastr';
import * as xlsx from 'xlsx';
import { AllContractorTrainingService } from './all-contractor-training.service';
import { lutimes } from 'fs';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-all-contractor-training',
  templateUrl: './all-contractor-training.component.html',
  styleUrls: ['./all-contractor-training.component.scss']
})
export class AllContractorTrainingComponent implements OnInit {

  modalRef: BsModalRef;
  ContractorList: any[] = []; objContractor: any = {};
  isStatus: any = ""; status: any = ""; IsValid = false;
  userrole = JSON.parse(localStorage.getItem('currentUser') || '{}').userRoleName;
  IsDisplay: boolean; contra: any; age: any; date: any; IsShow: any; IsRanking: any;
  ltcMemberId = JSON.parse(localStorage.getItem('currentUser') || '{}').currentMemberId;
  SaveRank: any = { CurrentMemberId: this.ltcMemberId };
  ContractorMasterList: any[];
  ProgramMasterList: any[];
  isShowAction = true;
  objFilter: any = {
    Year: null,
    Gender: null,
    Country: null,
    CountryOfNationality:null,
    ProgramName: null,
    ContractorName: null,
    Region: null,
    Classification: null,
  };
  TempAllContractorTraining: any[] = [];
  ClassificationList: any[];
  Countries: any[];
  CountryGroupList: any = [];
  ProgramYear: any = [];
  IsShowAddDocumentBtn :any =0;
  IsApproveReject :boolean =false;
  CountryOfNationalityList: any[];
  IsDisplayImg = true;

  @ViewChild('epltable') epltable: ElementRef;

  constructor(private contractorTrainingService: ContractorTrainingService,
    private modalService: NgbModal,
    private BsModalService: BsModalService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private contractorMasterService: ContractorMasterService,
    private allContractorTrainingService: AllContractorTrainingService,
    private programMasterService: ProgramMasterService,
    private commonService: CommonService,
    private router: Router,) {
    if (this.activatedRoute.snapshot.params["Id"] != undefined) {
      this.objContractor.Id = this.activatedRoute.snapshot.params["Id"];
      this.GetContractorTrainingById();
    }
    this.GetAllContractorMaster();

  }

  ngOnInit(): void {
    if (this.userrole == "TrainingOfficer") this.IsDisplay = true;
    else this.IsDisplay = false;

    if (this.userrole == "LtcUser" || this.userrole == "Admin") this.IsShow = true;
    else this.IsShow = false;

    if (this.userrole == "LtcUser") this.IsRanking = true;
    else this.IsRanking = false;

    if (this.userrole == 'Admin')
      this.IsApproveReject = true;
    else this.IsApproveReject = false;

    this.ProgramYear = this.commonService.GetYearRange(2018, 2030);


    this.GetAllCountries();
    this.onChangeCountryGroup(null);

    //this.GetSortedContractorTraining();
    this.GetAllContractorTraining();

  }

  getDiffDays(sDate: any, eDate: any) {
    var startDate = new Date(sDate);
    var endDate = new Date(eDate);
    var Time = endDate.getFullYear() - startDate.getFullYear();
    return Time;
  }

  LtcUserList: any = []; SortedContractorTraining: any = []; CandidateList: any = [];
  GetSortedContractorTraining() {
    this.contractorTrainingService.GetSortedContractorTraining().subscribe((response: any) => {
      this.LtcUserList = response.aspNetUsersViewModel;
      this.CandidateList = response.contractorTraining;
      this.CandidateList = _.sortBy(this.CandidateList, "TotalRank");
      this.ContractorList = this.CandidateList;

      this.ContractorList.forEach((item: any) => {
        if (item.comments) {
          item.comments = item.comments.replace(/•/g, '<br/>•').replace('<br/>', '');
        }
      });
    },
      error => {
        this.toastr.error("Error to get all user.");
      }
    );
  }

  openModalWithref(template: TemplateRef<any>, constructor: any) {
    //var link = "admin/ViewApplication/" + constructor.id;

    //this.router.navigate(["admin/ViewApplication",constructor.id]);
    //this.router.navigate([]).then(result => { window.open(link, '_blank'); });

    // this.router.navigate(["admin/ViewApplication",constructor.id]).then(result => {  window.open('_blank'); });


    //this.router.navigateByUrl('/ViewApplication')
    //this.GetSortedContractorTraining();
    this.contractorTrainingService.GetSingleContractorTraining(constructor.id).subscribe((response: any) => {
      this.objContractor = response;

      this.objContractor.PassportPhotopath = urlConstant.ContractorTraining.PassportPhotoPath + "" + this.objContractor.id + "/" + this.objContractor.passportPhotoName;
      if (this.objContractor.passportPhotoName == null) {
        this.objContractor.PassportPhotopath = null;
      }

      this.objContractor.employment.forEach((obj: any) => {
        if (obj.fromMonth >= 0) {
          obj.fromMonthName = dataConstant.Months[obj.fromMonth];
        }
        if (obj.toMonth >= 0) {
          obj.toMonthName = dataConstant.Months[obj.toMonth];
        }
      })
      this.age = this.commonService.getAge(this.objContractor.dateofBirth);
      if (this.ContractorMasterList && this.objContractor.contractorId != 'Select' && this.objContractor.contractorId) {
        if (this.ContractorMasterList.filter(r => r.id == this.objContractor.contractorId).length > 0) {
          this.objContractor.contractorName = this.ContractorMasterList.filter(r => r.id == this.objContractor.contractorId)[0].contractorName;
        }
      }
      if (this.ProgramMasterList && this.objContractor.programApplyingId != 'Select' && this.objContractor.programApplyingId)
        this.objContractor.programApplying = this.ProgramMasterList.filter(x => x.id == this.objContractor.programApplyingId)[0].program;

      if (this.objContractor.additionalSkills) {
        this.objContractor.additionalSkills.forEach((obj: any) => {
          if (this.ProgramMasterList && obj.whichprogramme != 'Select' && obj.whichprogramme)
            obj.whichprogrammeName = this.ProgramMasterList.filter(r => r.id == obj.whichprogramme)[0].program;
        });
      }

      this.modalRef = this.BsModalService.show(template, Object.assign({}, { class: 'gray modal-xl' }));

      this.IsShowAddDocumentBtn = this.objContractor.supportingDocList.filter((r:any) => r.IsAddNewDoc == true).length;
    },
      Error => {
        this.commonService.toastErrorMsg('Error', "Error to get Data");
      }
    );

  }

  //GetAll 
  GetAllContractorTraining() {
    var role = JSON.parse(localStorage.getItem('currentUser') || '{}').userRoleName;
    this.contractorTrainingService.GetAllContractorTraining(3).subscribe((response: any) => {
      this.ContractorList = response;
      this.TempAllContractorTraining = response;

      _.each(this.ContractorList, (item: any) => {
        item.age = this.commonService.getAge(item.dateofBirth);
        var Total = 0;
        var Ranks = this.commonService.GetRanking(item);
        _.each(Ranks, (item: any) => {
          if (item.value)
            Total += item.value;
        });
        item.TotalRank = Total;
      })

      this.ContractorList.forEach((item: any) => {
        if (item.comments) {
          item.comments = item.comments.replace(/•/g, '<br/>•').replace('<br/>', '');
        }
      });
    }, error => {
      this.commonService.toastErrorMsg("Error", "Error to get all Isa.");
    });
  }

  //saveRank
  btnSaveRank(contra: NgForm) {
    if (!this.isValidateForm(contra)) {
      return;
    }
    this.SaveRank.CandidateId = this.objContractor.id;
    this.contractorTrainingService.SaveRank(this.SaveRank).subscribe((response: any) => {
    });
    this.GetAllContractorTraining();
    this.commonService.toastSuccessMsg('Success', "Insert recored Successfully");
    this.btnClose();
  }

  //AddComments
  AddComments() {
    this.objContractor.CandidateId = this.objContractor.id;
    this.contractorTrainingService.AddComments(this.objContractor).subscribe((response: any) => {
      this.GetAllContractorTraining();
      this.commonService.toastSuccessMsg('Success', "Insert comments Successfully");
      this.btnClose();
    });

  }

  //Get By Id 
  GetContractorTrainingById() {
    this.contractorTrainingService.GetContractorTraining(this.objContractor.id).subscribe((response: any) => {
      this.objContractor = response;
    }, error => {
      this.commonService.toastErrorMsg("Error", "Error to get user.");
    });
  }

  //Valiadation
  isValidateForm(contra: NgForm) {
    this.IsValid = true;
    if (contra.invalid) {
      return;
    }
    return this.IsValid;
  }
  //Edit
  btnEdit(ContractorTr: any, Editmodal: TemplateRef<any>,) {
    this.objContractor = ContractorTr;
    this.modalRef = this.BsModalService.show(Editmodal, Object.assign({}, { class: 'gray modal-xl' }));
  }

  //Update
  btnUpdate(contra: NgForm) {
    if (!this.isValidateForm(contra)) {
      return;
    }
    this.contractorTrainingService.UpdateContractorTraining(this.objContractor).subscribe((response: any) => {
    });
    this.commonService.toastSuccessMsg('Success', "Update recored Successfully");
    this.btnClose();
  }

  //View-Detail
  openModalWithClass(template: TemplateRef<any>, constructor: any) {
    var link = "admin/ViewApplication/" + constructor.id;

    //this.router.navigate(["admin/ViewApplication",constructor.id]);
    this.router.navigate([]).then(result => { window.open(link, '_blank'); });

    // this.router.navigate(["admin/ViewApplication",constructor.id]).then(result => {  window.open('_blank'); });


    //this.router.navigateByUrl('/ViewApplication')
    //this.GetSortedContractorTraining();
    // this.contractorTrainingService.GetSingleContractorTraining(constructor.id).subscribe((response: any) => {
    //   this.objContractor = response;

    //   this.objContractor.PassportPhotopath = urlConstant.ContractorTraining.PassportPhotoPath + "" + this.objContractor.id + "/" + this.objContractor.passportPhotoName;
    //   if (this.objContractor.passportPhotoName == null) {
    //     this.objContractor.PassportPhotopath = null;
    //   }

    //   this.objContractor.employment.forEach((obj: any) => {
    //     if (obj.fromMonth >= 0) {
    //       obj.fromMonthName = dataConstant.Months[obj.fromMonth];
    //     }
    //     if (obj.toMonth >= 0) {
    //       obj.toMonthName = dataConstant.Months[obj.toMonth];
    //     }
    //   })
    //   this.age = this.commonService.getAge(this.objContractor.dateofBirth);
    //   if (this.ContractorMasterList && this.objContractor.contractorId != 'Select' && this.objContractor.contractorId) {
    //     if (this.ContractorMasterList.filter(r => r.id == this.objContractor.contractorId).length > 0) {
    //       this.objContractor.contractorName = this.ContractorMasterList.filter(r => r.id == this.objContractor.contractorId)[0].contractorName;
    //     }
    //   }
    //   if (this.ProgramMasterList && this.objContractor.programApplyingId != 'Select' && this.objContractor.programApplyingId)
    //     this.objContractor.programApplying = this.ProgramMasterList.filter(x => x.id == this.objContractor.programApplyingId)[0].program;

    //   if (this.objContractor.additionalSkills) {
    //     this.objContractor.additionalSkills.forEach((obj: any) => {
    //       if (this.ProgramMasterList && obj.whichprogramme != 'Select' && obj.whichprogramme)
    //         obj.whichprogrammeName = this.ProgramMasterList.filter(r => r.id == obj.whichprogramme)[0].program;
    //     });
    //   }

    //   this.modalRef = this.BsModalService.show(template, Object.assign({}, { class: 'gray modal-xl' }));
    // },
    //   Error => {
    //     this.commonService.toastErrorMsg('Error', "Error to get Data");
    //   }
    // );

  }
  GetAllContractorMaster() {
    this.contractorMasterService.GetAllContractorMaster().subscribe((response: any) => {
      this.ContractorMasterList = response;
      this.GetAllProgramMaster();
    },
      error => {
        this.commonService.toastErrorMsg("Error", "Error to get Contractor Master.");
      }
    );
  }

  GetAllProgramMaster() {
    this.programMasterService.GetAllProgramMaster().subscribe((response: any) => {
      this.ProgramMasterList = response;
    },
      error => {
        this.commonService.toastErrorMsg("Error", "Error to get all user.");
      }
    );
  }

  //Approved
  btnApprove() {
    if (this.objContractor.id != null) {
      this.objContractor.status = 1;
      this.contractorTrainingService.UpdateContractorTraining(this.objContractor).subscribe((response: any) => {
        this.btnClose();
        this.commonService.toastSuccessMsg('Success', "Approved Successfully");
        this.GetAllContractorTraining();
      });
    }
  }

  //Reject
  btnReject() {
    if (this.objContractor.id != null) {
      this.objContractor.status = 2;
      this.contractorTrainingService.UpdateContractorTraining(this.objContractor).subscribe((response: any) => {
        this.btnClose();
        this.commonService.toastSuccessMsg('Success', "Rejected Successfully",);
        this.GetAllContractorTraining();
      });
    }
  }

  //close
  btnClose() {
    this.modalRef.hide();
  }

  openCity(evt: any, cityName: any) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      (tabcontent[i] as HTMLElement).style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    (document.getElementById(cityName) as HTMLElement).style.display = "block";
    evt.currentTarget.className += " active";
  }


  openPassportPhoto() {
    let url = this.objContractor.PassportPhotopath
    if (url != null) {
      window.open(url, '_blank');
    }
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


  exportToExcel() {
    this.isShowAction = false;
    setTimeout(() => {
      const ws: xlsx.WorkSheet =
        xlsx.utils.table_to_sheet(this.epltable.nativeElement);
      delete (ws['1'])
      //ws['!cols'] = [];
      //ws['!cols'][1] = { hidden: true };
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      xlsx.writeFile(wb, "excel-" + new Date().getTime() + '.xlsx');
      this.isShowAction = true;
    })
  }

  OpenApplicantRanking(ContractorId: any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/admin/ApplicantFinalRanking/' + ContractorId])
    );
    window.open(url, '_blank');
  }

  getFilteredData() {
    var temp = this.TempAllContractorTraining;
    if (this.objFilter.Year) {
      temp = temp.filter(r => r.year == this.objFilter.Year);
    }
    if (this.objFilter.Gender) {
      temp = temp.filter(r => r.sex == this.objFilter.Gender);
    }
    if (this.objFilter.Country) {
      temp = temp.filter(r => r.country == this.objFilter.Country);
    }
    if (this.objFilter.CountryOfNationality) {
      temp = temp.filter(r => r.nationality == this.objFilter.CountryOfNationality);
    }
    if (this.objFilter.ProgramName) {
      temp = temp.filter(r => r.programApplyingId == this.objFilter.ProgramName);
    }
    if (this.objFilter.ContractorName) {
      temp = temp.filter(r => r.contractorId == this.objFilter.ContractorName);
    }
    if (this.objFilter.Region) {
      temp = temp.filter(r => r.groupName == this.objFilter.Region);
    }
    if (this.objFilter.Classification) {
      temp = temp.filter(r => r.countryClass == this.objFilter.Classification);
    }
    this.ContractorList = temp;

  }

  GetAllCountries() {
    this.commonService.GetAllCountries().subscribe((response: any) => {
      this.Countries = response;
      this.CountryOfNationalityList = response;

      this.ClassificationList = this.Countries.map(item => item.countryClass).filter((value, index, self) => self.indexOf(value) === index);
      let i = this.ClassificationList.findIndex(r => r == '' || r == null);
      if (i != -1) {
        this.ClassificationList.splice(i, 1)
      }

    }, error => {
      this.toastr.error("Error to get Countries.");
    });
  }

  onChangeCountryGroup(value:any){
    this.contractorTrainingService.GetCountryGroup().subscribe((response: any) => {
      this.CountryGroupList = response;
      if(value != null){
        // var SelectedCountry = this.Countries.find(r => r.id == value);
        var SelectedCountry = this.CountryOfNationalityList.find(r => r.countryName == value);
      
        this.CountryGroupList = this.CountryGroupList.filter((r:any) => r.id == SelectedCountry.groupId);  
      }
    }, error => {
      this.toastr.error("Error in get Country Group");
    });   
  }

  deleteid: any;
  DeleteContractorTraining(Id: string, ContractorDeleteConfirm: TemplateRef<any>) {
    this.deleteid = Id;
    this.modalRef = this.BsModalService.show(ContractorDeleteConfirm, Object.assign({}, { class: 'gray modal-lg' }));
  }

  ConfirmDelete() {
    this.allContractorTrainingService.DeleteContractorTraining(this.deleteid).subscribe((response: any) => {
      this.toastr.success("Delete recored Successfully", 'Success')
      this.GetAllContractorTraining();
      this.CloseModal();
    }, error => {
      this.toastr.error("Error to delete user.");
    });
  }

  CloseModal() {
    this.GetAllContractorMaster();
    this.modalRef.hide();
  }

  previousLength = 0;
  handleInput(event: any): void {
    const bullet = "\u2022";
    const newLength = event.target.value.length;
    const characterCode = event.target.value.substr(-1).charCodeAt(0);

    if (newLength > this.previousLength) {
      if (characterCode === 10) {
        event.target.value = `${event.target.value}${bullet} `;
      } else if (newLength === 1) {
        event.target.value = `${bullet} ${event.target.value}`;
      }
    }

    this.previousLength = newLength;
  }

  handleInputChange(e: any) {
    if (e) {
      var fileList = e.target.files;
      for (var i = 0; i < fileList.length; i++) {
        const name = fileList[i].name;
        const lastDot = name.lastIndexOf('.');
        const ext = name.substring(lastDot + 1);
        var file = fileList[i];
        var reader = new FileReader();
        let FileSize = Math.round(fileList[i].size / 1024)

        reader.onload = this._handleReaderLoaded.bind(this, ext, fileList[i].name);
        reader.readAsDataURL(file);       
      }
    }
  }

  _handleReaderLoaded(fileType: any, FileName: any, e: any) {
    let reader = e.target;

    this.objContractor.supportingDocList.push({
      base64: reader.result.split('base64,')[1],
      fileType: fileType,
      fileName: FileName,
      IsAddNewDoc: true
    });
   
    this.IsShowAddDocumentBtn = this.objContractor.supportingDocList.filter((r:any) => r.IsAddNewDoc == true).length;
  }

  deleteFile(index: any) {
    this.objContractor.supportingDocList.splice(index, 1);
    this.IsShowAddDocumentBtn = this.objContractor.supportingDocList.filter((r:any) => r.IsAddNewDoc == true).length;
  }


  AddDocument(){
    this.contractorTrainingService.UpdateContractorTraining(this.objContractor).subscribe((response: any) => {

      this.toastr.success("Document Added Successfully", 'Success')
      this.GetAllContractorTraining();
      this.CloseModal();
    })
  }
  replacehtml:any;
  exporttopdf(){
    this.IsDisplayImg = false;
    setTimeout(() => {
      const pdfTable = this.IsDisplay ? document.getElementById("pdfTable1") : document.getElementById("pdfTable");
      let innerHTML = pdfTable ? pdfTable.innerHTML : "";
      this.replacehtml = innerHTML?.replace('Export TO PDF', '');
      var html = htmlToPdfmake(this.replacehtml);
      var docDefinition = {
        info: {
          title: 'Application - ' + this.objContractor.id,
          subject: 'View Application',
        },
        content: html
      }
      //pdfMake.vfs({file: "d"});

      pdfMake.createPdf(docDefinition).download("Application - " + this.objContractor.id);
    }, 1000);
    
    setTimeout(() => {
     this.IsDisplayImg = true;
    }, 3000);
  }
}
