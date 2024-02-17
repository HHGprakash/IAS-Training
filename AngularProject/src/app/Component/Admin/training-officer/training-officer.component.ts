import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../Common/commonService';
import { TrainingOfficerService } from './training-officer.service';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { LtcUserService } from '../ltc-user/ltc-user.service';
import { dataConstant } from '../../../constant/dataConstant';

@Component({
  selector: 'app-training-officer',
  templateUrl: './training-officer.component.html',
  styleUrls: ['./training-officer.component.scss']
})
export class TrainingOfficerComponent implements OnInit {

  objLtcUser: any = {
    Id: null,
    FirstName: null,
    LastName: null,
    DateOfBirth: null,
    Email: null,
    PhoneNumber: null,
    PhoneNumber1: null,
    UserName: null,
    JoiningDate: null
  };
  User: any; UserList: any = [];
  IsValid = false; modal: any;
  isShow = false; modalReference: any;
  modalRef: BsModalRef;


  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private trainingOfficerService: TrainingOfficerService,
    private toastr: ToastrService,
    private BsModalService: BsModalService,
    private modalService: NgbModal,
    private commonService: CommonService,
    private ltcUserService : LtcUserService
  ) {
    if (this.activatedRoute.snapshot.params["Id"] != undefined) {
      this.objLtcUser.Id = this.activatedRoute.snapshot.params["Id"];
      this.GetUserById();
    }
  }

  ngOnInit(): void {
    this.GetAllAspNetUsers();
    this.objLtcUser = {};
  }

  GetAllAspNetUsers() {
    this.ltcUserService.GetAllAspNetUsers(dataConstant.TrainingOfficer).subscribe((response: any) => {
      this.UserList = response;
    },
      error => {
        this.toastr.error("Error to get all user.");
      }
    );
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
    if (!this.isValidateForm(User)) {
      return;
    }

    this.objLtcUser.DateOfBirth=  this.objLtcUser.DateOfBirth.year+"-"+ this.objLtcUser.DateOfBirth.month+"-"+  this.objLtcUser.DateOfBirth.day;
    this.objLtcUser.JoiningDate=  this.objLtcUser.JoiningDate.year+"-"+ this.objLtcUser.JoiningDate.month+"-"+  this.objLtcUser.JoiningDate.day;
    this.objLtcUser.Type='TrainingOfficer';
    if (this.objLtcUser.Id == null) {
      this.trainingOfficerService.InsertTrainingUsers(this.objLtcUser).subscribe((response: any) => {
      });
      this.GetAllAspNetUsers();
      this.toastr.success("Insert recored Successfully", 'Success');
    }
    else {
      this.trainingOfficerService.UpdateLTrainingUsers(this.objLtcUser).subscribe((response: any) => {
      });
      this.GetAllAspNetUsers();
      this.toastr.success("Updated recored Successfully", 'Success')
    }
    this.CloseModal();
    //this.objLtcUser = {};
  }

  //Open Edit Model
  btnEdit(listuser: any,template: TemplateRef<any>,) {
    /* this.objLtcUser = listuser;*/
    this.objLtcUser.Id = listuser.id;
    this.objLtcUser.FirstName = listuser.firstName;
    this.objLtcUser.LastName = listuser.lastName;
    this.objLtcUser.DateOfBirth = this.commonService.StringToDate(listuser.dateOfBirth);
    this.objLtcUser.Email = listuser.email;
    this.objLtcUser.PhoneNumber = listuser.phoneNumber;
    this.objLtcUser.PhoneNumber1 = listuser.phoneNumber1;
    this.objLtcUser.UserName = listuser.userName;
    this.objLtcUser.JoiningDate = this.commonService.StringToDate(listuser.joiningDate);
    this.objLtcUser.IsActive = listuser.isActive;
    this.modalRef = this.BsModalService.show(template,Object.assign({}, { class: 'gray modal-xl' }));
  }

  AddUser(template: TemplateRef<any>,) {
    this.objLtcUser = {
      Id: null,
      FirstName: null,
      LastName: null,
      DateOfBirth: null,
      Email: null,
      PhoneNumber: null,
      PhoneNumber1: null,
      UserName: null,
      JoiningDate: null
    };
    this.modalRef = this.BsModalService.show(template,Object.assign({}, { class: 'gray modal-xl' }));
  }

  //close-modal
  CloseModal() {
    this.modalRef.hide()
  }

  //GetData By Id...
  GetUserById() {
    this.trainingOfficerService.GetTrainingUsers(this.objLtcUser.Id).subscribe((response: any) => {
      this.objLtcUser = response;
      this.objLtcUser.selectedItems = [];
    }, error => {
      this.toastr.error("Error to get user.");
    });
  }

  //Delete User
  btnDeleteuser(Id: string) {
    alert("Are Sure Want To Delete Recored?");
    this.trainingOfficerService.DeleteLTrainingUsers(Id).subscribe((response: any) => {
      this.GetAllAspNetUsers();
      this.toastr.success("Delete recored Successfully", 'Success')
    }, error => {
      this.GetAllAspNetUsers();
      this.toastr.error("Error to delete user.");
    });
  }
}
