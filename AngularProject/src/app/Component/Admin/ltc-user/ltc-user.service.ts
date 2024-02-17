import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { urlConstant } from '../../../constant/urlConstant';

@Injectable({
  providedIn: 'root',
})
export class LtcUserService {
  constructor(public http: HttpClient) {}

  //Get All User
  GetAllAspNetUsers(RoleId: any) {
    return this.http
      .get(urlConstant.AspNetUsers.GetAllAspNetUsers + '?RoleId=' + RoleId)
      .pipe();
  }

  //Insert-User
  InsertAspNetUsers(Id: any) {
    return this.http
      .post(urlConstant.AspNetUsers.InsertLAspNetUsers, Id)
      .pipe();
  }

  UpdatePassword(model: any) {
    return this.http.post(urlConstant.AspNetUsers.UpdatePassword, model).pipe();
  }

  //Update-User
  UpdateLAspNetUsers(Id: any) {
    return this.http
      .post(urlConstant.AspNetUsers.UpdateLAspNetUsers, Id)
      .pipe();
  }

  //Get By Id
  GetAspNetUsers(Id: string) {
    const did = '?id=' + Id;
    return this.http.get(urlConstant.AspNetUsers.GetAspNetUsers + did).pipe();
  }

  //GetAllUserName
  GetAllUserName() {
    return this.http.get(urlConstant.AspNetUsers.GetAllUserName).pipe();
  }

  //Delete-user
  DeleteLAspNetUsers(Id: string) {
    const did = '?Id=' + Id;
    return this.http
      .get(urlConstant.AspNetUsers.DeleteLAspNetUsers + did)
      .pipe();
  }
}
