using DomainLayer.ViewModel.ContractorTraining;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DomainLayer.Model.ContractorTrainingNs;
using DomainLayer.ViewModel;

namespace ServicesLayer.IService.ContractorTraining
{
   public interface IContractorTrainingService
    {
        int InsertContractorTraining(ContractorTrainingViewModal contractorTraining);
        int UpdateContractorTraining(ContractorTrainingViewModal contractorTraining);
        IEnumerable<ContractorTrainingVM> GetAllContractorTraining(int status);
        ContractorTrainingViewModal GetSingleContractorTraining(int Id, string Username);
        APIResponse GetContractorTraining(int id);
        APIResponse GetSubmittedApplicationDetail(string id);
        APIResponse SaveRank(AddRankViewModel addRankViewModel);
        object GetSortedContractorTraining();
        object GetCountryGroup();
        object DeleteContractorTraining(int Id);
        APIResponse AddComments(ContractorTrainingViewModal contractorTraining);
    }
}
