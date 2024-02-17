import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordService } from './reset-password.service';
import { first } from 'rxjs/operators';
import { CommonService } from '../../../Common/commonService';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  submitted = false;
  resetPasswordForm: FormGroup;
  SucMsg = '';

  constructor(private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private commonService: CommonService  ) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
    });
  }

  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.resetPasswordService.resetPassword(this.f.username.value)
      .pipe(first())
      .subscribe(
        (user) => {
          this.commonService.toastSuccessMsg("Reset Password", "Mail has been sent please check mail.")
          this.SucMsg = "Mail has been sent please check mail.";
        },
        error => {
          this.commonService.toastErrorMsg("Error", error);          
        });
  }

}
