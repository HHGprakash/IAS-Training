import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './Common/error.interceptor';
import { JWTInterceptor } from './Common/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ResetNewPasswordComponent } from './Component/Auth/reset-new-password/reset-new-password.component';
import { ForgetUsernameComponent } from './Component/Auth/forget-username/forget-username.component';
import { RoutAuthenticateServiceComponent } from './Component/Auth/rout-authenticate-service/rout-authenticate-service.component';


@NgModule({
  declarations: [
    AppComponent,
    ResetNewPasswordComponent,
    ForgetUsernameComponent,
    RoutAuthenticateServiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot() 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
