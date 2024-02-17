using DomainLayer.ViewModel;
using RepositoryLayer.IRepository;
using RepositoryLayer.IRepository.ContractorMaster;
using ServicesLayer.IService.ContractorMaster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static Utility.Enums;

namespace ServicesLayer.Service.ContractorMaster
{
    public class ContractorMasterService : IContractorMasterService
    {
        #region Property  
        private IRepository<DomainLayer.Model.ContractorMaster.ContractorMaster> iContractorMasterRepository;
        #endregion

        #region Constructor  
        public ContractorMasterService(IRepository<DomainLayer.Model.ContractorMaster.ContractorMaster> iContractorMasterRepository)
        {
            this.iContractorMasterRepository = iContractorMasterRepository;
        }
        #endregion

        public IEnumerable<DomainLayer.Model.ContractorMaster.ContractorMaster> GetAllContractorMaster()
        {
            return this.iContractorMasterRepository.GetAll();
        }
        public DomainLayer.Model.ContractorMaster.ContractorMaster GetContractorMaster(int id)
        {
            return this.iContractorMasterRepository.Get(id);
        }
        public APIResponse InsertContractorMaster(DomainLayer.Model.ContractorMaster.ContractorMaster contractorMaster)
        {
            this.iContractorMasterRepository.Insert(contractorMaster);
            return new APIResponse(HttpStatusCode.OK, APIStatus.Success, string.Empty, string.Empty);

        }
        public APIResponse UpdateContractorMaster(DomainLayer.Model.ContractorMaster.ContractorMaster contractorMaster)
        {
            this.iContractorMasterRepository.Update(contractorMaster);
            return new APIResponse(HttpStatusCode.OK, APIStatus.Success, string.Empty, string.Empty);

        }
        public APIResponse DeleteContractorMaster(int id)
        {
            try
            {
                DomainLayer.Model.ContractorMaster.ContractorMaster contractorMaster = GetContractorMaster(id);
                this.iContractorMasterRepository.Remove(contractorMaster);
                this.iContractorMasterRepository.SaveChanges();
                return new APIResponse(HttpStatusCode.OK, APIStatus.Success, string.Empty, contractorMaster);
            }
            catch (Exception ex)
            {
                return new APIResponse(HttpStatusCode.OK, APIStatus.Failure, "Something went wrong ", string.Empty);
            }
        }
    }
}
