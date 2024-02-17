using DomainLayer.Model.AspNetUsers;
using Microsoft.AspNetCore.Mvc;
using ServicesLayer.IService.AspNetUsers;



using AuthApi.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RepositoryLayer.Authentication;
using RepositoryLayer.IRepository;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ServicesLayer.IService.AspNetUserRoles;

namespace AuthApi.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]

    public class AspNetUsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;

        #region Property  
        private readonly IAspNetUsersService iAspNetUsersService;
        private readonly IAspNetUserRolesService AspNetUserRolesService;
        #endregion

        #region Constructor  
        public AspNetUsersController(
            IAspNetUsersService AspNetUsersService,
           IAspNetUserRolesService aspNetUserRolesService,

        UserManager<ApplicationUser> userManager
            )
        {
            iAspNetUsersService = AspNetUsersService;
            AspNetUserRolesService = aspNetUserRolesService;
            this.userManager = userManager;
        }
        #endregion

        [HttpGet(nameof(GetAspNetUsers))]
        public IActionResult GetAspNetUsers(string id)
        {
            var result = iAspNetUsersService.GetAspNetUsers(id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        //[Authorize]
        [HttpGet(nameof(GetAllAspNetUsers))]
        public IActionResult GetAllAspNetUsers(string RoleId)
        {
            var result = iAspNetUsersService.GetAllAspNetUsers(RoleId);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        [HttpGet(nameof(GetAllAspNetUserRoles))]
        public IActionResult GetAllAspNetUserRoles()
        {
            var result = AspNetUserRolesService.GetAllAspNetUserRoles();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        [HttpPost(nameof(InsertLAspNetUsers))]
        public IActionResult InsertLAspNetUsers(DomainLayer.ViewModel.AspNetUsers.AspNetUsersViewModel aspNetUsersVm)
        {

            bool userexist = iAspNetUsersService.CheckUserAlreadyRegister(aspNetUsersVm.Email);

            if (!userexist)
            {
                var user = iAspNetUsersService.InsertLAspNetUsers(aspNetUsersVm);
                return Ok(user);
            }

            // var user = iAspNetUsersService.InsertLAspNetUsers(aspNetUsersVm);
            //this.UpdatePassword(UserId, aspNetUsersVm.PasswordHash);
            //AspNetUsers aspNetUsers = iAspNetUsersService.GetAspNetUsers(UserId);
            //ApplicationUser appUser = await userManager.FindByIdAsync(UserId);
            //aspNetUsers.PasswordHash = userManager.PasswordHasher.HashPassword(appUser, aspNetUsersVm.PasswordHash);            
            //iAspNetUsersService.UpdateLAspNetUsers(aspNetUsers);
            return Ok(false);
        }

        [HttpPost(nameof(UpdateLAspNetUsers))]
        public IActionResult UpdateLAspNetUsers(AspNetUsers aspNetUsers)
        {
            iAspNetUsersService.UpdateLAspNetUsers(aspNetUsers);
            return Ok(new Response { Status = "Success", Message = "updated." });
        }

        [HttpGet(nameof(DeleteLAspNetUsers))]
        public IActionResult DeleteLAspNetUsers(string Id)
        {
            iAspNetUsersService.DeleteLAspNetUsers(Id);
            AspNetUsers aspNetUsers = new AspNetUsers();
            return Ok(aspNetUsers);


        }

        [HttpGet(nameof(GetAllUserName))]
        public IActionResult GetAllUserName()
        {
            var result = iAspNetUsersService.GetAllUserName();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        //[HttpGet(nameof(GetCustomerList))]
        //public IActionResult GetCustomerList()
        //{
        //    var result = iLtcUserService.get;
        //    return Ok(result);

        //}
    }
}
