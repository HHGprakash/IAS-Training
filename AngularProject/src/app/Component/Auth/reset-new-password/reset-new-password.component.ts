import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { CommonService } from '../../../Common/commonService';
import { ResetPasswordService } from '../reset-password/reset-password.service';

@Component({
  selector: 'app-reset-new-password',
  templateUrl: './reset-new-password.component.html',
  styleUrls: ['./reset-new-password.component.scss']
})
export class ResetNewPasswordComponent implements OnInit {

  LoginToken: any;
  User: any = {};
  submitted = false;
  resetPasswordForm: FormGroup;
  SucMsg = "";
  constructor(private route: ActivatedRoute,    
    private resetPasswordService: ResetPasswordService,
    private commonService: CommonService
  ) { }

  get f() { return this.resetPasswordForm.controls; }
  isValidateForm(User: NgForm) {
    this.submitted = true;
    if (User.invalid) {
      return;
    }
    return this.submitted;
  }

  ngOnInit(): void {
    this.User.Id = this.route.snapshot.paramMap.get('id');
    this.User.UniqueToken = this.route.snapshot.paramMap.get('LoginToken');
  }

  onSubmit(User: NgForm) {   
    // this.submitted = true;
    if (!this.isValidateForm(User)) {
      return;
    }    
    this.resetPasswordService.resetNewPassword(this.User)
      .pipe(first())
      .subscribe(
        (user) => {
          this.SucMsg = "Password has been updated.";
        },
        error => {
          this.commonService.toastErrorMsg("Error", error);
        });
  }


}
