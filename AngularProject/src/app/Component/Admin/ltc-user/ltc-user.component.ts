import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../Common/commonService';
import { dataConstant } from '../../../constant/dataConstant';
import { LtcUserService } from './ltc-user.service';
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-ltc-user',
  templateUrl: './ltc-user.component.html',
  styleUrls: ['./ltc-user.component.scss'],
  providers: [DatePipe]

})
export class LtcUserComponent implements OnInit {

  objLtcUser: any = {
    Id: null,
    FirstName: null,
    LastName: null,
    DateOfBirth: null,
    Email: null,
    PhoneNumber: null,
    PhoneNumber1: null,
    UserName: null,
    JoiningDate: null,
    IsActive: true
  };
  User: any;
  UserList: any = [];
  IsValid = false;
  modal: any;
  isShow = false;
  modalReference: any;
  modalRef: BsModalRef;
  RoleList: any = [];
  IsNew = false;
  Usernamelist: any[];
  IsValidUserName: any;
  msg = "";
  isShowAction = true;
  @ViewChild('epltable') epltable: ElementRef;

  constructor(private datepipe: DatePipe, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ltcUserService: LtcUserService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private BsModalService: BsModalService,
    private commonService: CommonService
  ) {
    if (this.activatedRoute.snapshot.params["Id"] != undefined) {
      this.objLtcUser.Id = this.activatedRoute.snapshot.params["Id"];
      this.GetUserById();
    }
  }

  ngOnInit(): void {
    this.GetAllAspNetUsers();
    this.GetAllRole();
    this.GetUserName();
    this.objLtcUser = {};
    /*  document.getElementById('griduser')?.style.setProperty('display', 'block');*/
  }

  GetAllRole() {
    this.commonService.GetAllRole().subscribe((response: any) => {
      this.RoleList = response;
    }, error => {
      this.toastr.error("Error to get roles.");
    });
  }

  GetAllAspNetUsers() {
    this.ltcUserService.GetAllAspNetUsers(dataConstant.LtcUser).subscribe((response: any) => {
      this.UserList = response;
      if (this.UserList == this.objLtcUser.UserName) {

      }
    }, error => {
      this.toastr.error("Error to get all user.");
    });
  }

  CheckUserName(event: any) {
    if (this.Usernamelist.filter(r => r == event.target.value).length > 0) {
      if (this.IsValidUserName = true) {
        this.msg = "This username already exist";
      }
    }
    else {
      this.IsValidUserName = false;
    }
  }

  GetUserName() {
    this.ltcUserService.GetAllUserName().subscribe((response: any) => {
      this.Usernamelist = response;
    },
      error => {
        this.toastr.error("Error to get all user.");
      });
  }

  //validations
  isValidateForm(User: NgForm) {
    this.IsValid = true;
    if (User.invalid) {
      return;
    }
    return this.IsValid;
  }

  //Inser-User Model
  btnsubmit(User: NgForm) {
    if (!this.isValidateForm(User)) { return; }
    if (this.objLtcUser.RoleId == null || this.objLtcUser.RoleId == "") {
      this.commonService.toastErrorMsg("Error", "Select role");
      return;
    }
    //this.objLtcUser.DateOfBirth = this.objLtcUser.DateOfBirth.year + "-" + this.objLtcUser.DateOfBirth.month + "-" + this.objLtcUser.DateOfBirth.day;    
    this.objLtcUser.JoiningDate = this.commonService.DateToString(this.objLtcUser.JoiningDate);
    this.objLtcUser.Type = "Ltc";

    if (this.objLtcUser.Id == null) {
      this.ltcUserService.InsertAspNetUsers(this.objLtcUser).subscribe((response: any) => {
        this.objLtcUser.Id = response.id;
        this.objLtcUser.PasswordHash = this.objLtcUser.PasswordHash;
        this.ltcUserService.UpdatePassword(this.objLtcUser).subscribe((response: any) => {
        });
        this.GetAllAspNetUsers();
        this.toastr.success("User has been addded successfully", 'Success');
        this.CloseModal();
      },
        error => {
          this.toastr.error("Error to get all user.");
        });
    }
    else {
      this.ltcUserService.UpdateLAspNetUsers(this.objLtcUser).subscribe((response: any) => {
        if (this.objLtcUser.PasswordHash) {
          this.objLtcUser.PasswordHash = this.objLtcUser.PasswordHash;
          this.ltcUserService.UpdatePassword(this.objLtcUser).subscribe((response: any) => {
          });
        }
        this.GetAllAspNetUsers();
        this.toastr.success("User has been  update successfully", 'Success');
        this.CloseModal();
      }, error => {
        this.toastr.error("Error");
      });

    }
  }

  //Open Edit Model
  btnEdit(listuser: any, template: TemplateRef<any>, UserForm: NgForm) {
    UserForm.resetForm();
    this.IsNew = false;
    /* this.objLtcUser = listuser;*/
    this.objLtcUser.Id = listuser.user.id;
    this.objLtcUser.FirstName = listuser.user.firstName;
    this.objLtcUser.LastName = listuser.user.lastName;
    //this.objLtcUser.DateOfBirth = this.commonService.StringToDate(listuser.dateOfBirth);
    this.objLtcUser.Email = listuser.user.email;
    //this.objLtcUser.PhoneNumber = listuser.phoneNumber;
    //this.objLtcUser.PhoneNumber1 = listuser.phoneNumber1;
    this.objLtcUser.UserName = listuser.user.userName;
    this.objLtcUser.JoiningDate = this.commonService.StringToDate(listuser.user.joiningDate);
    this.objLtcUser.IsActive = listuser.user.isActive;
    this.objLtcUser.RoleId = listuser.role.roleId;
    this.objLtcUser.PasswordHash = null;

    this.modalRef = this.BsModalService.show(template, Object.assign({}, { class: 'gray modal-xl' }));
  }

  AddUser(template: TemplateRef<any>,) {
    this.IsNew = true;
    this.objLtcUser = {
      Id: null,
      FirstName: null,
      LastName: null,
      DateOfBirth: null,
      Email: null,
      PhoneNumber: null,
      PhoneNumber1: null,
      UserName: null,
      JoiningDate: null,
      IsActive: true
    };
    this.modalRef = this.BsModalService.show(template, Object.assign({}, { class: 'gray modal-xl' }));
  }

  CloseModal() {
    this.IsValid = false;
    this.modalRef.hide();
  }

  //GetData By Id...
  GetUserById() {
    this.ltcUserService.GetAspNetUsers(this.objLtcUser.Id).subscribe((response: any) => {
      this.objLtcUser = response;
      this.objLtcUser.selectedItems = [];
    }, error => {
      this.toastr.error("Error to get user.");
    });
  }

  //Delete User
  deleteid: any;
  btnDeleteuser(Id: string, ltcDeleteConfirm: TemplateRef<any>) {
    this.deleteid = Id;
    this.modalRef = this.BsModalService.show(ltcDeleteConfirm, Object.assign({}, { class: 'gray modal-lg' }));
  }

  ConfirmDelete() {
    this.ltcUserService.DeleteLAspNetUsers(this.deleteid).subscribe((response: any) => {
      this.GetAllAspNetUsers();
      this.CloseModal();
      this.toastr.success("Delete recored Successfully", 'Success')
    }, error => {
      this.GetAllAspNetUsers();
      this.toastr.error("Error to delete user.");
    });
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
