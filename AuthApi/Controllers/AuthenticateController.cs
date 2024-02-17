using AuthApi.model;
using DomainLayer.Model.AspNetUserRoles;
using DomainLayer.Model.AspNetUsers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RepositoryLayer.Authentication;
using RepositoryLayer.IRepository;
using ServicesLayer.IService.AspNetUsers;
using ServicesLayer.IService.ContractorTraining;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace AuthApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        private readonly IRepository<AspNetUsers> iAspNetUsersRepository;
        private readonly IAspNetUsersService iAspNetUsersService;
        private readonly IShareService iShareService;
        private IWebHostEnvironment _env;

        public AuthenticateController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IRepository<AspNetUsers> iAspNetUsers,
            IAspNetUsersService AspNetUsersService,
            IShareService iShareService,
             IWebHostEnvironment env
            )
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
            this.iAspNetUsersRepository = iAspNetUsers;
            this.iAspNetUsersService = AspNetUsersService;
            this.iShareService = iShareService;
            _env = env;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            string FolderPath = _env.ContentRootPath + "/Resources/Log/";
            if (!System.IO.Directory.Exists(FolderPath))
            {
                System.IO.Directory.CreateDirectory(FolderPath); //create directory if it doesn't exist
            }
            System.IO.File.WriteAllText(FolderPath + DateTime.Now.ToString("MM-dd-yyyy-hh mm ss fff") + "Log.txt", "in login");
            try
            {
                var user = await userManager.FindByNameAsync(model.Username);
                if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
                {

                    AspNetUsers objAspNewuser = new AspNetUsers();

                    var list = this.iAspNetUsersRepository.GetAll().Where(x => x.Id == user.Id).FirstOrDefault();
                    if (list.IsActive == false)
                    {
                        return NotFound("User Is Not Active");
                    }

                    var userRoles = await userManager.GetRolesAsync(user);

                    var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    };

                    foreach (var userRole in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    }

                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                    var token = new JwtSecurityToken(
                        issuer: _configuration["JWT:ValidIssuer"],
                        audience: _configuration["JWT:ValidAudience"],
                        expires: DateTime.Now.AddDays(3),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                        );

                    var res = new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        Userusername = user.UserName,
                        UserRoleName = userRoles.Count > 0 ? userRoles[0] : string.Empty,
                        CurrentMemberId = user.Id
                    };

                    return Ok(res);
                }
            }
            catch (Exception ex)
            {
                //string PdfFolderPath = @"E:/TFS-Projects/IAS-Training/AuthApi/Resources/Log/";
                if (!System.IO.Directory.Exists(FolderPath))
                {
                    System.IO.Directory.CreateDirectory(FolderPath); //create directory if it doesn't exist
                }
                System.IO.File.WriteAllText(FolderPath + DateTime.Now.ToString("MM-dd-yyyy-hh mm ss fff") + "Log.txt", ex.ToString());
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await roleManager.RoleExistsAsync(UserRoles.User))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Admin);
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpGet]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword(string Email)
        {
            try
            {              
                List<AspNetUsers> appUser = this.iAspNetUsersRepository.GetAll().Where(x => x.Email == Email).ToList();
                foreach (var item in appUser)
                {
                    string newPass = RandomString(8);
                    string UniqueToken = Guid.NewGuid().ToString();
                    System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                    string email_from = _configuration.GetSection("Smtp").GetSection("User").Value;
                    string email_to = Email;
                    string email_frmpwd = _configuration.GetSection("Smtp").GetSection("Pass").Value;
                    MailMessage objMailMessage = new MailMessage();
                    objMailMessage.To.Add(new MailAddress(email_to));
                    objMailMessage.From = new MailAddress(email_from, "ISA");
                    objMailMessage.Subject = "Reset Password";
                    objMailMessage.Body = "<p>Your user id is: <b>" + item.UserName + "</b></p><p>Click on below button to reset password</p> <a style='text-decoration:none; ' href='" + _configuration.GetSection("UserVarable").GetSection("baseUrl").Value + "reset-new-password/" + item.Id + "/" + UniqueToken + "'><button style='background: #9c27b0;padding: 10px;color: #fff;width: max-content;border-radius: 5px;font-weight: bold;text-transform: capitalize;border: 0;cursor: pointer;'>Reset Password</button></a>";
                    objMailMessage.IsBodyHtml = true;
                    objMailMessage.Priority = MailPriority.High;
                    SmtpClient objSmptpClient = new SmtpClient();
                    objSmptpClient.Host = _configuration.GetSection("Smtp").GetSection("Host").Value;
                    objSmptpClient.Port = Convert.ToInt32(_configuration.GetSection("Smtp").GetSection("Port").Value);
                    objSmptpClient.EnableSsl = Convert.ToBoolean(_configuration.GetSection("Smtp").GetSection("EnableSSL").Value);
                    objSmptpClient.UseDefaultCredentials = false;
                    objSmptpClient.Credentials = new System.Net.NetworkCredential(email_from, email_frmpwd);
                    objSmptpClient.Send(objMailMessage);

                    AspNetUsers aspNetUsers = iAspNetUsersService.GetAspNetUsers(item.Id);
                    AspNetUserRoles aspNetUserRoles = iAspNetUsersService.GetAspNetUsersRole(aspNetUsers.Id);

                    aspNetUsers.UniqueToken = UniqueToken;
                    aspNetUsers.UniqueTokenDate = DateTime.Now;
                    aspNetUsers.RoleId = aspNetUserRoles.RoleId;

                    iAspNetUsersService.UpdateLAspNetUsers(aspNetUsers);
                }
                if (appUser != null)
                {
                    return Ok(new Response { Status = "Success", Message = "ResetPassword mail sent successfully" });
                }
                else
                {
                    return NotFound(new Response { Status = "Failure", Message = "User not found" });
                }
            }
            catch (Exception ex)
            {
                string FolderPath = _env.ContentRootPath + "/Resources/Log/";
                if (!System.IO.Directory.Exists(FolderPath))
                {
                    System.IO.Directory.CreateDirectory(FolderPath); //create directory if it doesn't exist
                }
                System.IO.File.WriteAllText(FolderPath + DateTime.Now.ToString("Reset Password MM-dd-yyyy-hh mm ss fff") + "Log.txt", ex.ToString());

                return NotFound(new Response { Status = "Failure", Message = "Error in reset to password" });
            }
        }


        [HttpGet]
        [Route("reset-Username")]
        public async Task<IActionResult> ResetUsername(string Email)
        {
            try
            {
                List<AspNetUsers> appUser = this.iAspNetUsersRepository.GetAll().Where(x => x.Email == Email).ToList();
                foreach (var item in appUser)
                {
                    string newPass = RandomString(8);
                    string UniqueToken = Guid.NewGuid().ToString();
                    System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                    string email_from = _configuration.GetSection("Smtp").GetSection("User").Value;
                    string email_to = Email;
                    string email_frmpwd = _configuration.GetSection("Smtp").GetSection("Pass").Value;
                    MailMessage objMailMessage = new MailMessage();
                    objMailMessage.To.Add(new MailAddress(email_to));
                    objMailMessage.From = new MailAddress(email_from, "ISA");
                    objMailMessage.Subject = "Forgot Username";
                    objMailMessage.Body = "<p>Your user id is: <b>" + item.UserName;
                    objMailMessage.IsBodyHtml = true;
                    objMailMessage.Priority = MailPriority.High;
                    SmtpClient objSmptpClient = new SmtpClient();
                    objSmptpClient.Host = _configuration.GetSection("Smtp").GetSection("Host").Value;
                    objSmptpClient.Port = Convert.ToInt32(_configuration.GetSection("Smtp").GetSection("Port").Value);
                    objSmptpClient.EnableSsl = Convert.ToBoolean(_configuration.GetSection("Smtp").GetSection("EnableSSL").Value);
                    objSmptpClient.UseDefaultCredentials = false;
                    objSmptpClient.Credentials = new System.Net.NetworkCredential(email_from, email_frmpwd);
                    objSmptpClient.Send(objMailMessage);

                    AspNetUsers aspNetUsers = iAspNetUsersService.GetAspNetUsers(item.Id);
                    AspNetUserRoles aspNetUserRoles = iAspNetUsersService.GetAspNetUsersRole(aspNetUsers.Id);

                    aspNetUsers.UniqueToken = UniqueToken;
                    aspNetUsers.UniqueTokenDate = DateTime.Now;
                    aspNetUsers.RoleId = aspNetUserRoles.RoleId;

                    iAspNetUsersService.UpdateLAspNetUsers(aspNetUsers);
                }
                if (appUser != null)
                {
                    return Ok(new Response { Status = "Success", Message = "Reset password mail sent successfully" });
                }
                else
                {
                    return NotFound(new Response { Status = "Failure", Message = "User not found" });
                }
            }
            catch (Exception ex)
            {
                return NotFound(new Response { Status = "Failure", Message = "Error in reset to password" });
            }
        }

        [HttpPost]
        [Route("reset-new-password")]
        public async Task<IActionResult> ResetNewPassword(ResetPassword model)
        {
            try
            {
                AspNetUsers aspNetUsers = iAspNetUsersService.GetAspNetUsers(model.Id);
                ApplicationUser appUser = await userManager.FindByIdAsync(model.Id);
                if (aspNetUsers.UniqueToken == model.UniqueToken)
                {
                    aspNetUsers.PasswordHash = userManager.PasswordHasher.HashPassword(appUser, model.Password);
                    AspNetUserRoles aspNetUserRoles = iAspNetUsersService.GetAspNetUsersRole(aspNetUsers.Id);
                    aspNetUsers.RoleId = aspNetUserRoles.RoleId;
                    aspNetUsers.UniqueToken = null;
                    aspNetUsers.UniqueTokenDate = null;
                    iAspNetUsersService.UpdateLAspNetUsers(aspNetUsers);
                    return Ok(new Response { Status = "Success", Message = "Password has been updated." });
                }
                else
                {
                    return Unauthorized(new Response { Status = "Failure", Message = "Invalid Token" });
                }
            }
            catch (Exception ex)
            {
                return Unauthorized(new Response { Status = "Failure", Message = "Error in Reset Password" });
            }
        }

        [HttpPost]
        [Route("update-password")]
        public async Task<IActionResult> UpdatePassword(DomainLayer.ViewModel.AspNetUsers.AspNetUsersViewModel aspNetUsersVm)
        {
            AspNetUsers aspNetUsers = iAspNetUsersService.GetAspNetUsers(aspNetUsersVm.Id);
            ApplicationUser appUser = await userManager.FindByIdAsync(aspNetUsers.Id);
            aspNetUsers.PasswordHash = userManager.PasswordHasher.HashPassword(appUser, aspNetUsersVm.PasswordHash);
            if (aspNetUsersVm.RoleId != null)
            {
                aspNetUsers.RoleId = aspNetUsersVm.RoleId;
            }
            var result = iAspNetUsersService.UpdateLAspNetUsers(aspNetUsers);
            return Ok(result);
        }

        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword(DomainLayer.ViewModel.AspNetUsers.AspNetUsersViewModel aspNetUsersVm)
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            if (user != null && await userManager.CheckPasswordAsync(user, aspNetUsersVm.PasswordHash))
            {
                user.PasswordHash = userManager.PasswordHasher.HashPassword(user, aspNetUsersVm.NewPasswordHash);
                await userManager.UpdateAsync(user);
            }
            else
            {
                return Ok(new Response { Status = "Failure", Message = "Password does not update, please try again." });
            }
            return Ok(new Response { Status = "Success", Message = "Password has been updated successfully" });
        }


        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
