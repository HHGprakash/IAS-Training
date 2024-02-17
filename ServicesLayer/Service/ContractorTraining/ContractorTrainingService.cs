using DomainLayer.Model.ContractorTrainingNs;
using DomainLayer.ViewModel;
using DomainLayer.Model.AdditionalSkills;
using DomainLayer.Model.AspNetRoles;
using DomainLayer.ViewModel.ContractorTraining;
using RepositoryLayer.IRepository;
using RepositoryLayer.IRepository.ContractorTraining;
using ServicesLayer.IService.ContractorTraining;
using System;
using System.Collections.Generic;
using System.Net;
using static Utility.Enums;
using DomainLayer.ViewModel.AspNetUsers;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Net.Mail;

namespace ServicesLayer.Service.ContractorTrainingNs
{
    public class ContractorTrainingService : IContractorTrainingService
    {
        #region Property  
        private IRepository<ContractorTraining> _icontractorTrainingRepository;
        private IRepository<DomainLayer.Model.ContractorTrainingNs.Ranking> iRankingRepository;
        private IRepository<DomainLayer.ViewModel.ContractorTraining.ContractorTrainingVM> contractorTrainingViewModal;
        private IRepository<DomainLayer.Model.AdditionalSkills.AdditionalSkills> iAdditionalSkillsRepository;
        private IContractorTrainingRepository iContractorTrainingRepository;
        private IRepository<DomainLayer.Model.ContractorMaster.ContractorMaster> iContractorMasterRepository;
        private IRepository<DomainLayer.Model.ProgramMaster.ProgramMaster> iProgramMasterRepository;
        private IRepository<Employment> iEmploymentRepository;
        private IRepository<Education> iEducationRepository;
        private IRepository<SupportingDocuments> iSupportingDocumentsRepository;
        private IRepository<CountryGroup> iCountryGroupRepository;
        private IWebHostEnvironment _env;
        private ICommonRepository iCommonRepository;
        private readonly IConfiguration _configuration;

        #endregion

        #region Constructor  
        public ContractorTrainingService(IRepository<ContractorTraining> iRepository,
                                         IRepository<DomainLayer.ViewModel.ContractorTraining.ContractorTrainingVM> contractorTrainingViewModal,
                                         IRepository<DomainLayer.Model.AdditionalSkills.AdditionalSkills> iAdditionalSkillsRepository,
                                         IContractorTrainingRepository iContractorTrainingRepository,
                                         IRepository<DomainLayer.Model.ContractorMaster.ContractorMaster> iContractorMasterRepository,
                                         IRepository<DomainLayer.Model.ProgramMaster.ProgramMaster> iProgramMasterRepository,
                                         IRepository<DomainLayer.Model.ContractorTrainingNs.Ranking> iRankingRepository,
                                         IRepository<SupportingDocuments> iSupportingDocumentsRepository,
                                         ICommonRepository iCommonRepository,
                                         IRepository<Employment> iEmploymentRepository,
                                         IRepository<Education> iEducationRepository,
                                         IRepository<CountryGroup> iCountryGroupRepository,
                                         IWebHostEnvironment env,
                                         IConfiguration configuration
                                         )
        {
            this._icontractorTrainingRepository = iRepository;
            this.iAdditionalSkillsRepository = iAdditionalSkillsRepository;
            this.contractorTrainingViewModal = contractorTrainingViewModal;
            this.iContractorTrainingRepository = iContractorTrainingRepository;
            this.iContractorMasterRepository = iContractorMasterRepository;
            this.iProgramMasterRepository = iProgramMasterRepository;
            this.iRankingRepository = iRankingRepository;
            this.iCommonRepository = iCommonRepository;
            this.iEmploymentRepository = iEmploymentRepository;
            this.iEducationRepository = iEducationRepository;
            this.iSupportingDocumentsRepository = iSupportingDocumentsRepository;
            this.iCountryGroupRepository = iCountryGroupRepository;
            _env = env;
            _configuration = configuration;
        }

        #endregion

