import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/Common/commonService';
import { ContractorMasterService } from './contractor-master.service';
import { NgForm } from '@angular/forms';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-contractor-master',
  templateUrl: './contractor-master.component.html',
  styleUrls: ['./contractor-master.component.scss']
})
export class ContractorMasterComponent implements OnInit {

  ContractorMasterList: any = []; IsValid = false;
  objContractor :any = {}; IsDisplay:any;
  modalRef: any; 
  isShowAction = true;
  @ViewChild('epltable') epltable: ElementRef;

  constructor(private contractorMasterService:ContractorMasterService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private BsModalService: BsModalService,
    private modalService: NgbModal,
    private commonService: CommonService,) {
      if (this.activatedRoute.snapshot.params["Id"] != undefined) {
        this.objContractor.id = this.activatedRoute.snapshot.params["Id"];
        this.GetContractorMasterById();
      }
     }

  ngOnInit(): void {
    this.GetAllContractorMaster();
  }

  //GetAll...
  GetAllContractorMaster() {
    this.contractorMasterService.GetAllContractorMaster().subscribe((response: any) => {
      this.ContractorMasterList = response;
    },
      error => {
        this.toastr.error("Error to get all user.");
      }
    );
  }

  //Validation....
    isValidateForm(ContractorMaster: NgForm) {
    this.IsValid = true;
    if (ContractorMaster.invalid) {
      return;
    }
    return this.IsValid;
  }

  //Add contractor
  AddContractor(Contractor: TemplateRef<any>,) {
    this.IsDisplay = true;
    this.objContractor = {
      isActive: true
    };
    this.modalRef = this.BsModalService.show(Contractor, Object.assign({}, { class: 'gray modal-lg' }));
  }

   //Inser-Update  Model
   btnsubmit(User: NgForm) {     
    if (!this.isValidateForm(User)) {
      return;
    }

    if (this.objContractor.id == null) {
      this.contractorMasterService.InsertContractorMaster(this.objContractor).subscribe((response: any) => {
        this.toastr.success("Insert recored Successfully", 'Success');
        this.GetAllContractorMaster();
        this.CloseModal();
      });
      
    }
    else {
      this.contractorMasterService.UpdateContractorMaster(this.objContractor).subscribe((response: any) => {
        this.toastr.success("Update recored Successfully", 'Success');
        this.GetAllContractorMaster();
        this.CloseModal();
      });
    }
  }

   //Open Edit Model
   btnEdit(EdiContractor: any, Contractor: TemplateRef<any>,) {
    this.IsDisplay = false;
     this.objContractor = EdiContractor;
    this.modalRef = this.BsModalService.show(Contractor, Object.assign({}, { class: 'gray modal-lg' }));
  }

   //GetData By Id...
   GetContractorMasterById() {
    this.contractorMasterService.GetContractorMaster(this.objContractor.id).subscribe((response: any) => {
      this.objContractor = response;
    }, error => {
      this.toastr.error("Error to get user.");
    });
  }


   //Delete User
  deleteid: any;
  btnDeleteuser(Id: string, ContractorDeleteConfirm: TemplateRef<any>) {

    this.deleteid = Id;
    this.modalRef = this.BsModalService.show(ContractorDeleteConfirm, Object.assign({}, { class: 'gray modal-lg' }));
  }

  ConfirmDelete() {
    this.contractorMasterService.DeleteContractorMaster(this.deleteid).subscribe((response: any) => {
      this.toastr.success("Delete recored Successfully", 'Success')
      this.GetAllContractorMaster();
      this.CloseModal();
    }, error => {
      this.toastr.error("Error to delete user.");
    });
  }

  //Close Modal
  CloseModal() {
    this.GetAllContractorMaster();
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
