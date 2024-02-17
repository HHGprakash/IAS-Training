import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../../constant/urlConstant';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(public http: HttpClient) { }

  ChangePassword(model:any) {
    return this.http.post(urlConstant.AspNetUsers.ChangePassword, model).pipe();
  }
}