        //Insert
        public int InsertContractorTraining(ContractorTrainingViewModal contractorTraining)
        {
            ContractorTraining objContractorTraining = new ContractorTraining();
            DomainLayer.Model.AdditionalSkills.AdditionalSkills objAdditionalSkills = new DomainLayer.Model.AdditionalSkills.AdditionalSkills();

            objContractorTraining.Id = contractorTraining.Id;
            objContractorTraining.ContractorId = contractorTraining.ContractorId;
            objContractorTraining.ProgramApplyingId = contractorTraining.ProgramApplyingId;
            objContractorTraining.Year = contractorTraining.Year;
            objContractorTraining.Title = contractorTraining.Title;
            objContractorTraining.FirstName = contractorTraining.FirstName;
            objContractorTraining.MiddleInitial = contractorTraining.MiddleInitial;
            objContractorTraining.FamilyName = contractorTraining.FamilyName;
            objContractorTraining.DateofBirth = contractorTraining.DateofBirth;
            objContractorTraining.PlaceofBirth = contractorTraining.PlaceofBirth;
            objContractorTraining.Country = contractorTraining.Country;
            objContractorTraining.Nationality = contractorTraining.Nationality;
            objContractorTraining.Sex = contractorTraining.Sex;
            objContractorTraining.MaritalStatus = contractorTraining.MaritalStatus;
            objContractorTraining.ResidenceAddress = contractorTraining.ResidenceAddress;
            objContractorTraining.BusinessAddress = contractorTraining.BusinessAddress;
            objContractorTraining.PassportNo = contractorTraining.PassportNo;
            objContractorTraining.DateofIssue = contractorTraining.DateofIssue;
            objContractorTraining.PlaceofIssue = contractorTraining.PlaceofIssue;
            objContractorTraining.DateofExpiry = contractorTraining.DateofExpiry;
            objContractorTraining.Listening = contractorTraining.Listening;
            objContractorTraining.Speaking = contractorTraining.Speaking;
            objContractorTraining.Writing = contractorTraining.Writing;
            objContractorTraining.Reading = contractorTraining.Reading;
            objContractorTraining.OtherLanguage = contractorTraining.OtherLanguage;
            objContractorTraining.MotherLanguage = contractorTraining.MotherLanguage;
            //objContractorTraining.NameofInstitution = contractorTraining.NameofInstitution;
            //objContractorTraining.EducationFromYear = contractorTraining.EducationFromYear;
            //objContractorTraining.EducationFromMonth = contractorTraining.EducationFromMonth;
            //objContractorTraining.EducationToYear = contractorTraining.EducationToYear;
            //objContractorTraining.EducationToMonth = contractorTraining.EducationToMonth;
            //objContractorTraining.Address = contractorTraining.Address;
            //objContractorTraining.FieldofStudy = contractorTraining.FieldofStudy;
            //objContractorTraining.Qualification = contractorTraining.Qualification;
            objContractorTraining.Status = contractorTraining.Status;
            objContractorTraining.ResidenceNo = contractorTraining.ResidenceNo;
            objContractorTraining.OfficeNo = contractorTraining.OfficeNo;
            objContractorTraining.CellNo = contractorTraining.CellNo;
            objContractorTraining.FaxNo = contractorTraining.FaxNo;
            objContractorTraining.Email = contractorTraining.Email;
            objContractorTraining.UserId = contractorTraining.UserId;
            objContractorTraining.SubmissionDate = DateTime.Now;
            //objContractorTraining.FieldofStudySubCategory = contractorTraining.FieldofStudySubCategory;

            objContractorTraining.Status = 0;
            this._icontractorTrainingRepository.Insert(objContractorTraining);

            int conid = objContractorTraining.Id;
            objAdditionalSkills.ContractorTrainingId = conid;
            objAdditionalSkills.FieldsofScientificInterest = contractorTraining.FieldsofScientificInterest;
            objAdditionalSkills.Researchundertakenifany = contractorTraining.Researchundertakenifany;
            objAdditionalSkills.Participationininternationalsymposia = contractorTraining.Participationininternationalsymposia;
            objAdditionalSkills.AtseaWorkingExperience = contractorTraining.AtseaWorkingExperience;
            objAdditionalSkills.TrainingProgrammewillfurtheryourcareer = contractorTraining.TrainingProgrammewillfurtheryourcareer;
            objAdditionalSkills.Haveyoubeenpreviouslyselected = contractorTraining.Haveyoubeenpreviouslyselected;
            objAdditionalSkills.Whichprogramme = contractorTraining.Whichprogramme;
            objAdditionalSkills.Whichyear = contractorTraining.Whichyear;
            objAdditionalSkills.Didyouparticipate = contractorTraining.Didyouparticipate;
            this.iAdditionalSkillsRepository.Insert(objAdditionalSkills);

            foreach (var Employment in contractorTraining.Employment)
            {
                Employment Employmentdata = new Employment();
                if (Employment.Id == 0)
                {
                    Employmentdata.FromYear = Employment.FromYear;
                    Employmentdata.FromMonth = Employment.FromMonth;
                    Employmentdata.ToYear = Employment.ToYear;
                    Employmentdata.ToMonth = Employment.ToMonth;
                    Employmentdata.EmployerName = Employment.EmployerName;
                    Employmentdata.Position = Employment.Position;
                    Employmentdata.EmployerAddress = Employment.EmployerAddress;
                    Employmentdata.Responsibilities = Employment.Responsibilities;
                    Employmentdata.ContractorTrainingId = objContractorTraining.Id;
                    this.iEmploymentRepository.Insert(Employmentdata);
                }
            }

            foreach (var EducationRecord in contractorTraining.Education)
            {
                Education EducationData = new Education();
                if (EducationRecord.Id == 0)
                {
                    EducationData.NameofInstitution = EducationRecord.NameofInstitution;
                    EducationData.EducationFromYear = EducationRecord.EducationFromYear;
                    EducationData.EducationFromMonth = EducationRecord.EducationFromMonth;
                    EducationData.EducationToYear = EducationRecord.EducationToYear;
                    EducationData.EducationToMonth = EducationRecord.EducationToMonth;
                    EducationData.Address = EducationRecord.Address;
                    EducationData.FieldofStudy = EducationRecord.FieldofStudy;
                    EducationData.FieldofStudySubCategory = EducationRecord.FieldofStudySubCategory;
                    EducationData.Qualification = EducationRecord.Qualification;
                    EducationData.ContractorTrainingId = objContractorTraining.Id;

                    this.iEducationRepository.Insert(EducationData);
                }
            }

            this.iEmploymentRepository.SaveChanges();
            this.iEducationRepository.SaveChanges();

            string docfp = "/Resources/Documents/SupportingDocuments/" + objContractorTraining.Id;
            foreach (var doc in contractorTraining.SupportingDocList)
            {
                if (!string.IsNullOrEmpty(doc.Base64))
                {
                    SupportingDocuments supportingDocuments = new SupportingDocuments();
                    supportingDocuments.ContractorTrainingId = objContractorTraining.Id;
                    supportingDocuments.FileExtension = doc.FileType;
                    supportingDocuments.FileName = doc.FileName;
                    this.iSupportingDocumentsRepository.Insert(supportingDocuments);

                    string path1 = docfp + "/" + supportingDocuments.Id;
                    var mappedpath = _env.ContentRootPath + path1;
                    byte[] b = Convert.FromBase64String(doc.Base64);
                    string path = mappedpath;
                    //check if directory exist
                    if (!System.IO.Directory.Exists(path))
                    {
                        System.IO.Directory.CreateDirectory(path); //create directory if it doesn't exist
                    }
                    //set the image path
                    string filepath = Path.Combine(path + "\\" + doc.FileName);
                    byte[] imagebytes = Convert.FromBase64String(doc.Base64);
                    System.IO.File.WriteAllBytes(filepath, imagebytes);
                }
            }
            this.iSupportingDocumentsRepository.SaveChanges();

            bool emailsent = SendTrainigRegistrationMail(objContractorTraining);
            return objContractorTraining.Id;
        }




