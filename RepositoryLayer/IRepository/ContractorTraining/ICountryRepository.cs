
using DomainLayer.Model.AspNetRoles;
using DomainLayer.ViewModel.AspNetRoles;
using DomainLayer.ViewModel.ContractorTraining;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.IRepository.ContractorTraining
{
   public interface ICountryRepository
    {
        List<CountryViewModel> GetAllCountries();
        List<AspNetRolesViewModel> GetAllRole();

        List<AspNetRolesViewModel> GetAllRoles();
    }
}
