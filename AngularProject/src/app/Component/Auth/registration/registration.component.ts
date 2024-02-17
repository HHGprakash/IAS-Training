import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { first } from 'rxjs/operators';
import { LtcUserService } from '../../Admin/ltc-user/ltc-user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registraionForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  userrole: any = '';
  registraionModel: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private ltcUserService: LtcUserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registraionForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registraionForm.controls;
  }

  returnUrl: string = 'admin';

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registraionForm.invalid) {
      return;
    }

    this.registraionModel = {
      firstName: this.registraionForm.get('firstName')?.value,
      lastName: this.registraionForm.get('lastName')?.value,
      email: this.registraionForm.get('email')?.value,
      passwordHash: this.registraionForm.get('passwordHash')?.value,
      roleId: '614c64c2-247d-4408-8d0a-43828c1da856',
    };
    this.ltcUserService.InsertAspNetUsers(this.registraionModel).subscribe(
      (response: any) => {
        
        if (response === false) {
          this.registraionForm.patchValue({
            email: '',
          });
          this.toastr.error('Email Already Exits! Try with diffrent email');
        } else {
          this.registraionModel.Id = response.id;

          this.registraionModel.passwordHash =
            this.registraionModel.passwordHash;
          this.ltcUserService
            .UpdatePassword(this.registraionModel)
            .subscribe((response: any) => {});
          this.router.navigate(['/login']);
          this.toastr.success(
            'Your UserName is sent in your mail address',
            'Registraion successful'
          );
        }
      },
      (error) => {
        this.registraionForm.patchValue({
          firstName: '',
          lastName: '',
          email: '',
          passwordHash: '',
        });
        this.toastr.error('Registraion unsuccessful.');
      }
    );
  }
}
