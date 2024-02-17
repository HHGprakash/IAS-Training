using Microsoft.AspNetCore.Mvc;
using ServicesLayer.IService.Ranking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RankingController: ControllerBase
    {
        #region Property  
        private readonly IRankingService iRankingService;
        #endregion

        #region Constructor  
        public RankingController(IRankingService RankingServiceService)
        {
            iRankingService = RankingServiceService;
        }
        #endregion

        //[Authorize]
        [HttpGet(nameof(GetAllRanking))]
        public IActionResult GetAllRanking(string Status)
        {
            var result = iRankingService.GetAllRanking(Status);
            if (result is not null)
            {
                return Ok(result);
            }
            return BadRequest("No records found");

        }

    }
}