        #region Send Training registration mail


        public bool SendTrainigRegistrationMail(ContractorTraining objContractorTraining)
        {
            bool ismailsend = false;
            try
            {
                string UniqueToken = Guid.NewGuid().ToString();
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                string email_from = _configuration.GetSection("Smtp").GetSection("User").Value;
                string email_to = objContractorTraining.Email;
                string email_frmpwd = _configuration.GetSection("Smtp").GetSection("Pass").Value;
                MailMessage objMailMessage = new MailMessage();
                objMailMessage.To.Add(new MailAddress(email_to));
                objMailMessage.From = new MailAddress(email_from, "ISA");
                objMailMessage.Subject = "Training Registration Succefully";
                //objMailMessage.Body = "<h1>Welcome to ISA Contractor Training Programme</h1> <p>Dear "+ objContractorTraining.Title + " : " + "<b>" + objContractorTraining.FirstName + "</b><p>your Training Registration Succefully for program :"+ objContractorTraining.pro + " and your contrator name is "+ objContractorTraining.nam + " and you refrence no is : "+ objContractorTraining.Id + "</p></p>";

                objMailMessage.Body = "<h1>Welcome to ISA Contractor Training Programme</h1> <p>Dear " + objContractorTraining.Title + " : " + "<b>" + objContractorTraining.FirstName +" "+ objContractorTraining.MiddleInitial + " " + objContractorTraining.FamilyName + "</b><p>Your Training Registration was successful. Your reference no is: " + objContractorTraining.Id + "</p>Once a decision has been made concerning your application a further notification will be sent to you.</p>";

                objMailMessage.IsBodyHtml = true;
                objMailMessage.Priority = MailPriority.High;
                SmtpClient objSmptpClient = new SmtpClient();
                objSmptpClient.Host = _configuration.GetSection("Smtp").GetSection("Host").Value;
                objSmptpClient.Port = Convert.ToInt32(_configuration.GetSection("Smtp").GetSection("Port").Value);
                objSmptpClient.EnableSsl = Convert.ToBoolean(_configuration.GetSection("Smtp").GetSection("EnableSSL").Value);
                objSmptpClient.UseDefaultCredentials = false;
                objSmptpClient.Credentials = new System.Net.NetworkCredential(email_from, email_frmpwd);
                objSmptpClient.Send(objMailMessage);

                ismailsend = true;
            }
            catch (Exception ex)
            {

            }
            return ismailsend;
        }

