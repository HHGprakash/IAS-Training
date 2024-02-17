import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonService } from '../../../Common/commonService';
import { ChangePasswordService } from './change-password.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  Newpassword: string = ""; Confirmpassword: string = "";
  msg = ""; IsValid = false;
  user = {
    CurrentPassword: null,
    NewPassword: null,
    ConfirmPassword: null,
  }

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private changePasswordService: ChangePasswordService) { }

  ngOnInit() {
  }


  ChangePassword(ChangePasswordForm: NgForm) {
    if (ChangePasswordForm.form.invalid) {
      this.commonService.toastErrorMsg("Validation", "Please enter the mandatory and valid data in the form.");
      this.IsValid = true;
      return;
    }
    if (this.user.NewPassword != this.user.ConfirmPassword) {
      this.commonService.toastErrorMsg("Validation", "New password and Confirm password does not match");
      this.IsValid = true;
      return;
    }

    var User = {
      Id: "dfsdfdsf",
      PasswordHash: this.user.CurrentPassword,
      NewPasswordHash: this.user.NewPassword,
    }

    this.changePasswordService.ChangePassword(User).subscribe((response: any) => {
      
      if (response.status == "Success") {
        this.commonService.toastSuccessMsg("Success", response.message);
      } else {
        this.commonService.toastErrorMsg("Error", response.message);
      }
    },
    error => {
      this.commonService.toastErrorMsg("Error", "Error to get all user.");
    });

  }

}



