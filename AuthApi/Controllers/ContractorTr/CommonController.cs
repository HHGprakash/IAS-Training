using DomainLayer.Model.CustomerModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServicesLayer.IService.CustomerManagement;
using ServicesLayer.IService.AspNetUsers;
using ServicesLayer.IService.ContractorTraining;

namespace AuthApi.Controllers.ContractorTr
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        #region Property  
         private readonly IShareService iShareService;
        
        #endregion

        #region Constructor  
        public CommonController(IShareService iShareService
            )
        {
           this.iShareService = iShareService;
        }
        #endregion

        [HttpGet(nameof(GetAllCountries))]
        public IActionResult GetAllCountries()
        {
            var result = this.iShareService.GetAllCountries();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        [HttpGet(nameof(GetAllRole))]
        public IActionResult GetAllRole()
        {
            var result = this.iShareService.GetAllRole();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

    }
}
