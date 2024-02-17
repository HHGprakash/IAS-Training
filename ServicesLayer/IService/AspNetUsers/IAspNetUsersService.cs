using DomainLayer.ViewModel.AspNetUsers;
using System;
using System.Collections.Generic;

namespace ServicesLayer.IService.AspNetUsers
{
    public interface IAspNetUsersService
    {
        IEnumerable<object> GetAllAspNetUsers(string RoleId);
        DomainLayer.Model.AspNetUsers.AspNetUsers GetAspNetUsers(string id);
        DomainLayer.Model.AspNetUsers.AspNetUsers InsertLAspNetUsers(DomainLayer.ViewModel.AspNetUsers.AspNetUsersViewModel aspNetUsersViewModel);
        DomainLayer.Model.AspNetUsers.AspNetUsers UpdateLAspNetUsers(DomainLayer.Model.AspNetUsers.AspNetUsers aspNetUsers);
        void DeleteLAspNetUsers(string id);
        IEnumerable<string> GetAllUserName();
        DomainLayer.Model.AspNetUserRoles.AspNetUserRoles GetAspNetUsersRole(string id);
        bool CheckUserAlreadyRegister(string email);

        //List<LtcUserViewModal> GetCustomerListSp();
    }
}
