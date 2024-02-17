import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from '../../../constant/urlConstant';

@Injectable({
  providedIn: 'root'
})
export class TrainingOfficerService {

  constructor(public http: HttpClient) { }

  //Get All User
  GetAllTrainingtUsers() {
    return this.http.get(urlConstant.AspNetUsers.GetAllAspNetUsers).pipe();
  }

  //Insert-User
  InsertTrainingUsers(Id: any) {
    return this.http.post(urlConstant.AspNetUsers.InsertLAspNetUsers, Id).pipe();
  }

  //Update-User
  UpdateLTrainingUsers(Id: any) {
    return this.http.post(urlConstant.AspNetUsers.UpdateLAspNetUsers, Id).pipe();
  }

  //Get By Id 
  GetTrainingUsers(Id: string) {
    const did = "?id=" + Id;
    return this.http.get(urlConstant.AspNetUsers.GetAspNetUsers + did).pipe();
  }

  //Delete-user
  DeleteLTrainingUsers(Id: string) {
    const did = "?Id=" + Id;
    return this.http.get(urlConstant.AspNetUsers.DeleteLAspNetUsers + did).pipe();
  }
}
