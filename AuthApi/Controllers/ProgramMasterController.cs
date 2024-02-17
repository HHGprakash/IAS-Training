using DomainLayer.Model.ProgramMaster;
using DomainLayer.ViewModel;
using Microsoft.AspNetCore.Mvc;
using ServicesLayer.IService.ProgramMaster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthApi.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class ProgramMasterController:ControllerBase
    {
        #region Property  
        private readonly IProgramMasterService iProgramMasterService;
        #endregion

        #region Constructor  
        public ProgramMasterController(IProgramMasterService ProgramMasterService)
        {
            iProgramMasterService = ProgramMasterService;
        }
        #endregion

        [HttpGet(nameof(GetProgramMaster))]
        public IActionResult GetProgramMaster(int id)
        {
            var result = iProgramMasterService.GetProgramMaster(id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        //[Authorize]
        [HttpGet(nameof(GetAllProgramMaster))]
        public IActionResult GetAllProgramMaster()
        {
            var result = iProgramMasterService.GetAllProgramMaster();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }
        [HttpPost(nameof(InsertProgramMaster))]
        public IActionResult InsertProgramMaster(ProgramMaster programMaster)
        {
            APIResponse response = iProgramMasterService.InsertProgramMaster(programMaster);
            return Ok(response);

        }
        [HttpPost(nameof(UpdateProgramMaster))]
        public IActionResult UpdateProgramMaster(ProgramMaster programMaster)
        {
            APIResponse response = iProgramMasterService.UpdateProgramMaster(programMaster);
            return Ok(response);

        }
        [HttpGet(nameof(DeleteProgramMaster))]
        public IActionResult DeleteProgramMaster(int Id)
        {
            APIResponse result =  iProgramMasterService.DeleteProgramMaster(Id);
            return Ok(result);
        }
    }
}
