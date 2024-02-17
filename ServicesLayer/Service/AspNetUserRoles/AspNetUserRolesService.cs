using DomainLayer.ViewModel.AspNetRoles;
using RepositoryLayer.IRepository;
using RepositoryLayer.IRepository.AspNetUserRoles;
using RepositoryLayer.IRepository.AspNetUsers;
using RepositoryLayer.IRepository.ContractorTraining;
using ServicesLayer.IService.AspNetUserRoles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.Service.AspNetUserRoles
{
    public class AspNetUserRolesService : IAspNetUserRolesService
    {
        private IRepository<DomainLayer.Model.AspNetRoles.AspNetRoles> _iAspNetRolesRepository;
        private IRepository<DomainLayer.Model.AspNetUserRoles.AspNetUserRoles> _iAspNetUserRolesRepository;
        private IRepository<DomainLayer.Model.AspNetUsers.AspNetUsers> _iAspNetUserRepository;
        private ICountryRepository iCountryRepository;
        public AspNetUserRolesService(
            IRepository<DomainLayer.Model.AspNetUserRoles.AspNetUserRoles> iAspNetUserRolesRepository,
            IRepository<DomainLayer.Model.AspNetUsers.AspNetUsers> iAspNetUserRepository,
            IRepository<DomainLayer.Model.AspNetRoles.AspNetRoles> iAspNetRolesRepository,
            ICountryRepository iCountryRepository

            )
        {
            this._iAspNetUserRolesRepository = iAspNetUserRolesRepository;
            this._iAspNetUserRepository = iAspNetUserRepository;
            this._iAspNetRolesRepository = iAspNetRolesRepository;
            this.iCountryRepository = iCountryRepository;
        }


        public IEnumerable<object> GetAllAspNetUserRoles()
        {
            try
            {
                List<DomainLayer.Model.AspNetUsers.AspNetUsers> aspNet = new List<DomainLayer.Model.AspNetUsers.AspNetUsers>();
                List<AspNetRolesViewModel> roles = new List<AspNetRolesViewModel>();
                aspNet = _iAspNetUserRepository.GetAll().ToList();
                var aspnetuserRoles = _iAspNetUserRolesRepository.GetAll().ToList();
                roles = this.iCountryRepository.GetAllRoles();
                var dealercontacts = from a in aspNet
                                     join c in aspnetuserRoles on a.Id equals c.UserId
                                     join s in roles on c.RoleId equals s.Id
                                     where s.NormalizedName == "USER"
                                     select new
                                     {
                                         aspNetrolename = s.NormalizedName,
                                         Email = a.Email,
                                         Username = a.UserName,
                                         FirstName = a.FirstName,
                                         LastName = a.LastName
                                     };

                var data = dealercontacts.ToList();
                return data;

            }
            catch (Exception ex)
            {

                throw;
            }

            return null;

        }
    }
}