        #endregion

        //Update
        public int UpdateContractorTraining(ContractorTrainingViewModal contractorTraining)
        {
            ContractorTraining objContractorTraining = _icontractorTrainingRepository.FindOne(contractorTraining.Id);
            if (objContractorTraining != null)
            {
                objContractorTraining.ContractorId = contractorTraining.ContractorId;
                objContractorTraining.ProgramApplyingId = contractorTraining.ProgramApplyingId;
                objContractorTraining.Year = contractorTraining.Year;
                objContractorTraining.Title = contractorTraining.Title;
                objContractorTraining.FirstName = contractorTraining.FirstName;
                objContractorTraining.MiddleInitial = contractorTraining.MiddleInitial;
                objContractorTraining.FamilyName = contractorTraining.FamilyName;
                objContractorTraining.DateofBirth = contractorTraining.DateofBirth;
                objContractorTraining.PlaceofBirth = contractorTraining.PlaceofBirth;
                objContractorTraining.Country = contractorTraining.Country;
                objContractorTraining.Nationality = contractorTraining.Nationality;
                objContractorTraining.Sex = contractorTraining.Sex;
                objContractorTraining.MaritalStatus = contractorTraining.MaritalStatus;
                objContractorTraining.ResidenceAddress = contractorTraining.ResidenceAddress;
                objContractorTraining.BusinessAddress = contractorTraining.BusinessAddress;
                objContractorTraining.PassportNo = contractorTraining.PassportNo;
                objContractorTraining.DateofIssue = contractorTraining.DateofIssue;
                objContractorTraining.PlaceofIssue = contractorTraining.PlaceofIssue;
                objContractorTraining.DateofExpiry = contractorTraining.DateofExpiry;
                objContractorTraining.Listening = contractorTraining.Listening;
                objContractorTraining.Speaking = contractorTraining.Speaking;
                objContractorTraining.Writing = contractorTraining.Writing;
                objContractorTraining.Reading = contractorTraining.Reading;
                objContractorTraining.OtherLanguage = contractorTraining.OtherLanguage;
                objContractorTraining.MotherLanguage = contractorTraining.MotherLanguage;
                //objContractorTraining.NameofInstitution = contractorTraining.NameofInstitution;
                //objContractorTraining.EducationFromYear = contractorTraining.EducationFromYear;
                //objContractorTraining.EducationFromMonth = contractorTraining.EducationFromMonth;
                //objContractorTraining.EducationToYear = contractorTraining.EducationToYear;
                //objContractorTraining.EducationToMonth = contractorTraining.EducationToMonth;
                //objContractorTraining.Address = contractorTraining.Address;
                //objContractorTraining.FieldofStudy = contractorTraining.FieldofStudy;
                //objContractorTraining.Qualification = contractorTraining.Qualification;
                objContractorTraining.Status = contractorTraining.Status;
                objContractorTraining.ResidenceNo = contractorTraining.ResidenceNo;
                objContractorTraining.OfficeNo = contractorTraining.OfficeNo;
                objContractorTraining.CellNo = contractorTraining.CellNo;
                objContractorTraining.FaxNo = contractorTraining.FaxNo;
                objContractorTraining.Email = contractorTraining.Email;


                this._icontractorTrainingRepository.Update(objContractorTraining);
                this._icontractorTrainingRepository.SaveChanges();


                DomainLayer.Model.AdditionalSkills.AdditionalSkills objAdditionalSkills = this.iAdditionalSkillsRepository.Filter(r => r.ContractorTrainingId == objContractorTraining.Id).FirstOrDefault();
                if (objAdditionalSkills != null)
                {
                    int conid = objContractorTraining.Id;
                    objAdditionalSkills.ContractorTrainingId = conid;
                    objAdditionalSkills.FieldsofScientificInterest = contractorTraining.FieldsofScientificInterest;
                    objAdditionalSkills.Researchundertakenifany = contractorTraining.Researchundertakenifany;
                    objAdditionalSkills.Participationininternationalsymposia = contractorTraining.Participationininternationalsymposia;
                    objAdditionalSkills.AtseaWorkingExperience = contractorTraining.AtseaWorkingExperience;
                    objAdditionalSkills.TrainingProgrammewillfurtheryourcareer = contractorTraining.TrainingProgrammewillfurtheryourcareer;
                    this.iAdditionalSkillsRepository.Update(objAdditionalSkills);
                    this.iAdditionalSkillsRepository.SaveChanges();
                }
                string docfp = "/Resources/Documents/SupportingDocuments/" + objContractorTraining.Id;

                var DocActionsList = this.iSupportingDocumentsRepository.Filter(x => x.ContractorTrainingId == objContractorTraining.Id).ToList();
                var DocavailabelList = DocActionsList.Select(x => x.Id).ToList();
                var DocUpdatedList = contractorTraining.SupportingDocList.Select(x => x.DocId).ToList();
                var DocDeleteList = DocavailabelList.Except(DocUpdatedList);

                foreach (var del in DocDeleteList)
                {
                    SupportingDocuments doc = this.iSupportingDocumentsRepository.FindOne(del);
                    if (doc != null)
                        this.iSupportingDocumentsRepository.Delete(doc);

                    string path1 = docfp + "/" + doc.Id;
                    var mappedpath = _env.ContentRootPath + path1;
                    //check if directory exist
                    if (System.IO.Directory.Exists(mappedpath))
                    {
                        DirectoryInfo d = new DirectoryInfo(mappedpath);
                        FileInfo[] Files = d.GetFiles();
                        foreach (var item in Files)
                        {
                            item.Delete();
                        }
                    }
                }


                foreach (var doc in contractorTraining.SupportingDocList)
                {
                    if (!string.IsNullOrEmpty(doc.Base64))
                    {
                        SupportingDocuments supportingDocuments = new SupportingDocuments();
                        supportingDocuments.ContractorTrainingId = objContractorTraining.Id;
                        supportingDocuments.FileExtension = doc.FileType;
                        supportingDocuments.FileName = doc.FileName;
                        this.iSupportingDocumentsRepository.Insert(supportingDocuments);

                        string path1 = docfp + "/" + supportingDocuments.Id;
                        var mappedpath = _env.ContentRootPath + path1;
                        byte[] b = Convert.FromBase64String(doc.Base64);
                        string path = mappedpath;
                        //check if directory exist
                        if (!System.IO.Directory.Exists(path))
                        {
                            System.IO.Directory.CreateDirectory(path); //create directory if it doesn't exist
                        }
                        //set the image path
                        string filepath = Path.Combine(path + "\\" + doc.FileName);
                        byte[] imagebytes = Convert.FromBase64String(doc.Base64);
                        System.IO.File.WriteAllBytes(filepath, imagebytes);
                    }
                }

                var ActionsList = this.iEmploymentRepository.Filter(x => x.ContractorTrainingId == objContractorTraining.Id).ToList();
                var availabelList = ActionsList.Select(x => x.Id).ToList();
                var UpdatedList = contractorTraining.Employment.Select(x => x.Id).ToList();
                var DeleteList = availabelList.Except(UpdatedList);


                foreach (var del in DeleteList)
                {
                    Employment emp = this.iEmploymentRepository.FindOne(del);
                    if (emp != null)
                        this.iEmploymentRepository.Delete(emp);
                }
                this.iEmploymentRepository.SaveChanges();
                foreach (var Employment in contractorTraining.Employment)
                {
                    Employment Employmentdata = this.iEmploymentRepository.FindOne(Employment.Id);
                    if (Employmentdata != null)
                    {
                        Employmentdata.FromYear = Employment.FromYear;
                        Employmentdata.FromMonth = Employment.FromMonth;
                        Employmentdata.ToYear = Employment.ToYear;
                        Employmentdata.ToMonth = Employment.ToMonth;
                        Employmentdata.EmployerName = Employment.EmployerName;
                        Employmentdata.Position = Employment.Position;
                        Employmentdata.EmployerAddress = Employment.EmployerAddress;
                        Employmentdata.Responsibilities = Employment.Responsibilities;
                        Employmentdata.ContractorTrainingId = objContractorTraining.Id;
                        this.iEmploymentRepository.Update(Employmentdata);


                    }
                    else
                    {
                        Employmentdata = new Employment();
                        Employmentdata.FromYear = Employment.FromYear;
                        Employmentdata.FromMonth = Employment.FromMonth;
                        Employmentdata.ToYear = Employment.ToYear;
                        Employmentdata.ToMonth = Employment.ToMonth;
                        Employmentdata.EmployerName = Employment.EmployerName;
                        Employmentdata.Position = Employment.Position;
                        Employmentdata.EmployerAddress = Employment.EmployerAddress;
                        Employmentdata.Responsibilities = Employment.Responsibilities;
                        Employmentdata.ContractorTrainingId = objContractorTraining.Id;
                        this.iEmploymentRepository.Update(Employmentdata);
                    }
                    this.iEmploymentRepository.SaveChanges();
                }
            }
            return contractorTraining.Id;
        }

