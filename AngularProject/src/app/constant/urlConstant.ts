import { environment } from "../../environments/environment";


export const urlConstant = {
  BaseUrl: environment.apiUrl,

  AspNetUsers:
  {
    GetAllAspNetUsers: environment.apiUrl + '/api/AspNetUsers/GetAllAspNetUsers',
    GetAspNetUsers: environment.apiUrl + '/api/AspNetUsers/GetAspNetUsers',
    InsertLAspNetUsers: environment.apiUrl + '/api/AspNetUsers/InsertLAspNetUsers',
    UpdateLAspNetUsers: environment.apiUrl + '/api/AspNetUsers/UpdateLAspNetUsers',
    DeleteLAspNetUsers: environment.apiUrl + '/api/AspNetUsers/DeleteLAspNetUsers',
    UpdatePassword: environment.apiUrl + '/api/Authenticate/update-password',
    GetAllUserName: environment.apiUrl + '/api/AspNetUsers/GetAllUserName',
    ChangePassword: environment.apiUrl + '/api/Authenticate/ChangePassword',
  },
  Common: {
    GetAllCountries: environment.apiUrl + '/api/Common/GetAllCountries',
    GetAllRole: environment.apiUrl + '/api/Common/GetAllRole',
  },
  Applicant: {
    GetAllAspNetUserRoles: environment.apiUrl + '/api/AspNetUsers/GetAllAspNetUserRoles',
   
  },
  Isa:
  {
    ContractorTraining: environment.apiUrl + '/api/ContractorTraining/InsertContractorTraining',
    GetContractorTraining: environment.apiUrl + '/api/ContractorTraining/GetContractorTraining',
    GetAllContractorTraining: environment.apiUrl + '/api/ContractorTraining/GetAllContractorTraining',
    GetSubmittedApplicationDetail: environment.apiUrl + '/api/ContractorTraining/GetSubmittedApplicationDetail',
  },

  OtherLanguage:
  {
    OtherLanguage: environment.apiUrl + '/api/OtherLanguage/GetAllOtherLanguage'
  },


  ContractorTraining:
  {
    GetAllContractorTraining: environment.apiUrl + '/api/ContractorTraining/GetAllContractorTraining',
    GetContractorTraining: environment.apiUrl + '/api/ContractorTraining/GetContractorTraining',
    UpdateContractorTraining: environment.apiUrl + '/api/ContractorTraining/UpdateContractorTraining',
    SaveRank: environment.apiUrl + '/api/ContractorTraining/SaveRank',
    GetSingleContractorTraining: environment.apiUrl + '/api/ContractorTraining/GetSingleContractorTraining',
    GetSortedContractorTraining: environment.apiUrl + '/api/ContractorTraining/GetSortedContractorTraining',
    GetCountryGroup: environment.apiUrl + '/api/ContractorTraining/GetCountryGroup',
    DeleteContractorTraining: environment.apiUrl + '/api/ContractorTraining/DeleteContractorTraining',
    PassportPhotoPath: environment.apiUrl + '/Resources/Photos/PassportPhoto/',
    Documents: environment.apiUrl + '/Resources/Documents/SupportingDocuments/',
    AddComments: environment.apiUrl + '/api/ContractorTraining/AddComments',
  },

  ContractorMaster:
  {
    GetContractorMaster: environment.apiUrl + '/api/ContractorMaster/GetContractorMaster',
    GetAllContractorMaster: environment.apiUrl + '/api/ContractorMaster/GetAllContractorMaster',
    InsertContractorMaster: environment.apiUrl + '/api/ContractorMaster/InsertContractorMaster',
    UpdateContractorMaster: environment.apiUrl + '/api/ContractorMaster/UpdateContractorMaster',
    DeleteContractorMaster: environment.apiUrl + '/api/ContractorMaster/DeleteContractorMaster',    
  },

  ProgramMaster:
  {
    GetProgramMaster: environment.apiUrl + '/api/ProgramMaster/GetProgramMaster',
    GetAllProgramMaster: environment.apiUrl + '/api/ProgramMaster/GetAllProgramMaster',
    InsertProgramMaster: environment.apiUrl + '/api/ProgramMaster/InsertProgramMaster',
    UpdateProgramMaster: environment.apiUrl + '/api/ProgramMaster/UpdateProgramMaster',
    DeleteProgramMaster: environment.apiUrl + '/api/ProgramMaster/DeleteProgramMaster',
  }

}
