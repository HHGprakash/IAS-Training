import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/Common/commonService';
import { escapeLeadingUnderscores } from 'typescript';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';
import { urlConstant } from '../../../constant/urlConstant';
import { IsaService } from '../../Safety/isa/isa.service';
import { ContractorMasterService } from '../contractor-master/contractor-master.service';
import { ProgramMasterService } from '../program-master/program-master.service';
import { dataConstant } from './../../../../app/constant/dataConstant';
import * as xlsx from 'xlsx';
import { ContractorTrainingService } from '../contractor-training/contractor-training.service';


@Component({
  selector: 'app-ltc-result',
  templateUrl: './ltc-result.component.html',
  styleUrls: ['./ltc-result.component.scss']
})
export class LtcResultComponent implements OnInit {

  modalRef: BsModalRef;
  ContractorList: any = []; objContractor: any = {}; Countries: any[];
  isStatus: any = ""; status: any = ""; IsValid = false; IsUpdate = false;
  ContractorMasterList: any[]; ProgramMasterList: any[]; ProgramYear: any = [];
  userrole = JSON.parse(localStorage.getItem('currentUser') || '{}').userRoleName;
  IsDisplay: any; contra: any; age: any; date: any; IsShow: any; IsRanking: any;
  ltcMemberId = JSON.parse(localStorage.getItem('currentUser') || '{}').currentMemberId;
  SaveRank: any = { CurrentMemberId: this.ltcMemberId };
  DobYear: any = []; DateOfIssueYear: any = [];
  DateOfExpiryYear: any = []; EducationYear: any = []; EmploymentYear: any = [];
  Years: any = []; Months: any = []; Days: any = [];
  DateofIssueDays: any = []; DateofExpiryDays: any = [];
  SortedContractorTraining: any = [];
  QualificationList: any = [];
  ExtraQualificationList: any = [];
  dropdownSettings: IDropdownSettings = {};
  OtherLanguagelist: any[];
  ClassificationList: any[];
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
  TempSortedContractorTraining: any[] = [];
  CountryGroupList: any = [];
  isShowAction = true;
  CountryOfNationalityList: any[];
  @ViewChild('epltable') epltable: ElementRef;

  constructor(private contractorTrainingService: ContractorTrainingService,
    private isaService: IsaService,
    private contractorMasterService: ContractorMasterService,
    private programMasterService: ProgramMasterService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private BsModalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commonService: CommonService) {
    if (this.activatedRoute.snapshot.params["Id"] != undefined) {
      this.objContractor.Id = this.activatedRoute.snapshot.params["Id"];
      this.GetContractorTrainingById();
    }
  }

