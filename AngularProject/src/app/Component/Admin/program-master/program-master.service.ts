import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urlConstant } from 'src/app/constant/urlConstant';

@Injectable({
  providedIn: 'root'
})
export class ProgramMasterService {

  constructor(public http: HttpClient) { }

  //Get All ProgramMaster
  GetAllProgramMaster() {
    return this.http.get(urlConstant.ProgramMaster.GetAllProgramMaster).pipe();
  }

   //Insert-ProgramMaster
   InsertProgramMaster(Id: any) {
    return this.http.post(urlConstant.ProgramMaster.InsertProgramMaster, Id).pipe();
  }

  //Update-ProgramMaster
  UpdateProgramMaster(Id: any) {
    return this.http.post(urlConstant.ProgramMaster.UpdateProgramMaster, Id).pipe();
  }

   //Get By Id 
   GetProgramMaster(Id: string) {
    const did = "?id=" + Id;
    return this.http.get(urlConstant.ProgramMaster.GetProgramMaster + did).pipe();
  }

  //Delete-ContractorMaster
  DeleteProgramMaster(Id: string) {
    const did = "?Id=" + Id;
    return this.http.get(urlConstant.ProgramMaster.DeleteProgramMaster + did).pipe();
  }
}
