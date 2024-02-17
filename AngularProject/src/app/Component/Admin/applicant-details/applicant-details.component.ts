import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { dataConstant } from '../../../constant/dataConstant';
import { ApplicantDetailsService } from './applicant-details.service';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.scss']
})
export class ApplicantDetailsComponent implements OnInit {

  //objLtcUser: any = {
  //  Id: null,
  //  firstName: null,
  //  lastName: null,    
  //  email: null,   
  //  username: null,   
  //};

  constructor(private formBuilder: FormBuilder, private applicantDetailsService: ApplicantDetailsService,
    private toastr: ToastrService,  ) { }


  UserList: any = [];

  ngOnInit(): void {

    this.GetAllAspNetUsers();
  }

  GetAllAspNetUsers() {
    this.applicantDetailsService.GetAllAspNetUserRoles().subscribe((response: any) => {
      this.UserList = response;
      //if (this.UserList == this.objLtcUser.UserName) {

      //}
    }, error => {
      this.toastr.error("Error to get all user.");
    });
  }

}
