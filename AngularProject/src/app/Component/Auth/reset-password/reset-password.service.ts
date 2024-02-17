import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(Email: string) {
    return this.http.get<any>(`${environment.apiUrl}/api/Authenticate/reset-password?Email=` + Email).pipe();
  }

  resetNewPassword(model:any) {
    return this.http.post<any>(`${environment.apiUrl}/api/Authenticate/reset-new-password`, model).pipe();
  }
}
