import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { urlConstant } from '../../../constant/urlConstant';

@Injectable({
  providedIn: 'root'
})
export class IsaService {

  constructor(public http: HttpClient) { }



 //Insert-User
  InsertContractorTraining(model: any) {
    
    return this.http.post(urlConstant.Isa.ContractorTraining, model).pipe();
  } 

  //Get All
  GetAllContractorTraining() {
    return this.http.get(urlConstant.Isa.GetAllContractorTraining).pipe();
  } 

   //Get All langage
   GetAllOtherLanguage() {
    return this.http.get(urlConstant.OtherLanguage.OtherLanguage).pipe();
  }

  //Get By Id 
  GetContractorTraining(Id: string) {
    const did = "?id=" + Id;
    return this.http.get(urlConstant.Isa.GetContractorTraining + did).pipe();
  }

  GetSubmittedApplicationDetail(Id: string) {
    const did = "?id=" + Id;
    return this.http.get(urlConstant.Isa.GetSubmittedApplicationDetail + did).pipe();
  }
}
