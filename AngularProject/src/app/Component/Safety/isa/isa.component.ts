import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/Common/commonService';
import Swal from 'sweetalert2';
import { ContractorMasterService } from '../../Admin/contractor-master/contractor-master.service';
import { ProgramMasterService } from '../../Admin/program-master/program-master.service';
import { dataConstant } from './../../../../app/constant/dataConstant';
import { IsaService } from './isa.service';
import { Router } from '@angular/router';
import { any, forEach } from 'underscore';

@Component({
  selector: 'app-isa',
  templateUrl: './isa.component.html',
  styleUrls: ['./isa.component.scss']
})
export class IsaComponent implements OnInit {
  ObjIsa: any = {
    Year: null,
    DateofBirthYear: null,
    DateofBirthMonth: null,
    DateofBirthDay: null,

    DateofIssueYear: null,
    DateofIssueMonth: null,
    DateofIssueDay: null,

    DateofExpiryYear: null,
    DateofExpiryMonth: null,
    DateofExpiryDay: null,

    EducationFromYear: null,
    EducationFromMonth: null,

    EducationToYear: null,
    EducationToMonth: null,
    Employment: [{
      "Id": 0,
      "FromYear": null,
      "FromMonth": null,
      "ToYear": null,
      "ToMonth": null,
      "EmployerName": null,
      "Position": null,
      "EmployerAddress": null,
      "Responsibilities": null
    }],
    SupportingDocList: [],
    TrainingProgrammewillfurtheryourcareer: null,
    //FieldofStudy: null,
    //FieldofStudySubCategory: null,
    Whichyear: null,
    Education:[{
      "Id":0,
      "NameofInstitution": null,
      "EducationFromYear": null,
      "EducationFromMonth": null,
      "EducationToYear": null,
      "EducationToMonth": null,
      "Address": null,
      "FieldofStudy": null,
      "FieldofStudySubCategory": null,
      "Qualification": null,
      "ExtraQualificationList": [],
      "SubCategory": [],

    }]
  };
  //IsaList: any = []; Isa: any;
  ApplicationDetails: any = [];
  Countries: any[];
  CountryOfNationalityList: any[];
  ContractorMasterList: any[]; ProgramMasterList: any[];
  ContractorsMasterList: any[]; ProgramsMasterList: any[];
  IsValid = false; modalRef: BsModalRef;
  modalReference: any; Id: any;
  Years: any = [];
  Months: any = [];
  Days: any = [];
  objdetail: any;
  DateofIssueDays: any = [];
  DateofExpiryDays: any = [];
  QualificationList: any = [];
  OtherLanguagelist: any = [];
  OtherLanguagelistTemp: any[];
  objotherLanguage: any = {};
  //ExtraQualificationList: any = [];
  FileList: any = [];
  currentDateObject: any;
  RemainSelectedQualificationDropdown = 3;
  RemainSelectedQualificationAddMore = 3;
  ProgramYear: any = [];
  DobYear: any = [];
  DateOfIssueYear: any = [];
  DateOfExpiryYear: any = [];
  EducationYear: any = [];
  EmploymentYear: any = [];
  dropdownSettings: IDropdownSettings = {};
  AddNewQualificationList: any = [];
  StudiesList: any = [];
  UserId = JSON.parse(localStorage.getItem('currentUser') || '{}').currentMemberId;

