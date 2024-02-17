import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlConstant } from 'src/app/constant/urlConstant';

@Injectable({
  providedIn: 'root'
})
export class AllContractorTrainingService {

  constructor(public http: HttpClient) { }

  DeleteContractorTraining(Id: string) {
    const did = "?Id=" + Id;
    return this.http.get(urlConstant.ContractorTraining.DeleteContractorTraining + did).pipe();
  }
}