        //GetAllContractorTraining
        public IEnumerable<ContractorTrainingVM> GetAllContractorTraining(int status)
        {
            List<ContractorTrainingVM> ContractorTraining = new List<ContractorTrainingVM>();
            ContractorTraining = this.iContractorTrainingRepository.GetAllContractorTraining(status).ToList();

            foreach (var item in ContractorTraining)
            {
                var Contractor = this.iContractorMasterRepository.FindOne(x => x.Id == item.ContractorId);
                if (Contractor != null)
                {
                    item.ContractorName = this.iContractorMasterRepository.FindOne(x => x.Id == item.ContractorId).ContractorName;
                }

                var ProgramApply = this.iProgramMasterRepository.FindOne(y => y.Id == item.ProgramApplyingId);
                if (ProgramApply != null)
                {
                    item.ProgramApplyingFor = this.iProgramMasterRepository.FindOne(y => y.Id == item.ProgramApplyingId).Program;
                }
            }
            //GetSortedContractorTraining();
            return ContractorTraining.OrderByDescending(r => r.Id);
        }

        public ContractorTrainingViewModal GetSingleContractorTraining(int Id, string Username)
        {
            string Userid = this.iCommonRepository.GetUserId(Username);
            ContractorTrainingViewModal contractorTrainingVM = new ContractorTrainingViewModal();
            contractorTrainingVM = this.iContractorTrainingRepository.GetSingleContractorTraining(Id, Userid);
            if (contractorTrainingVM != null)
            {
                var docData = this.iSupportingDocumentsRepository.Filter(r => r.ContractorTrainingId == Id).ToList();
                string path = _env.ContentRootPath + "/Resources/Photos/PassportPhoto/" + contractorTrainingVM.Id;
                if (Directory.Exists(path))
                {
                    DirectoryInfo d = new DirectoryInfo(path);
                    FileInfo[] Files = d.GetFiles();
                    if (Files.Length > 0)
                        contractorTrainingVM.PassportPhotoName = Files[0].Name;
                }
                contractorTrainingVM.SupportingDocList = new List<DocumentModel>();
                foreach (var item in docData)
                {
                    contractorTrainingVM.SupportingDocList.Add(new DocumentModel
                    {
                        DocId = item.Id,
                        FileName = item.FileName,
                        FileType = item.FileExtension
                    });
                }

            }


            return contractorTrainingVM;
        }