  constructor(private isaService: IsaService,
    private router: Router,
    private contractorMasterService: ContractorMasterService,
    private programMasterService: ProgramMasterService,
    private BsModalService: BsModalService,
    private modalService: NgbModal,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.Months = dataConstant.Months;
    this.QualificationList = dataConstant.QualificationList;
    this.ProgramYear = this.commonService.GetYearRange(2018, 2030);
    this.DobYear = this.commonService.GetYearRange(1900, new Date().getFullYear(), "desc");
    this.DateOfIssueYear = this.commonService.GetYearRange(1900, new Date().getFullYear(), "desc");
    this.DateOfExpiryYear = this.commonService.GetYearRange(new Date().getFullYear(), 2100);
    this.EducationYear = this.commonService.GetYearRange(1900, new Date().getFullYear(), "desc");
    this.EmploymentYear = this.commonService.GetYearRange(1900, new Date().getFullYear(), "desc");
    this.StudiesList = dataConstant.Studies.sort((a, b) => a.Name.localeCompare(b.Name));;
    this.currentDateObject = this.commonService.StringToDate(new Date());

    for (let i = 1900; i < 2100; i++) {
      this.Years.push(i);
    }
    this.GetAllCountries();
    this.GetAllContractorMaster();
    this.GetAllOtherLanguage();

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Title',
      textField: 'Title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
    //  limitSelection: this.RemainSelectedQualificationDropdown
    };
  }

  OtherLanguageCheckChange(index: any) {
    this.OtherLanguagelist[index].isChecked = this.OtherLanguagelist[index].isChecked == true ? !this.OtherLanguagelist[index].isChecked : true;
    this.ObjIsa.OtherLanguage = Array.prototype.map.call(this.OtherLanguagelist.filter((r: { isChecked: boolean; }) => r.isChecked == true), s => " " + s.languageName).toString();
  }

  GetAllOtherLanguage() {
    this.isaService.GetAllOtherLanguage().subscribe((response: any) => {
      this.OtherLanguagelist = response;
    }, error => {
      this.commonService.toastErrorMsg("Error", "Error to get all Isa.");
    });
  }

  //GetAll Contractor...
  GetAllContractorMaster() {
    this.contractorMasterService.GetAllContractorMaster().subscribe((response: any) => {
      this.ContractorsMasterList = response;
      this.ContractorMasterList = this.ContractorsMasterList.filter(r => r.isActive == true);
      this.GetAllProgramMaster();
    },
      error => {
        this.commonService.toastErrorMsg("Error", "Error to get all user.");
      }
    );
  }

  //GetAll Program-Applying...
  GetAllProgramMaster() {
    this.programMasterService.GetAllProgramMaster().subscribe((response: any) => {
      this.ProgramsMasterList = response;
      this.ProgramMasterList = this.ProgramsMasterList.filter(r => r.isActive == true);
      this.GetSubmittedApplicationDetail();
    },
      error => {
        this.commonService.toastErrorMsg("Error", "Error to get all user.");
      }
    );
  }

  //Valiadation
  isValidateForm(Isa: NgForm) {
    this.IsValid = true;
    if (Isa.invalid) {
      return;
    }
    return this.IsValid;
  }

  // Popup open
  btnSubmit(Isa: NgForm, template: TemplateRef<any>,) {
     if (!this.isValidateForm(Isa)) {
       this.commonService.toastErrorMsg("Validation", "Please enter the mandatory value")
       return;
     }
    if (this.ContractorMasterList && this.ObjIsa.ContractorId != 'Select' && this.ObjIsa.ContractorId)
      this.ObjIsa.ContraName = this.ContractorMasterList.filter(r => r.id == this.ObjIsa.ContractorId)[0].contractorName;
    if (this.ProgramMasterList && this.ObjIsa.ProgramApplyingId != 'Select' && this.ObjIsa.ProgramApplyingId)
      this.ObjIsa.ProgramApp = this.ProgramMasterList.filter(x => x.id == this.ObjIsa.ProgramApplyingId)[0].program;
    if (this.Countries && this.ObjIsa.Country != 'Select' && this.ObjIsa.Country)
      this.ObjIsa.CountryName = this.Countries.filter(c => c.id == this.ObjIsa.Country)[0].countryName;

      if (this.CountryOfNationalityList && this.ObjIsa.Nationality != 'Select' && this.ObjIsa.CountryOfNationality)
      this.ObjIsa.Nationality = this.CountryOfNationalityList.filter(c => c.id == this.ObjIsa.CountryOfNationality)[0].countryName;

    this.ObjIsa.Qualification = "";   
    //if (this.ObjIsa.QualificationList)
    //  this.ObjIsa.Qualification = (this.ObjIsa.QualificationList.concat(this.ExtraQualificationList.map(function (obj: { ExtraQualification: any; }) { return obj.ExtraQualification }))).join(', ');

    this.ObjIsa.Education.forEach((edu: any) => {
      edu.QualificationName = "";
      edu.QualificationName = (edu.Qualification.concat(edu.ExtraQualificationList.map(function (obj: { ExtraQualification: any; }) { return obj.ExtraQualification }))).join(', ');
    });

      if (this.ProgramMasterList && this.ObjIsa.Whichprogramme != 'Select' && this.ObjIsa.Whichprogramme)
      this.ObjIsa.WhichprogrammeName = this.ProgramMasterList.filter(x => x.id == this.ObjIsa.Whichprogramme)[0].program;
    this.modalRef = this.BsModalService.show(template, Object.assign({}, { class: 'gray modal-xl' }));
  }

  //Save Isa
  btnSave() {
    this.ObjIsa.Education.forEach((edu:any) => {
      edu.Qualification = edu.QualificationName;
    });
    this.ObjIsa.DateofBirth = this.commonService.DateToString(this.ObjIsa.DateofBirth);
    this.ObjIsa.DateofIssue = this.commonService.DateToString(this.ObjIsa.DateofIssue);
    this.ObjIsa.DateofExpiry = this.commonService.DateToString(this.ObjIsa.DateofExpiry);

    this.ObjIsa.Employment.forEach((obj: any) => {
      obj.FromMonth = this.Months.indexOf(obj.FromMonth) >= 0 ? this.Months.indexOf(obj.FromMonth) : null;
      obj.ToMonth = this.Months.indexOf(obj.ToMonth) >= 0 ? this.Months.indexOf(obj.ToMonth) : null;
    })
    this.ObjIsa.userId = this.UserId;
    this.isaService.InsertContractorTraining(this.ObjIsa).subscribe((response: any) => {
      this.Id = response;
      Swal.fire('<span style="color:green;"> Congratulations!!!! </span> <br/> <span style="font-size:15px;">Reference Number : IAS-' + this.Id + '</span> <br/> <span style="font-size:15px;"> Application has been applied, Please keep the reference number to future use.</span>').then((result) => {
        if (result.isConfirmed) {
          this.ObjIsa = {
            Year: null,
            DateofBirthYear: null,
            DateofBirthMonth: null,
            DateofBirthDay: null,

            DateofIssueYear: null,
            DateofIssueMonth: null,
            DateofIssueDay: null,

            DateofExpiryYear: null,
            DateofExpiryMonth: null,
            DateofExpiryDay: null,

            EducationFromYear: null,
            EducationFromMonth: null,

            EducationToYear: null,
            EducationToMonth: null,
            Employment: [{
              "Id": 0,
              "FromYear": null,
              "FromMonth": null,
              "ToYear": null,
              "ToMonth": null,
              "EmployerName": null,
              "Position": null,
              "EmployerAddress": null,
              "Responsibilities": null
            }],
            SupportingDocList: [],
            TrainingProgrammewillfurtheryourcareer: null,
            Whichyear: null,
            Education: [{
              "Id": 0,
              "NameofInstitution": null,
              "EducationFromYear": null,
              "EducationFromMonth": null,
              "EducationToYear": null,
              "EducationToMonth": null,
              "Address": null,
              "FieldofStudy": null,
              "FieldofStudySubCategory": null,
              "Qualification": null,
              "ExtraQualificationList": [],
              "SubCategory": [],

            }]
          };
          this.IsValid = false;
          this.GetSubmittedApplicationDetail();
          this.GetAllOtherLanguage();
        //  this.router.navigateByUrl('/ISA/Home');
        }
      });
    });
    this.CloseModal();
    // this.ObjIsa = {};
  }

  //Close Modal
  CloseModal() {
    this.modalRef.hide();
  }

  //GetAllCountries
  GetAllCountries() {
    this.commonService.GetAllCountries().subscribe((response: any) => {
      this.Countries = response;
      this.CountryOfNationalityList = response;
    }, error => {
      this.commonService.toastErrorMsg("Error", "Error to get all Isa.");
    });
  }

  GetDaysForBirth() {
    let numberOfDays = new Date(this.ObjIsa.DateofBirthYear, this.Months.indexOf(this.ObjIsa.DateofBirthMonth) + 1, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      this.Days.push(i);
    }
    this.ObjIsa.DateofBirthDay = null;
  }

  GetDaysDateExpiry() {
    let numberOfDays = new Date(this.ObjIsa.DateofExpiryYear, this.Months.indexOf(this.ObjIsa.DateofExpiryMonth) + 1, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      this.DateofExpiryDays.push(i);
    }
    this.ObjIsa.DateofExpiryDay = null;
  }

  GetDaysDateIssue() {
    let numberOfDays = new Date(this.ObjIsa.DateofIssueYear, this.Months.indexOf(this.ObjIsa.DateofIssueMonth) + 1, 0).getDate();
    for (let i = 1; i <= numberOfDays; i++) {
      this.DateofIssueDays.push(i);
    }
    this.ObjIsa.DateofIssueDay = null;
  }

  AddEmploymentRecord() {
    if (this.ObjIsa.Employment.length >= 3) {
      this.commonService.toastWarningMsg("Warning", 'Maximum limit are 3');
      return;
    }
    this.ObjIsa.Employment.push({
      "Id": 0,
      "FromYear": null,
      "FromMonth": null,
      "ToYear": null,
      "ToMonth": null,
      "EmployerName": null,
      "Position": null,
      "EmployerAddress": null,
      "Responsibilities": null
    })
  }
  DeleteEmploymentRecord(index: any) {
    this.ObjIsa.Employment = this.commonService.DeleteObject(this.ObjIsa.Employment, index);
  }

  //Add-Education
  AddEducationRecored(){
    this.ObjIsa.Education.push({
      "Id":0,
      "NameofInstitution": null,
      "EducationFromYear": null,
      "EducationFromMonth": null,
      "EducationToYear": null,
      "EducationToMonth": null,
      "Address": null,
      "FieldofStudy": null,
      "FieldofStudySubCategory": null,
      "Qualification": null,
      "ExtraQualificationList":[],
      "SubCategory":[],
    })
  }
  DeleteEducationRecord(index: any) {
    this.ObjIsa.Education = this.commonService.DeleteObject(this.ObjIsa.Education, index);
  }

  AddQualification(index: any) {
    //if (this.RemainSelectedQualificationAddMore == 0 || this.RemainSelectedQualificationDropdown == 0 || (this.RemainSelectedQualificationAddMore + this.RemainSelectedQualificationDropdown) == 3) {
    //  this.commonService.toastWarningMsg("Warning", 'Maximum limit of qualifications are 3.');
    //  return;
    //}
    this.ObjIsa.Education[index].ExtraQualificationList.push({
      "ExtraQualification": null
    })
    this.RemainSelectedQualificationDropdown--;
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Title',
      textField: 'Title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
    //  limitSelection: this.RemainSelectedQualificationDropdown
    };
  }

  DeleteQualification(Educationindex: any,ExtraQulificationIndex:any) {
    this.ObjIsa.Education[Educationindex].ExtraQualificationList = this.commonService.DeleteObject(this.ObjIsa.Education[Educationindex].ExtraQualificationList, ExtraQulificationIndex);
    this.RemainSelectedQualificationDropdown++;
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'Title',
      textField: 'Title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
    //  limitSelection: this.RemainSelectedQualificationDropdown
    };
  }

  onPassportPhotoUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      const [file] = event.target.files;
      var ext = file.name.split('.')[1];
      if (ext == 'jpg' || ext == 'png' || ext == 'jpeg') {
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          this.ObjIsa.PassportPhotobase64 = e.target.result.split('base64,')[1];
          this.ObjIsa.PassportPhotoName = file.name;
        };
      }
      else {
        let filectrl: any = document.getElementById("empPhotobtn");
        filectrl.value = "";
        this.commonService.toastWarningMsg("Warning", 'Please select a valid file type');
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

    this.ObjIsa.SupportingDocList.push({
      Base64: reader.result.split('base64,')[1],
      FileType: fileType,
      FileName: FileName
    });
  }

  deleteFile(index: any) {
    this.ObjIsa.SupportingDocList.splice(index, 1);
  }

  InputMaxwordLength(text: any, maxWords: number) {
    let words: any[] = text.target.value.split(" ");
    if (words.length >= maxWords + 1) {
      words = words.filter(r => r != '').slice(0, maxWords);
      if (this.ObjIsa.TrainingProgrammewillfurtheryourcareer) {
        this.ObjIsa.TrainingProgrammewillfurtheryourcareer = words.join(" ");
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
      if (this.ObjIsa.Researchundertakenifany) {
        this.ObjIsa.Researchundertakenifany = words.join(" ");
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

  InputFieldsofScientificInterestLength(text: any, maxWords: number) {
    let words: any[] = text.target.value.split(" ");
    if (words.length >= maxWords + 1) {
      words = words.filter(r => r != '').slice(0, maxWords);
      if (this.ObjIsa.FieldsofScientificInterest) {
        this.ObjIsa.FieldsofScientificInterest = words.join(" ");
      }
      (document.getElementById("FieldsofScientificInterest") as HTMLElement).setAttribute('maxLength', String(Number(words.join(" ").length) - 1));
      return words.join(" ").trim();
    } else {
      if ((document.getElementById("FieldsofScientificInterest") as HTMLElement).hasAttribute('maxLength')) {
        (document.getElementById("FieldsofScientificInterest") as HTMLElement).removeAttribute('maxLength');
      }
      return words.join(" ");
    }
  }

  InputParticipationininternationalsymposiaLength(text: any, maxWords: number) {
    let words: any[] = text.target.value.split(" ");
    if (words.length >= maxWords + 1) {
      words = words.filter(r => r != '').slice(0, maxWords);
      if (this.ObjIsa.Participationininternationalsymposia) {
        this.ObjIsa.Participationininternationalsymposia = words.join(" ");
      }
      (document.getElementById("Participationininternationalsymposia") as HTMLElement).setAttribute('maxLength', String(Number(words.join(" ").length) - 1));
      return words.join(" ").trim();
    } else {
      if ((document.getElementById("Participationininternationalsymposia") as HTMLElement).hasAttribute('maxLength')) {
        (document.getElementById("Participationininternationalsymposia") as HTMLElement).removeAttribute('maxLength');
      }
      return words.join(" ");
    }
  }


  onItemSelect() {
  //  this.RemainSelectedQualificationAddMore--;    
  }
  onItemDeSelect() {
  //  this.RemainSelectedQualificationAddMore++;    
  }

  //Study: any = {
  //  SubCategory: []
  //};
  changeStudy(name: string, index: any) {
    if (JSON.parse(JSON.stringify(this.StudiesList.find((x: { Name: string; }) => x.Name == name))).SubCategory) {
      this.ObjIsa.Education[index].SubCategory = JSON.parse(JSON.stringify(this.StudiesList.find((x: { Name: string; }) => x.Name == name))).SubCategory;
    }
    else {
      this.ObjIsa.Education[index].SubCategory = null;
    }
    this.ObjIsa.Education[index].FieldofStudySubCategory = null;
  }

  GetSubmittedApplicationDetail() {
    if (this.UserId != null) {
      this.isaService.GetSubmittedApplicationDetail(this.UserId).subscribe((response: any) => {
        this.ApplicationDetails = response.data;
       
        this.ApplicationDetails.forEach((obj: any) => {
          obj.contractorName = this.ContractorsMasterList.filter(r => r.id == obj.contractorId)[0].contractorName;
          obj.programName = this.ProgramsMasterList.filter(x => x.id == obj.programApplyingId)[0].program;
          
          obj.status = obj.status == 0 ? "Open" : (obj.status == 1 ? "Closed" : "Try Again")
        });

      });
     
    }
    }
}
