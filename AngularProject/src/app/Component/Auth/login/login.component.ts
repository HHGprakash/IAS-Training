import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  userrole: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
    // redirect to home if already logged in
    //if (this.loginService.currentUserValue) {
    //  this.router.navigate(['/']);
    //}
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  returnUrl: string = 'admin';

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loginService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loginService.setCurrentUserValue(user);
          this.router.navigate([this.returnUrl]);
          this.userrole = JSON.parse(
            localStorage.getItem('currentUser') || '{}'
          ).userRoleName;
          if (this.userrole == 'LtcUser' || this.userrole == 'TrainingOfficer') {
            this.router.navigate(['/admin/AllContractorTraining']);
          } else if (this.userrole == 'User') {
            this.router.navigate(['/ISA/Isa']);
          }else if (this.userrole == 'Admin') {
            this.router.navigate(['/admin/AllContractorTraining']);
          }
        },
        (error) => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
