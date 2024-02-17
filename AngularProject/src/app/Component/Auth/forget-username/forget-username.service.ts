import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetUsernameService {

  constructor(private http: HttpClient) { }

  //resendusername(Email: string) {
  //  return this.http.get<any>(`${environment.apiUrl}/api/Authenticate/reset-password?Email=` + Email).pipe();
  //}

  resendusername(Email: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/Authenticate/reset-Username?Email=` + Email ).pipe();

    /*return this.http.get<any>(`${environment.apiUrl}/api/Authenticate/reset-Username?Email=`, Email).pipe();*/


  }

}
