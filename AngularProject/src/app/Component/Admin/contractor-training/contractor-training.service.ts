import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from 'src/app/constant/urlConstant';

@Injectable({
  providedIn: 'root'
})
export class ContractorTrainingService {

  constructor(public http: HttpClient) { }

  //Get All
  GetAllContractorTraining(status: any) {
    return this.http.get(urlConstant.ContractorTraining.GetAllContractorTraining + "?status=" + status).pipe();
  }


  GetSortedContractorTraining() {
    return this.http.get(urlConstant.ContractorTraining.GetSortedContractorTraining).pipe();
  }

  //SaveRank
  SaveRank(Id: any) {
    return this.http.post(urlConstant.ContractorTraining.SaveRank, Id).pipe();
  }
  AddComments(Id: any) {
    return this.http.post(urlConstant.ContractorTraining.AddComments, Id).pipe();
  }

  //UpdateContractorTraining
  UpdateContractorTraining(Id: any) {
    return this.http.post(urlConstant.ContractorTraining.UpdateContractorTraining, Id).pipe();
  }


  //Get By Id 
  GetContractorTraining(Id: string) {
    const did = "?id=" + Id;
    return this.http.get(urlConstant.ContractorTraining.GetContractorTraining + did).pipe();
  }

  GetSingleContractorTraining(Id: number) {
    const did = "?Id=" + Id;
    return this.http.get(urlConstant.ContractorTraining.GetSingleContractorTraining + did).pipe();
  }

  GetCountryGroup() {
    return this.http.get(urlConstant.ContractorTraining.GetCountryGroup).pipe();
  }
}
