using DomainLayer.Model.ContractorMaster;
using DomainLayer.ViewModel;
using Microsoft.AspNetCore.Mvc;
using ServicesLayer.IService.ContractorMaster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthApi.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class ContractorMasterController : ControllerBase
    {
        #region Property  
        private readonly IContractorMasterService iContractorMasterService;
        #endregion

        #region Constructor  
        public ContractorMasterController(IContractorMasterService ContractorMasterService)
        {
            iContractorMasterService = ContractorMasterService;
        }
        #endregion

        [HttpGet(nameof(GetContractorMaster))]
        public IActionResult GetContractorMaster(int id)
        {
            var result = iContractorMasterService.GetContractorMaster(id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        //[Authorize]
        [HttpGet(nameof(GetAllContractorMaster))]
        public IActionResult GetAllContractorMaster()
        {
            var result = iContractorMasterService.GetAllContractorMaster();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        [HttpPost(nameof(InsertContractorMaster))]
        public IActionResult InsertContractorMaster(ContractorMaster contractorMaster)
        {
            APIResponse response  = iContractorMasterService.InsertContractorMaster(contractorMaster);
            return Ok(response);

        }
        [HttpPost(nameof(UpdateContractorMaster))]
        public IActionResult UpdateContractorMaster(ContractorMaster contractorMaster)
        {
            APIResponse response =  iContractorMasterService.UpdateContractorMaster(contractorMaster);
            return Ok(response);

        }
        [HttpGet(nameof(DeleteContractorMaster))]
        public IActionResult DeleteContractorMaster(int Id)
        {
            var result = iContractorMasterService.DeleteContractorMaster(Id);
            return Ok(result);

        }
    }
}
