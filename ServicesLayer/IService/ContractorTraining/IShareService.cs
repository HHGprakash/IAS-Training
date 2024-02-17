using DomainLayer.Model.AspNetRoles;
using DomainLayer.ViewModel.AspNetRoles;
using DomainLayer.ViewModel.ContractorTraining;
using System.Collections.Generic;

namespace ServicesLayer.IService.ContractorTraining
{
    public interface IShareService
    {
        List<CountryViewModel> GetAllCountries();
        List<AspNetRolesViewModel> GetAllRole();
        string GetUserId(string Username);
    }
}
