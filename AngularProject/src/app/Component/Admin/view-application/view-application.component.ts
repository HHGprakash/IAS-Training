import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AllContractorTrainingService } from '../all-contractor-training/all-contractor-training.service';
import { CommonService } from 'src/app/Common/commonService';
import { urlConstant } from 'src/app/constant/urlConstant';
import { dataConstant } from 'src/app/constant/dataConstant';
import { ContractorTrainingService } from '../contractor-training/contractor-training.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

////////////////PDF///////////////////////
// import * as jspdf from 'jspdf';  
// import html2canvas from 'html2canvas';


declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
/////////////////////////////////////////////

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss']
})
export class ViewApplicationComponent implements OnInit  {
  @ViewChild('pdfTable') pdfTable: ElementRef
  ltcMemberId = JSON.parse(localStorage.getItem('currentUser') || '{}').currentMemberId;
  objContractor: any = {};
  age: any;
  ContractorMasterList: any[];
  ProgramMasterList: any[];
  isShowAction = true;
  IsDisplay: boolean =true;
  IsRanking: boolean =true;
  IsValid: boolean =true;
  IsShow: boolean =true;
  SaveRank: any = { CurrentMemberId: this.ltcMemberId };
  applicationid: any;
  IsDisplayImg = true;
  IsShowCommentAndDocument: any;
  userrole = JSON.parse(localStorage.getItem('currentUser') || '{}').userRoleName;
  IsShowAddDocumentBtn :any =0;

  constructor( 
    private contractorTrainingService: ContractorTrainingService,
    private commonService: CommonService,
    private activedRoute: ActivatedRoute,
    ) {
  //  console.log('routeparams-----',this.activedRoute.snapshot.params['applicationid'])
    this.applicationid = this.activedRoute.snapshot.params['applicationid']
    this.IsShowCommentAndDocument = this.activedRoute.snapshot.queryParams['flag']
   this.getapplicatondata(this.applicationid);
   }

   ngOnInit(): void {
     if (this.userrole == "TrainingOfficer") this.IsDisplay = true;
     else this.IsDisplay = false;
   }

   getapplicatondata(Id : any){
    this.contractorTrainingService.GetSingleContractorTraining(Id).subscribe((response: any) => {
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

      this.IsShowAddDocumentBtn = this.objContractor.supportingDocList.filter((r:any) => r.IsAddNewDoc == true).length;

  
    //  this.modalRef = this.BsModalService.show(template, Object.assign({}, { class: 'gray modal-xl' }));
    },
      Error => {
        this.commonService.toastErrorMsg('Error', "Error to get Data");
      }
    );
   }


  //AddComments
  AddComments() {
    this.objContractor.CandidateId = this.objContractor.id;
    this.contractorTrainingService.AddComments(this.objContractor).subscribe((response: any) => {
      this.getapplicatondata(this.objContractor.CandidateId);
      this.commonService.toastSuccessMsg('Success', "Insert comments Successfully");
      this.btnClose();
    });
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

  
  openPassportPhoto() {
    let url = this.objContractor.PassportPhotopath
    if (url != null) {
      window.open(url, '_blank');
    }
  }

  btnSaveRank(contra: NgForm) {
    if (!this.isValidateForm(contra)) {
      return;
    }
    this.SaveRank.CandidateId = this.objContractor.id;
    this.contractorTrainingService.SaveRank(this.SaveRank).subscribe((response: any) => {
    });
   // this.GetAllContractorTraining();
    this.commonService.toastSuccessMsg('Success', "Insert recored Successfully");
   // this.btnClose();
  }

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
   // this.modalRef = this.BsModalService.show(Editmodal, Object.assign({}, { class: 'gray modal-xl' }));
  }

  btnApprove() {
    if (this.objContractor.id != null) {
      this.objContractor.status = 1;
      this.contractorTrainingService.UpdateContractorTraining(this.objContractor).subscribe((response: any) => {
        this.btnClose();
        this.commonService.toastSuccessMsg('Success', "Approved Successfully");
      //  this.GetAllContractorTraining();
      });
    }
  }

  btnClose() {
    //this.modalRef.hide();
  }


  btnReject() {
    if (this.objContractor.id != null) {
      this.objContractor.status = 2;
      this.contractorTrainingService.UpdateContractorTraining(this.objContractor).subscribe((response: any) => {
        this.btnClose();
        this.commonService.toastSuccessMsg('Success', "Rejected Successfully",);
    //    this.GetAllContractorTraining();
      });
    }
  }

  replacehtml:any;
  exporttopdf(){

    this.IsDisplayImg = false;
    setTimeout(() => {
      const pdfTable = document.getElementById("pdfTable");
      // const apdetails = document.getElementById("applicationdetails");
      // const personalinfo = document.getElementById("personalinfo");
      // const passportinfo = document.getElementById("passportinfo");
      // const proficiency = document.getElementById("proficiency");
      // const education = document.getElementById("education");
      // const additionalSkill = document.getElementById("additionalSkill");
      // const employment = document.getElementById("employment");

      //const pdfTable = String(apdetails)  +  String(personalinfo);
      //var pdfTable = document.getElementById("applicationdetails");


      let innerHTML = pdfTable != null ? pdfTable.innerHTML : pdfTable
      // var html = htmlToPdfmake(innerHTML);

      //let innerHTML = pdfTable != null ? pdfTable.innerHTML:pdfTable

      this.replacehtml = innerHTML?.replace('Export TO PDF', '');
      //this.replacehtml = this.replacehtml.remove('')

      // var html = htmlToPdfmake(innerHTML);
      var html = htmlToPdfmake(this.replacehtml);
      //const documentDefinition = { content: html };
      var docDefinition = {
        info: {
          title: 'Application - ' + this.applicationid,
          subject: 'View Application',
        },

        //watermark: { text: 'ISA - Training', color: 'blue', opacity: 0.3, bold: true, italics: false },
        content: html
      }
      //pdfMake.vfs({file: "d"});

      pdfMake.createPdf(docDefinition).download("Application - " + this.applicationid);

    // let data = document.getElementById("test"); 
    // // let data = document.getElementById("maindiv");
    // console.log(data);  
    //  let d : any = '<h1></h1>'
    // html2canvas(data == null ? d :data).then(canvas => {
    //   const contentDataURL = canvas.toDataURL('image/jpeg', 1.0)
    //   console.log(contentDataURL);  
    //   let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
    //   // let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
    //   pdf.save('Filename.pdf');   
    // });
    }, 1000);
    
    setTimeout(() => {
    this.IsDisplayImg = true;
    }, 3000);
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

      this.commonService.toastSuccessMsg("Document Added Successfully", 'Success');
      this.getapplicatondata(this.objContractor.id);
    })
  }
}

