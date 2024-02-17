using DomainLayer.ViewModel.ContractorTraining;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.IRepository.Ranking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository.Ranking
{
   public class RankingRespository : IRankingRepository
    {
        #region property  
        private readonly ApplicationDbContext _applicationDbContext;
        public System.Data.Entity.DbSet<RankingViewModel> rankingViewModal { get; set; }
        #endregion

        #region Constructor  
        public RankingRespository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        #endregion


        public List<RankingViewModel> GetAllRanking(string Status)
        {
            string sql = "EXEC GetRanking" + Status;
            //List<RankingViewModel> data = new List<RankingViewModel>();
          var  data = _applicationDbContext.RankingViewModel.FromSqlRaw(sql).ToList();
            return data;
        }
    }
}
