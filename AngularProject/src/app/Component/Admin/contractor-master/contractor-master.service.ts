import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urlConstant } from 'src/app/constant/urlConstant';

@Injectable({
  providedIn: 'root'
})
export class ContractorMasterService {

  constructor(public http: HttpClient) { }

  //Get All ContractorMaster
  GetAllContractorMaster() {
    return this.http.get(urlConstant.ContractorMaster.GetAllContractorMaster).pipe();
  }

   //Insert-ContractorMaster
   InsertContractorMaster(Id: any) {
    return this.http.post(urlConstant.ContractorMaster.InsertContractorMaster, Id).pipe();
  }

  //Update-ContractorMaster
  UpdateContractorMaster(Id: any) {
    return this.http.post(urlConstant.ContractorMaster.UpdateContractorMaster, Id).pipe();
  }

   //Get By Id 
   GetContractorMaster(Id: string) {
    const did = "?id=" + Id;
    return this.http.get(urlConstant.ContractorMaster.GetContractorMaster + did).pipe();
  }

  //Delete-ContractorMaster
  DeleteContractorMaster(Id: string) {
    const did = "?Id=" + Id;
    return this.http.get(urlConstant.ContractorMaster.DeleteContractorMaster + did).pipe();
  }

}
