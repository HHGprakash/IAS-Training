import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommonService } from '../../../Common/commonService';
import { ForgetUsernameService } from './forget-username.service';

@Component({
  selector: 'app-forget-username',
  templateUrl: './forget-username.component.html',
  styleUrls: ['./forget-username.component.scss']
})
export class ForgetUsernameComponent implements OnInit {
  

  constructor(private formBuilder: FormBuilder,
    private forgetUsernameService: ForgetUsernameService,
    private commonService: CommonService
  ) { }


  LoginToken: any;
  User: any = {};
  submitted = false;
  resetusername: FormGroup;
  SucMsg = "";

  ngOnInit(): void {
    this.resetusername = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
    });
  }


  get f() { return this.resetusername.controls; }
  isValidateForm(User: NgForm) {
    this.submitted = true;
    if (User.invalid) {
      return;
    }
    return this.submitted;
  }


  onSubmit() {

    this.submitted = true;
    if (this.resetusername.invalid) {
      return;
    }
    this.forgetUsernameService.resendusername(this.f.username.value)
      .pipe(first())
      .subscribe(
        (user) => {
          this.commonService.toastSuccessMsg("Reset Password", "Mail has been sent please check mail.")
          this.SucMsg = "Mail has been sent please check mail.";
        },
        error => {
          this.commonService.toastErrorMsg("Error", error);
        });

    //this.submitted = true;
    //if (this.resetusername.invalid) {
    //  return;
    //}
    //// this.submitted = true;
    //if (!this.isValidateForm(User)) {
    //  return;
    //}
    //this.forgetUsernameService.resendusername(this.User)
    //  .pipe(first())
    //  .subscribe(
    //    (user) => {
    //      this.SucMsg = " has been Send ";
    //    },
    //    error => {
    //      this.commonService.toastErrorMsg("Error", error);
    //    });
  }

}
