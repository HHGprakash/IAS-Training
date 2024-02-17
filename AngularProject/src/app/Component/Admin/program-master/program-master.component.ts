import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/Common/commonService';
import { ProgramMasterService } from './program-master.service';
import { NgForm } from '@angular/forms';
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-program-master',
  templateUrl: './program-master.component.html',
  styleUrls: ['./program-master.component.scss']
})
export class ProgramMasterComponent implements OnInit {

  ProgramMasterList: any = []; IsValid = false;
  objProgram :any = {};
  modalRef: any;
  IsDisplay:any;
  isShowAction = true;
  @ViewChild('epltable') epltable: ElementRef;

  constructor(private programMasterService:ProgramMasterService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private BsModalService: BsModalService,
    private modalService: NgbModal,
    private commonService: CommonService,) {
      if (this.activatedRoute.snapshot.params["Id"] != undefined) {
        this.objProgram.id = this.activatedRoute.snapshot.params["Id"];
        this.GetProgramMasterById();
      }
     }

  ngOnInit(): void {
    this.GetAllProgramMaster();
  }

  //GetAll...
  GetAllProgramMaster() {
    this.programMasterService.GetAllProgramMaster().subscribe((response: any) => {
      this.ProgramMasterList = response;
    },
      error => {
        this.toastr.error("Error to get all user.");
      }
    );
  }

  //Validation....
    isValidateForm(ProgramMaster: NgForm) {
    this.IsValid = true;
    if (ProgramMaster.invalid) {
      return;
    }
    return this.IsValid;
  }

  //Add Program
  AddProgramMaster(Program: TemplateRef<any>,) {
    this.IsDisplay = true;
    this.objProgram = {
      isActive: true
    };
    this.modalRef = this.BsModalService.show(Program, Object.assign({}, { class: 'gray modal-lg' }));
  }

   //Inser-Update  Model
   btnsubmit(Program: NgForm) {     
    if (!this.isValidateForm(Program)) {
      return;
    }
    if (this.objProgram.id == null) {
      this.programMasterService.InsertProgramMaster(this.objProgram).subscribe((response: any) => {
        this.toastr.success("Insert recored Successfully", 'Success');
        this.GetAllProgramMaster();
        this.CloseModal();
      });
    }
    else {
      this.programMasterService.UpdateProgramMaster(this.objProgram).subscribe((response: any) => {
        this.toastr.success("Update recored Successfully", 'Success');
        this.GetAllProgramMaster();
        this.CloseModal();
      });
     
    }
  }

   //Open Edit Model
   btnEdit(EdiProgram: any, Program: TemplateRef<any>,) {
    this.IsDisplay = false;
     this.objProgram = EdiProgram;
    this.modalRef = this.BsModalService.show(Program, Object.assign({}, { class: 'gray modal-lg' }));
  }

   //GetData By Id...
   GetProgramMasterById() {
    this.programMasterService.GetProgramMaster(this.objProgram.id).subscribe((response: any) => {
      this.objProgram = response;
    }, error => {
      this.toastr.error("Error to get user.");
    });
  }


   //Delete Program
  deleteid: any;
  btnDeleteProgram(Id: string, ProgramDeleteConfirm: TemplateRef<any>) {
    this.deleteid = Id;
    this.modalRef = this.BsModalService.show(ProgramDeleteConfirm, Object.assign({}, { class: 'gray modal-lg' }));
  }

  ConfirmDelete() {
    this.programMasterService.DeleteProgramMaster(this.deleteid).subscribe((response: any) => {
      this.toastr.success("Delete recored Successfully", 'Success')
      this.CloseModal();
      this.GetAllProgramMaster();
    }, error => {
      this.toastr.error("Error to delete user.");
    });
  }

  //Close Modal
  CloseModal() {
    this.GetAllProgramMaster();
    this.modalRef.hide();
  }

  exportToExcel() {
    this.isShowAction = false;
    setTimeout(() => {
      const ws: xlsx.WorkSheet =
        xlsx.utils.table_to_sheet(this.epltable.nativeElement);
      delete (ws['1'])
      const wb: xlsx.WorkBook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
      xlsx.writeFile(wb, "excel-" + new Date().getTime() + '.xlsx');
      this.isShowAction = true;
    })
  }

}
