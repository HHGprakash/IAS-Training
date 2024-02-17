using DomainLayer.Model.AspNetUsers;
using DomainLayer.ViewModel.AspNetRoles;
using Microsoft.Extensions.Configuration;
using RepositoryLayer.Authentication;
using RepositoryLayer.IRepository;
using RepositoryLayer.IRepository.AspNetUserRoles;
using RepositoryLayer.IRepository.AspNetUsers;
using RepositoryLayer.IRepository.ContractorTraining;
using ServicesLayer.IService.AspNetUsers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using static ServicesLayer.Enums.Enums;

namespace ServicesLayer.Service.AspNetUsers
{
    public class AspNetUsersService : IAspNetUsersService
    {

        #region Property  
        //private IAspNetUsersRepository iAspNetUsersRepository;
        private IRepository<DomainLayer.Model.AspNetUsers.AspNetUsers> _iAspNetUserRepository;
        private ICountryRepository iCountryRepository;
        //AspNetUserRoles
        //private IAspNetUserRolesRepository iAspNetUserRolesRepository;
        private IRepository<DomainLayer.Model.AspNetUserRoles.AspNetUserRoles> _iAspNetUserRolesRepository;
        private IRepository<DomainLayer.Model.AspNetRoles.AspNetRoles> _iAspNetRolesRepository;
        private IRepository<DomainLayer.Model.ContractorTrainingNs.Ranking> iRankingRepository;
        private readonly IConfiguration _configuration;

        #endregion

        #region Constructor  
        public AspNetUsersService(IRepository<DomainLayer.Model.AspNetUsers.AspNetUsers> iAspNetUserRepository,
            IRepository<DomainLayer.Model.AspNetUserRoles.AspNetUserRoles> iAspNetUserRolesRepository,
            IRepository<DomainLayer.Model.AspNetRoles.AspNetRoles> iAspNetRolesRepository,
            ICountryRepository iCountryRepository,
           IRepository<DomainLayer.Model.ContractorTrainingNs.Ranking> iRankingRepository,
           IConfiguration configuration)
        {
            this._iAspNetUserRepository = iAspNetUserRepository;
            //AspNetUserRoles
            this._iAspNetUserRolesRepository = iAspNetUserRolesRepository;
            this._iAspNetRolesRepository = iAspNetRolesRepository;
            this.iCountryRepository = iCountryRepository;
            this.iRankingRepository = iRankingRepository;
            this.iRankingRepository = iRankingRepository;
            _configuration = configuration;
        }

        #endregion
        public IEnumerable<object> GetAllAspNetUsers(string RoleId) //Chnage 
        {
            List<DomainLayer.Model.AspNetUsers.AspNetUsers> aspNet = new List<DomainLayer.Model.AspNetUsers.AspNetUsers>();
            //var aspnetuserRoles = _iAspNetUserRolesRepository.GetAll().Where(r => r.RoleId == RoleId).ToList();
            var aspnetuserRoles = _iAspNetUserRolesRepository.GetAll().ToList();
            var aspnetUsers = this._iAspNetUserRepository.GetAll();
            //var roles = this._iAspNetRolesRepository.GetAll();
            List<AspNetRolesViewModel> roles = new List<AspNetRolesViewModel>();
            roles = this.iCountryRepository.GetAllRole();

            var dealercontacts = from user in aspnetUsers
                                 join role in aspnetuserRoles on user.Id equals role.UserId
                                 join roleName in roles on role.RoleId equals roleName.Id
                                 select new
                                 {
                                     RoleName = roleName.NormalizedName,
                                     user,
                                     role
                                 };

            var data = dealercontacts.ToList().OrderBy(x => x.RoleName);
            return data;
        }
        public DomainLayer.Model.AspNetUsers.AspNetUsers GetAspNetUsers(string id)
        {
            return this._iAspNetUserRepository.FindOne(id);
        }

        //public void InsertLAspNetUsers(DomainLayer.Model.AspNetUsers.AspNetUsers aspNetUsers)
        //{
        //    DomainLayer.Model.AspNetUserRoles.AspNetUserRoles aspNetUserRoles = new DomainLayer.Model.AspNetUserRoles.AspNetUserRoles();

        //    aspNetUsers.Id = Guid.NewGuid().ToString();
        //    this.iRepository.Insert(aspNetUsers);