        public object GetSortedContractorTraining()
        {

            List<ContractorTrainingVM> contractorTraining = this.iContractorTrainingRepository.GetAllContractorTraining(1);


            foreach (var item in contractorTraining.OrderBy(r => r.Id))
            {
                string path = _env.ContentRootPath + "/Resources/Photos/PassportPhoto/" + item.Id;
                if (Directory.Exists(path))
                {
                    DirectoryInfo d = new DirectoryInfo(path);
                    FileInfo[] Files = d.GetFiles();
                    if (Files.Length > 0)
                        item.PassportPhotoName = Files[0].Name;
                }
            }

            List<RankingViewModel> rankingViewModel = this.iContractorTrainingRepository.GetApplicantRanking();

            List<AspNetUsersViewModel> aspNetUsersViewModel = this.iContractorTrainingRepository.GetUserByRole("LtcUser");

            var data = new
            {
                contractorTraining,
                rankingViewModel,
                aspNetUsersViewModel
            };
            return data;
        }

        //GetBy Id
        public APIResponse GetContractorTraining(int id)
        {
            var data = this._icontractorTrainingRepository.Get(id);
            if (data != null)
            {
                data.Employment = this.iEmploymentRepository.Filter(r => r.ContractorTrainingId == id).ToList();
                data.AdditionalSkills = this.iAdditionalSkillsRepository.Filter(r => r.ContractorTrainingId == id).ToList();
                data.Education = this.iEducationRepository.Filter(r => r.ContractorTrainingId == id).ToList();

                string path = _env.ContentRootPath + "/Resources/Photos/PassportPhoto/" + data.Id;
                if (Directory.Exists(path))
                {
                    DirectoryInfo d = new DirectoryInfo(path);
                    FileInfo[] Files = d.GetFiles();
                    if (Files.Length > 0)
                        data.PassportPhotoName = Files[0].Name;
                }

                var docData = this.iSupportingDocumentsRepository.Filter(r => r.ContractorTrainingId == id).ToList();

                data.SupportingDocList = new List<DocumentModel>();
                foreach (var item in docData)
                {
                    data.SupportingDocList.Add(new DocumentModel
                    {
                        DocId = item.Id,
                        FileName = item.FileName,
                        FileType = item.FileExtension
                    });
                }


                return new APIResponse(HttpStatusCode.OK, APIStatus.Success, "Something went wrong ", data);
            }
            else
            {
                return new APIResponse(HttpStatusCode.OK, APIStatus.Failure, "Record not found", string.Empty);
            }
        }

