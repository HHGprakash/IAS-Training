using DomainLayer.ViewModel.ContractorTraining;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.IService.Ranking
{
    public interface IRankingService
    {
        IEnumerable<RankingViewModel> GetAllRanking(string Status);
    }
}
