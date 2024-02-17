using DomainLayer.ViewModel.ContractorTraining;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.IRepository.Ranking
{
  public  interface IRankingRepository
    {
        List<RankingViewModel> GetAllRanking(string Status);
    }
}