        public APIResponse GetSubmittedApplicationDetail(string id)
        {
            List<ContractorTrainingViewModal> ContractorTrainingVM = new List<ContractorTrainingViewModal>();
            List<ContractorTraining> ContractorTraining = this._icontractorTrainingRepository.GetAll().Where(r => r.UserId == id).ToList();
            if (ContractorTraining != null)
            {
                foreach (ContractorTraining item in ContractorTraining)
                {
                    ContractorTrainingViewModal TrainingVM = new ContractorTrainingViewModal();
                    TrainingVM.Id = item.Id;
                    TrainingVM.ContractorId = item.ContractorId;
                    TrainingVM.ProgramApplyingId = item.ProgramApplyingId;
                    TrainingVM.Year = item.Year;
                    TrainingVM.Status = item.Status;
                    ContractorTrainingVM.Add(TrainingVM);
                }
                return new APIResponse(HttpStatusCode.OK, APIStatus.Success, "Record found", ContractorTrainingVM);
            }
            else
            {
                return new APIResponse(HttpStatusCode.OK, APIStatus.Failure, "Record not found", ContractorTrainingVM);
            }
        }

        public APIResponse SaveRank(AddRankViewModel addRankViewModel)
        {
            try
            {
                ContractorTraining contractorTraining = new ContractorTraining();
                contractorTraining = this._icontractorTrainingRepository.FindOne(x => x.Status == 1);
                if (contractorTraining != null)
                {
                    DomainLayer.Model.ContractorTrainingNs.Ranking ranking = new DomainLayer.Model.ContractorTrainingNs.Ranking();
                    ranking = this.iRankingRepository.FindOne(x => x.CandidateId == addRankViewModel.CandidateId && x.LtcMemberId == addRankViewModel.CurrentMemberId);
                    if (ranking != null)
                    {
                        ranking.Rank = addRankViewModel.Rank;
                        this.iRankingRepository.Update(ranking);
                        this.iRankingRepository.SaveChanges();
                    }
                    else
                    {
                        ranking = new DomainLayer.Model.ContractorTrainingNs.Ranking();
                        ranking.Rank = addRankViewModel.Rank;
                        ranking.CandidateId = addRankViewModel.CandidateId;
                        ranking.LtcMemberId = addRankViewModel.CurrentMemberId;
                        this.iRankingRepository.Insert(ranking);
                        this.iRankingRepository.SaveChanges();
                    }
                }
                else
                {
                    return new APIResponse(HttpStatusCode.OK, APIStatus.Failure, "Something went wrong ", string.Empty);
                }
                return new APIResponse(HttpStatusCode.OK, APIStatus.Success, string.Empty, string.Empty);
            }
            catch (Exception ex)
            {
                return new APIResponse(HttpStatusCode.OK, APIStatus.Success, ex.ToString(), string.Empty);
            }
        }