        //    //AspNetUserRoles
        //    aspNetUserRoles.UserId = aspNetUsers.Id;
        //    aspNetUserRoles.RoleId = "f57ae075-6dff-4e04-b885-1ced9eb84924";

        //    this.iRepository1.Insert(aspNetUserRoles);
        //}

        public bool CheckUserAlreadyRegister(string email)
        {
            bool userexist;
            var user = this._iAspNetUserRepository.FindOne(r => r.Email == email);
            return userexist = user != null ? true : false;
        }
        public DomainLayer.Model.AspNetUsers.AspNetUsers InsertLAspNetUsers(DomainLayer.ViewModel.AspNetUsers.AspNetUsersViewModel aspNetUsersViewModel)
        {
            DomainLayer.Model.AspNetUserRoles.AspNetUserRoles aspNetUserRoles = new DomainLayer.Model.AspNetUserRoles.AspNetUserRoles();
            DomainLayer.Model.AspNetUsers.AspNetUsers aspNetUsers = new DomainLayer.Model.AspNetUsers.AspNetUsers();

            aspNetUsers.Id = aspNetUsersViewModel.Id;
            aspNetUsers.UserName = aspNetUsersViewModel.UserName;
            aspNetUsers.NormalizedUserName = aspNetUsersViewModel.UserName;
            aspNetUsers.Email = aspNetUsersViewModel.Email;
            aspNetUsers.NormalizedEmail = aspNetUsersViewModel.Email;
            aspNetUsers.EmailConfirmed = false;
            aspNetUsers.PasswordHash = null;
            aspNetUsers.SecurityStamp = "JDMOPVVEH5USHJDASF7ENU5PK4R2IKXM";
            aspNetUsers.ConcurrencyStamp = "119b9320-6819-4f0a-aa71-e1f2f09a9cfd";
            aspNetUsers.PhoneNumber = aspNetUsersViewModel.PhoneNumber;
            aspNetUsers.PhoneNumberConfirmed = false;
            aspNetUsers.TwoFactorEnabled = false;
            aspNetUsers.LockoutEnd = null;
            aspNetUsers.LockoutEnabled = true;
            aspNetUsers.AccessFailedCount = 0;
            aspNetUsers.IsActive = aspNetUsersViewModel.IsActive;
            aspNetUsers.PhoneNumber1 = aspNetUsersViewModel.PhoneNumber1;
            aspNetUsers.FirstName = aspNetUsersViewModel.FirstName;
            aspNetUsers.LastName = aspNetUsersViewModel.LastName;
            aspNetUsers.DateOfBirth = aspNetUsersViewModel.DateOfBirth;
            aspNetUsers.JoiningDate = aspNetUsersViewModel.JoiningDate;

            aspNetUsers.Id = Guid.NewGuid().ToString();

            if (aspNetUsersViewModel.RoleId == "614c64c2-247d-4408-8d0a-43828c1da856")
            {
                var MaxCandidateSequenceNo = this._iAspNetUserRepository.GetAll().Max(r => r.CandidateSequenceNo);
                if (MaxCandidateSequenceNo == null)
                {
                    aspNetUsers.CandidateSequenceNo = 111111;
                }
                aspNetUsers.CandidateSequenceNo = MaxCandidateSequenceNo + 1;
                aspNetUsers.UserName = aspNetUsers.CandidateSequenceNo.ToString();
                aspNetUsers.NormalizedUserName = aspNetUsers.UserName;
                this.SendUserName(aspNetUsers.NormalizedUserName, aspNetUsers.NormalizedEmail);
            }

            this._iAspNetUserRepository.Insert(aspNetUsers);

            //AspNetUserRoles
            aspNetUserRoles.UserId = aspNetUsers.Id;
            //if (aspNetUsersViewModel.Type == "TrainingOfficer")
            //    aspNetUserRoles.RoleId = "b5ab0355-b020-419d-8c42-1ba21247994c";
            //else if (aspNetUsersViewModel.Type == "Ltc")
            //    aspNetUserRoles.RoleId = "f57ae075-6dff-4e04-b885-1ced9eb84924";

            aspNetUserRoles.RoleId = aspNetUsersViewModel.RoleId;
            this._iAspNetUserRolesRepository.Insert(aspNetUserRoles);



            return aspNetUsers;
        }