  ngOnInit(): void {
    if (this.userrole == "TrainingOfficer") this.IsDisplay = true;
    else this.IsDisplay = false;
    if (this.userrole == "LtcUser" || this.userrole == "Admin") this.IsShow = true;
    else this.IsShow = false;
    if (this.userrole == "LtcUser") this.IsRanking = true;
    else this.IsRanking = false;

    if (this.userrole == "LtcUser") this.IsUpdate = true;
    else this.IsUpdate = false;

    this.ProgramYear = this.commonService.GetYearRange(2018, 2030);
    this.Months = dataConstant.Months;
    this.QualificationList = dataConstant.QualificationList;
    this.DobYear = this.commonService.GetYearRange(1900, new Date().getFullYear(), "desc");
    this.DateOfIssueYear = this.commonService.GetYearRange(1900, new Date().getFullYear(), "desc");
    this.DateOfExpiryYear = this.commonService.GetYearRange(new Date().getFullYear(), 2100);
    this.EducationYear = this.commonService.GetYearRange(1900, new Date().getFullYear(), "desc");
    this.EmploymentYear = this.commonService.GetYearRange(1900, new Date().getFullYear(), "desc");

    for (let i = 1900; i < 2100; i++) {
      this.Years.push(i);
    }
    this.GetAllCountries();
    this.GetAllOtherLanguage();
    this.GetAllContractorTraining();
    this.GetAllContractorMaster();
    this.GetAllProgramMaster();
    this.GetSortedContractorTraining();
    this.onChangeCountryGroup(null);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'Title',
      textField: 'Title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: false
    };

  }

  OtherLanguageCheckChange(index: any) {
    this.OtherLanguagelist[index].isChecked = this.OtherLanguagelist[index].isChecked == true ? !this.OtherLanguagelist[index].isChecked : true;
    this.objContractor.OtherLanguage = Array.prototype.map.call(this.OtherLanguagelist.filter((r: { isChecked: boolean; }) => r.isChecked == true), s => " " + s.languageName).toString().trim();
  }

  LtcUserList: any = [];
  GetSortedContractorTraining() {
    this.contractorTrainingService.GetSortedContractorTraining().subscribe((response: any) => {

      this.LtcUserList = response.aspNetUsersViewModel;
      var CandidateList = response.contractorTraining;
      var RankingList = response.rankingViewModel;

      _.each(CandidateList, (Candidate: any) => {
        var rank: any = [];
        var TotalRank = 0;

        _.each(this.LtcUserList, (LtcUser: any) => {
          var rn = RankingList.find((x: any) => x.ltcMemberId == LtcUser.id && x.candidateId == Candidate.id);
          rank.push({ Rank: rn ? rn.rank : '' });
          TotalRank += rn ? rn.rank : 0;
        });
        Candidate.LtcRank = rank;
        Candidate.TotalRank = TotalRank == 0 ? 10000000 : TotalRank;
      });

      CandidateList = _.sortBy(CandidateList, "TotalRank");

      var LastRank = 1;
      var LastTotal = 0;
      _.each(CandidateList, (Candidate: any, index: number) => {
        if (Candidate.TotalRank > LastTotal) {
          LastTotal = Candidate.TotalRank;
          LastRank = index + 1;
        }
        Candidate.Rank = LastRank;
        if (Candidate.TotalRank == 10000000) {
          Candidate.Rank = "";
          Candidate.TotalRank = "";
        }
        Candidate.age = this.commonService.getAge(Candidate.dateofBirth);
      })

      this.SortedContractorTraining = CandidateList;
      this.TempSortedContractorTraining = CandidateList;

    },
      error => {
        this.toastr.error("Error to get all user.");
      }
    );
  }

  getDiffDays(sDate: any, eDate: any) {
    this.ProgramYear = this.commonService.GetYearRange(2018, 2030);
    var startDate = new Date(sDate);
    var endDate = new Date(eDate);
    var Time = endDate.getFullYear() - startDate.getFullYear();
    return Time;
  }

  //Get All Language
  GetAllOtherLanguage() {
    this.isaService.GetAllOtherLanguage().subscribe((response: any) => {
      this.OtherLanguagelist = response;
    }, error => {
      this.toastr.error("Error to get all Isa.");
    });
  }

  //GetAll Contractor...
  GetAllContractorMaster() {
    this.contractorMasterService.GetAllContractorMaster().subscribe((response: any) => {
      this.ContractorMasterList = response;
    },
      error => {
        this.toastr.error("Error to get all user.");
      }
    );
  }

  //GetAll Program-Applying...
  GetAllProgramMaster() {
    this.programMasterService.GetAllProgramMaster().subscribe((response: any) => {
      this.ProgramMasterList = response;
    },
      error => {
        this.toastr.error("Error to get all user.");
      }
    );
  }

  //GetAllCountries
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
      this.toastr.error("Error to get all Isa.");
    });
  }

  //GetAll Isa
  GetAllContractorTraining() {
    var role = JSON.parse(localStorage.getItem('currentUser') || '{}').userRoleName;
    this.contractorTrainingService.GetAllContractorTraining(1).subscribe((response: any) => {
      this.ContractorList = response;
      this.SortedContractorTraining.forEach((item: any) => {
        if (item.comments) {
          item.comments = item.comments.replace(/•/g, '<br/>•').replace('<br/>', '');
        }
      });

    }, error => {
      this.toastr.error("Error to get all Isa.");
    });
  }

  //saveRank
  btnSaveRank(contra: NgForm) {
    if (!this.isValidateForm(contra)) {
      return;
    }
    this.SaveRank.CandidateId = this.objContractor.id;
    this.contractorTrainingService.SaveRank(this.SaveRank).subscribe((response: any) => {
      this.GetSortedContractorTraining();
      this.commonService.toastSuccessMsg('Success', "Rank has been saved successfully");
      this.closeModel();
    });

  }

  //Get By Id 
  GetContractorTrainingById() {
    this.contractorTrainingService.GetContractorTraining(this.objContractor.id).subscribe((response: any) => {
      this.objContractor = response;
    }, error => {
      this.toastr.error("Error to get user.");
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
    this.contractorTrainingService.GetSingleContractorTraining(ContractorTr.id).subscribe((response: any) => {
      this.objContractor = response;
      this.objContractor.dateofBirth = this.commonService.StringToDate(this.objContractor.dateofBirth);
      this.objContractor.dateofIssue = this.commonService.StringToDate(this.objContractor.dateofIssue);
      this.objContractor.dateofExpiry = this.commonService.StringToDate(this.objContractor.dateofExpiry);
      this.objContractor.PassportPhotopath = urlConstant.ContractorTraining.PassportPhotoPath + "" + this.objContractor.id + "/" + ContractorTr.passportPhotoName;
      if (this.objContractor.passportPhotoName == null) {
        this.objContractor.PassportPhotopath = null;
      }
      this.objContractor.employment.forEach((obj: any) => {
        if (obj.fromMonth >= 0) {
          obj.fromMonth = dataConstant.Months[obj.fromMonth];
        }
        if (obj.toMonth >= 0) {
          obj.toMonth = dataConstant.Months[obj.toMonth];
        }
      })

      this.objContractor.qualificationList = [];
      this.ExtraQualificationList = [];
      if (this.objContractor.qualification) {
        var array = this.objContractor.qualification.split(", ");
        array.forEach((obj: string) => {
          var index = this.QualificationList.indexOf(obj)
          if (index != -1) {
            this.objContractor.qualificationList.push(this.QualificationList[index])
          }
          else {
            this.ExtraQualificationList.push({
              "extraQualification": obj
            })
          }
        })

      }

      if (this.objContractor.otherLanguage != null) {
        let res = this.objContractor.otherLanguage.split(",");
        for (let i = 0; i < res.length; i++) {
          this.OtherLanguagelist.filter(x => x.languageName == res[i].trim()).map(x => x.isChecked = true);
        }
      }
      this.modalRef = this.BsModalService.show(Editmodal, Object.assign({}, { class: 'gray modal-xl' }));

    },
      Error => {
        this.commonService.toastErrorMsg('Error', "Error to get Data");
      }
    );

  }

  //Update
  btnUpdate(contra: NgForm) {
    if (!this.isValidateForm(contra)) {
      return;
    }

    if (this.objContractor.id != null) {
      this.objContractor.dateofBirth = this.commonService.DateToString(this.objContractor.dateofBirth);
      this.objContractor.dateofIssue = this.commonService.DateToString(this.objContractor.dateofIssue);
      this.objContractor.dateofExpiry = this.commonService.DateToString(this.objContractor.dateofExpiry);

      this.objContractor.employment.forEach((obj: any) => {
        obj.fromMonth = this.Months.indexOf(obj.fromMonth) > 0 ? this.Months.indexOf(obj.fromMonth) : null;
        obj.toMonth = this.Months.indexOf(obj.toMonth) > 0 ? this.Months.indexOf(obj.toMonth) : null;
      })

      if (this.objContractor.qualificationList)
        this.objContractor.qualification = [];
      this.objContractor.qualification = (this.objContractor.qualificationList.concat(this.ExtraQualificationList.map(function (obj: { extraQualification: any; }) { return obj.extraQualification }))).join(", ");

      this.contractorTrainingService.UpdateContractorTraining(this.objContractor).subscribe((response: any) => {
        if (response) {
          this.toastr.success("Update recored Successfully", 'Success');
          this.closeModel();
          this.GetSortedContractorTraining();
        }
      });

    }
  }

  //View-Detail
  openModalWithClass(template: TemplateRef<any>, constructor: any) {
    var link = "admin/ViewApplication/" + constructor.id;
    //this.router.navigate(["admin/ViewApplication",constructor.id]);

    this.router.navigate([]).then(result => { window.open(link, '_blank'); });

    // this.contractorTrainingService.GetSingleContractorTraining(constructor.id).subscribe((response: any) => {
    //   this.modalRef = this.BsModalService.show(template, Object.assign({}, { class: 'gray modal-xl' }));
    //   this.SaveRank.rank = response.rank;
    //   this.objContractor = response;
    //   this.objContractor.PassportPhotopath = urlConstant.ContractorTraining.PassportPhotoPath + "" + this.objContractor.id + "/" + constructor.passportPhotoName;
    //   if (this.objContractor.passportPhotoName == null) {
    //     this.objContractor.PassportPhotopath = null;
    //   }
    //   this.objContractor.employment.forEach((obj: any) => {
    //     if (obj.fromMonth >= 0) {
    //       obj.fromMonth = dataConstant.Months[obj.fromMonth];
    //     }
    //     if (obj.toMonth >= 0) {
    //       obj.toMonth = dataConstant.Months[obj.toMonth];
    //     }
    //   })
    //   this.age = this.commonService.getAge(this.objContractor.dateofBirth);
    //   if (this.ContractorMasterList && this.objContractor.contractorId != 'Select' && this.objContractor.contractorId) {
    //     if (this.ContractorMasterList.filter(r => r.id == this.objContractor.contractorId)[0]) {
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
    // },
    //   Error => {
    //     this.commonService.toastErrorMsg('Error', "Error to get Data");
    //   }
    // );


  }

  //Approved
  btnApprove() {
    if (this.objContractor.id != null) {
      this.objContractor.status = 1;
      this.contractorTrainingService.UpdateContractorTraining(this.objContractor).subscribe((response: any) => {
        this.closeModel();
        this.commonService.toastSuccessMsg('Success', "Approved Successfully");
      });

    }
  }

  //Reject
  btnReject() {
    if (this.objContractor.id != null) {
      this.objContractor.status = 2;
      this.contractorTrainingService.UpdateContractorTraining(this.objContractor).subscribe((response: any) => {
        this.closeModel();
        this.commonService.toastSuccessMsg('Success', "Rejected Successfully");
      });

    }
  }

  //close
  closeModel() {
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

  GetDaysForBirth() {
    let numberOfDays = new Date(this.objContractor.DateofBirthYear, this.Months.indexOf(this.objContractor.DateofBirthMonth) + 1, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      this.Days.push(i);
    }
    this.objContractor.DateofBirthDay = null;
  }

  GetDaysDateExpiry() {
    let numberOfDays = new Date(this.objContractor.DateofExpiryYear, this.Months.indexOf(this.objContractor.DateofExpiryMonth) + 1, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      this.DateofExpiryDays.push(i);
    }
    this.objContractor.DateofExpiryDay = null;
  }

  GetDaysDateIssue() {
    let numberOfDays = new Date(this.objContractor.DateofIssueYear, this.Months.indexOf(this.objContractor.DateofIssueMonth) + 1, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      this.DateofIssueDays.push(i);
    }
    this.objContractor.DateofIssueDay = null;
  }

  AddEmploymentRecord() {
    this.objContractor.employment.push({
      "id": 0,
      "fromYear": null,
      "fromMonth": null,
      "toYear": null,
      "toMonth": null,
      "employerName": null,
      "position": null,
      "employerAddress": null,
      "responsibilities": null
    })
  }
  DeleteEmploymentRecord(index: any) {
    this.objContractor.employment.splice(index, 1);
  }

  AddQualification() {
    this.ExtraQualificationList.push({
      "extraQualification": null
    })
  }

  DeleteQualification(index: any) {
    this.ExtraQualificationList.splice(index, 1);
  }

  deletePassportPhoto() {
    this.objContractor.PassportPhotopath = null;
    this.objContractor.PassportPhotobase64 = null;
    this.objContractor.PassportPhotoName = null;
  }

  onPassportPhotoUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      const [file] = event.target.files;
      var ext = file.name.split('.')[1];
      if (ext == 'jpg' || ext == 'png' || ext == 'jpeg') {
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.objContractor.PassportPhotobase64 = e.target.result.split('base64,')[1];
          this.objContractor.PassportPhotoName = file.name;
          this.objContractor.PassportPhotopath = null;
        };
      }
      else {
        let filectrl: any = document.getElementById("empPhotobtn");
        filectrl.value = "";
        this.toastr.warning('Please select a valid file type');
      }
    }
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
      Base64: reader.result.split('base64,')[1],
      fileType: fileType,
      fileName: FileName
    });
  }

  openPassportPhoto() {
    let url = this.objContractor.PassportPhotopath
    if (url != null) {
      window.open(url, '_blank');
    }
  }

  DeleteDoc(index: any) {
    this.objContractor.supportingDocList.splice(index, 1);
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

  InputMaxwordLength(text: any, maxWords: number) {
    let words: any[] = text.target.value.split(" ");
    if (words.length >= maxWords + 1) {
      words = words.filter(r => r != '').slice(0, maxWords);
      if (this.objContractor.trainingProgrammewillfurtheryourcareer) {
        this.objContractor.trainingProgrammewillfurtheryourcareer = words.join(" ");
      }
      (document.getElementById("TrainingProgrammewillfurtheryourcareer") as HTMLElement).setAttribute('maxLength', String(Number(words.join(" ").length) - 1));
      return words.join(" ").trim();
    } else {
      if ((document.getElementById("TrainingProgrammewillfurtheryourcareer") as HTMLElement).hasAttribute('maxLength')) {
        (document.getElementById("TrainingProgrammewillfurtheryourcareer") as HTMLElement).removeAttribute('maxLength');
      }
      return words.join(" ");
    }
  }

  InputResearchundertakenMaxwordLength(text: any, maxWords: number) {
    let words: any[] = text.target.value.split(" ");
    if (words.length >= maxWords + 1) {
      words = words.filter(r => r != '').slice(0, maxWords);
      if (this.objContractor.researchundertakenifany) {
        this.objContractor.researchundertakenifany = words.join(" ");
      }
      (document.getElementById("Researchundertakenifany") as HTMLElement).setAttribute('maxLength', String(Number(words.join(" ").length) - 1));
      return words.join(" ").trim();
    } else {
      if ((document.getElementById("Researchundertakenifany") as HTMLElement).hasAttribute('maxLength')) {
        (document.getElementById("Researchundertakenifany") as HTMLElement).removeAttribute('maxLength');
      }
      return words.join(" ");
    }
  }

  getFilteredData() {
    //if (this.objFilter.Year) {
    //  this.SortedContractorTraining = this.TempSortedContractorTraining.filter(r => r.year == this.objFilter.Year);
    //}
    //else if (this.objFilter.Gender) {
    //  this.SortedContractorTraining = this.TempSortedContractorTraining.filter(r => r.sex == this.objFilter.Gender);
    //}
    //else {
    //  this.SortedContractorTraining = this.TempSortedContractorTraining;

    //}

    var temp = this.TempSortedContractorTraining
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
    this.SortedContractorTraining = temp;

  }

  onChangeCountryGroup(value:any) {
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

  OpenApplicantRanking(ContractorId: any) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/admin/ApplicantFinalRanking/' + ContractorId])
    );
    window.open(url, '_blank');
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
}
