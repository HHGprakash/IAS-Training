using DomainLayer.ViewModel.AspNetUsers;
using DomainLayer.ViewModel.ContractorTraining;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.IRepository.ContractorTraining
{
   public interface IContractorTrainingRepository
    {
        List<ContractorTrainingVM> GetAllContractorTraining(int Status);
        List<RankingViewModel> GetApplicantRanking();
        ContractorTrainingViewModal GetSingleContractorTraining(int Id,string UserId);
        List<AspNetUsersViewModel> GetUserByRole(string Role);
    }
}