        public void SendUserName(string UserName, string Email)
        {
            try
            {
                string UniqueToken = Guid.NewGuid().ToString();
                System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                string email_from = _configuration.GetSection("Smtp").GetSection("User").Value;
                string email_to = Email;
                string email_frmpwd = _configuration.GetSection("Smtp").GetSection("Pass").Value;
                MailMessage objMailMessage = new MailMessage();
                objMailMessage.To.Add(new MailAddress(email_to));
                objMailMessage.From = new MailAddress(email_from, "ISA");
                objMailMessage.Subject = "Your ISA application User Name";
                objMailMessage.Body = "<h1>Welcome to ISA Contractor Training Programme</h1> <p>Your user id for login to application is:  " + "<b>" + UserName + "</b></p> <p>Note: This is one time generated user id. Please remember your user id for future application login.</p>";
                objMailMessage.IsBodyHtml = true;
                objMailMessage.Priority = MailPriority.High;
                SmtpClient objSmptpClient = new SmtpClient();
                objSmptpClient.Host = _configuration.GetSection("Smtp").GetSection("Host").Value;
                objSmptpClient.Port = Convert.ToInt32(_configuration.GetSection("Smtp").GetSection("Port").Value);
                objSmptpClient.EnableSsl = Convert.ToBoolean(_configuration.GetSection("Smtp").GetSection("EnableSSL").Value);
                objSmptpClient.UseDefaultCredentials = false;
                objSmptpClient.Credentials = new System.Net.NetworkCredential(email_from, email_frmpwd);
                objSmptpClient.Send(objMailMessage);
            }
            catch (Exception ex)
            {

            }
        }

        public DomainLayer.Model.AspNetUsers.AspNetUsers UpdateLAspNetUsers(DomainLayer.Model.AspNetUsers.AspNetUsers aspNetUsers)
        {
            DomainLayer.Model.AspNetUsers.AspNetUsers aspNetUsers1 = new DomainLayer.Model.AspNetUsers.AspNetUsers();
            aspNetUsers1 = this._iAspNetUserRepository.FindOne(x => x.Id == aspNetUsers.Id);
            aspNetUsers1.FirstName = aspNetUsers.FirstName;
            aspNetUsers1.LastName = aspNetUsers.LastName;
            aspNetUsers1.Email = aspNetUsers.Email;
            aspNetUsers1.JoiningDate = aspNetUsers.JoiningDate;
            aspNetUsers1.IsActive = aspNetUsers.IsActive;
            aspNetUsers1.IsActive = aspNetUsers.IsActive;
            aspNetUsers1.PasswordHash = (string.IsNullOrEmpty(aspNetUsers.PasswordHash) ? aspNetUsers1.PasswordHash : aspNetUsers.PasswordHash);
            this._iAspNetUserRepository.Update(aspNetUsers1);

            var aspnetuserRoles = _iAspNetUserRolesRepository.FindOne(x => x.UserId == aspNetUsers1.Id);
            aspnetuserRoles.RoleId = aspNetUsers.RoleId;
            _iAspNetUserRolesRepository.Update(aspnetuserRoles);
            _iAspNetUserRolesRepository.SaveChanges();
            // AspNetUserRoles AspNetUserRoles = new AspNetUserRoles();

            return aspNetUsers1;
        }
        public void DeleteLAspNetUsers(string id)
        {

            DomainLayer.Model.AspNetUsers.AspNetUsers aspNetUsers = GetAspNetUsers(id);
            this.iRankingRepository.Filter(r => r.LtcMemberId == aspNetUsers.Id).ToList().ForEach(x =>
             this.iRankingRepository.Delete(x)
             );
            this.iRankingRepository.SaveChanges();

            DomainLayer.Model.AspNetUserRoles.AspNetUserRoles aspNetUserRoles = this._iAspNetUserRolesRepository.FindOne(x => x.UserId == aspNetUsers.Id);
            this._iAspNetUserRolesRepository.Remove(aspNetUserRoles);
            this._iAspNetUserRolesRepository.SaveChanges();
            this._iAspNetUserRepository.Remove(aspNetUsers);
            this._iAspNetUserRepository.SaveChanges();


        }

        public DomainLayer.Model.AspNetUserRoles.AspNetUserRoles GetAspNetUsersRole(string id)
        {
            return this._iAspNetUserRolesRepository.FindOne(x => x.UserId == id);
        }

        //Get All UserName
        public IEnumerable<string> GetAllUserName()
        {
            var res = _iAspNetUserRepository.GetAll().Select(x => x.UserName).ToList();
            return res;
        }

    }
}
