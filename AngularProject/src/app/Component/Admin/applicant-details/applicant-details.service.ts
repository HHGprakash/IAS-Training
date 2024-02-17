import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../../constant/urlConstant';

@Injectable({
  providedIn: 'root'
})
export class ApplicantDetailsService {

  constructor(public http: HttpClient) { }

  GetAllAspNetUserRoles() {
    return this.http.get(urlConstant.Applicant.GetAllAspNetUserRoles).pipe();
  }
}
