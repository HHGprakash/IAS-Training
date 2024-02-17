using DomainLayer.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.IService.ContractorMaster
{
   public interface IContractorMasterService
    {
        IEnumerable<DomainLayer.Model.ContractorMaster.ContractorMaster> GetAllContractorMaster();
        DomainLayer.Model.ContractorMaster.ContractorMaster GetContractorMaster(int id);
        APIResponse InsertContractorMaster(DomainLayer.Model.ContractorMaster.ContractorMaster contractorMaster);
        APIResponse UpdateContractorMaster(DomainLayer.Model.ContractorMaster.ContractorMaster contractorMaster);
        APIResponse DeleteContractorMaster(int id);
    }
}
