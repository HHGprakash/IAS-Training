using DomainLayer.ViewModel.ContractorTraining;
using RepositoryLayer.IRepository;
using RepositoryLayer.IRepository.Ranking;
using ServicesLayer.IService.Ranking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.Service.Ranking
{
    public class RankingService: IRankingService
    {
        #region Property  
        private IRepository<DomainLayer.ViewModel.ContractorTraining.RankingViewModel> iRankingRepository;
        private IRankingRepository iRankingRepository1;
        #endregion

        #region Constructor  
        public RankingService(IRepository<DomainLayer.ViewModel.ContractorTraining.RankingViewModel> iRankingRepository, IRankingRepository iRankingRepository1)
        {
            this.iRankingRepository = iRankingRepository;
            this.iRankingRepository1 = iRankingRepository1;
        }
        #endregion

        public IEnumerable<RankingViewModel> GetAllRanking(string Status)
        {
            List<RankingViewModel> rankingViewModel = new List<RankingViewModel>();
            rankingViewModel = this.iRankingRepository1.GetAllRanking(Status);

            return rankingViewModel;
        }
    }
}