        public object GetCountryGroup()
        {
            var data = iCountryGroupRepository.GetAll();
            return data;
        }

        public object DeleteContractorTraining(int Id)
        {
            var data = this._icontractorTrainingRepository.FindOne(Id);
            if (data != null)
            {

                this.iAdditionalSkillsRepository.Filter(r => r.ContractorTrainingId == data.Id).ToList().ForEach(x =>
                this.iAdditionalSkillsRepository.Delete(x)
                );
                this.iAdditionalSkillsRepository.SaveChanges();


                this.iEmploymentRepository.Filter(r => r.ContractorTrainingId == data.Id).ToList().ForEach(x =>
                this.iEmploymentRepository.Delete(x)
                );
                this.iEmploymentRepository.SaveChanges();

                this.iEducationRepository.Filter(r => r.ContractorTrainingId == data.Id).ToList().ForEach(x =>
                this.iEducationRepository.Delete(x)
                );
                this.iEmploymentRepository.SaveChanges();

                string docfp = "/Resources/Documents/SupportingDocuments/" + data.Id;

                var SuppDoc = this.iSupportingDocumentsRepository.Filter(r => r.ContractorTrainingId == data.Id).ToList();
                foreach (var item in SuppDoc)
                {
                    this.iSupportingDocumentsRepository.Delete(item);

                    string path1 = docfp + "/" + item.Id;
                    var mappedpath = _env.ContentRootPath + path1;
                    string filepath = Path.Combine(mappedpath + "\\" + item.FileName);
                    if (File.Exists(filepath))
                        File.Delete(filepath);
                }

                this.iSupportingDocumentsRepository.SaveChanges();

                string passport = _env.ContentRootPath + "/Resources/Photos/PassportPhoto/" + data.Id;

                if (Directory.Exists(passport))
                {
                    string[] files = Directory.GetFiles(passport);
                    foreach (string file in files)
                    {
                        File.Delete(file);
                    }
                }


                this._icontractorTrainingRepository.Delete(data);
                this._icontractorTrainingRepository.SaveChanges();
            }

            return data;
        }

        public APIResponse AddComments(ContractorTrainingViewModal contractorTrainingvm)
        {
            try
            {
                ContractorTraining contractorTraining = new ContractorTraining();

                contractorTraining = this._icontractorTrainingRepository.FindOne(x => x.Id == contractorTrainingvm.Id);
                if (contractorTraining != null)
                {
                    contractorTraining.Comments = contractorTrainingvm.Comments;
                    contractorTraining.CommentsCreatedBy = contractorTraining.UserId;
                    contractorTraining.CommentsCreatedDateTime = DateTime.Now;


                    this._icontractorTrainingRepository.Update(contractorTraining);
                    this._icontractorTrainingRepository.SaveChanges();
                }
                else
                {
                    return new APIResponse(HttpStatusCode.OK, APIStatus.Failure, "Something went wrong ", string.Empty);
                }
                return new APIResponse(HttpStatusCode.OK, APIStatus.Success, string.Empty, string.Empty);
            }
            catch (Exception ex)
            {
                return new APIResponse(HttpStatusCode.OK, APIStatus.Success, ex.ToString(), string.Empty);
            }
        }
    }
}
