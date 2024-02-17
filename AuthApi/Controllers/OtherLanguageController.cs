using DomainLayer.Model.OtherLanguage;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using ServicesLayer.IService.OtherLanguage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthApi.Controllers
{
    //[Microsoft.AspNetCore.Components.Route("api/[controller]")]
    //[ApiController]

    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class OtherLanguageController : ControllerBase
    {
        #region Property  
        private readonly IOtherLanguageService _OtherLanguageService;
        #endregion

        #region OtherLanguage  
        public OtherLanguageController(IOtherLanguageService OtherLanguageService)
        {
            _OtherLanguageService = OtherLanguageService;
        }
        #endregion

        [HttpGet(nameof(GetOtherLanguage))]
        public IActionResult GetOtherLanguage(int id)
        {
            var result = _OtherLanguageService.GetOtherLanguage(id);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

        //[Authorize]
        [HttpGet(nameof(GetAllOtherLanguage))]
        public IActionResult GetAllOtherLanguage()
        {
            var result = _OtherLanguageService.GetAllOtherLanguage();
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }
        [HttpPost(nameof(InsertOtherLanguage))]
        public IActionResult InsertOtherLanguage(OtherLanguage OtherLanguage)
        {
            _OtherLanguageService.InsertOtherLanguage(OtherLanguage);
            return Ok("Data inserted");

        }
        [HttpPost(nameof(UpdateOtherLanguage))]
        public IActionResult UpdateOtherLanguage(OtherLanguage OtherLanguage)
        {
            _OtherLanguageService.UpdateOtherLanguage(OtherLanguage);
            return Ok("Updation done");

        }
        [HttpGet(nameof(DeleteOtherLanguage))]
        public IActionResult DeleteOtherLanguage(int Id)
        {
            _OtherLanguageService.DeleteOtherLanguage(Id);
            return Ok("Data Deleted");

        }
    }
}
