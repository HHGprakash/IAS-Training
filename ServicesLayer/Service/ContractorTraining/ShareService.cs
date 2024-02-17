using DomainLayer.Model.AspNetRoles;
using DomainLayer.ViewModel.AspNetRoles;
using DomainLayer.ViewModel.ContractorTraining;
using RepositoryLayer.IRepository;
using RepositoryLayer.IRepository.ContractorTraining;
using ServicesLayer.IService.ContractorTraining;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.Service.ContractorTrainingNs
{
    public class ShareService : IShareService
    {
        #region Property  
         private ICountryRepository iCountryRepository;
         private ICommonRepository iCommonRepository;
        private IRepository<AspNetRoles> iAspNetRoles;
        #endregion

        #region Constructor  
        public ShareService(ICountryRepository iCountryRepository,
            IRepository<AspNetRoles> iAspNetRoles,
            ICommonRepository iCommonRepository)
        {
            this.iCountryRepository = iCountryRepository;
            this.iAspNetRoles = iAspNetRoles;
            this.iCommonRepository = iCommonRepository;
        }
        #endregion

        public List<CountryViewModel> GetAllCountries()
        {
            List<CountryViewModel> CountryList = new List<CountryViewModel>();
            CountryList = this.iCountryRepository.GetAllCountries();
            return CountryList;
        }

        public List<AspNetRolesViewModel> GetAllRole()
        {
            List<AspNetRolesViewModel> RoleList = new List<AspNetRolesViewModel>();
            RoleList = this.iCountryRepository.GetAllRole();
            return RoleList;
        }

        public string GetUserId(string Username)
        {            
            string UserId = this.iCommonRepository.GetUserId(Username);
            return UserId;
        }

    }
}
