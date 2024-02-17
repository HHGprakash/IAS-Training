using DomainLayer.ViewModel;
using RepositoryLayer.IRepository;
using RepositoryLayer.IRepository.ProgramMaster;
using ServicesLayer.IService.ProgramMaster;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static Utility.Enums;

namespace ServicesLayer.Service.ProgramMaster
{
    public class ProgramMasterService : IProgramMasterService
    {
        #region Property  
        private IRepository<DomainLayer.Model.ProgramMaster.ProgramMaster> iProgramMasterRepository;
        #endregion

        #region Constructor  
        public ProgramMasterService(IRepository<DomainLayer.Model.ProgramMaster.ProgramMaster> iProgramMasterRepository)
        {
            this.iProgramMasterRepository = iProgramMasterRepository;
        }
        #endregion

        public IEnumerable<DomainLayer.Model.ProgramMaster.ProgramMaster> GetAllProgramMaster()
        {
            return this.iProgramMasterRepository.GetAll();
        }
        public DomainLayer.Model.ProgramMaster.ProgramMaster GetProgramMaster(int id)
        {
            return this.iProgramMasterRepository.Get(id);
        }
        public APIResponse InsertProgramMaster(DomainLayer.Model.ProgramMaster.ProgramMaster programMaster)
        {
            this.iProgramMasterRepository.Insert(programMaster);
            return new APIResponse(HttpStatusCode.OK, APIStatus.Success, string.Empty, string.Empty);


        }
        public APIResponse UpdateProgramMaster(DomainLayer.Model.ProgramMaster.ProgramMaster programMaster)
        {
            this.iProgramMasterRepository.Update(programMaster);
            return new APIResponse(HttpStatusCode.OK, APIStatus.Success, string.Empty, string.Empty);


        }
        public APIResponse DeleteProgramMaster(int id)
        {

            try
            {
                DomainLayer.Model.ProgramMaster.ProgramMaster programMaster = GetProgramMaster(id);
                this.iProgramMasterRepository.Remove(programMaster);
                this.iProgramMasterRepository.SaveChanges();
                return new APIResponse(HttpStatusCode.OK, APIStatus.Success, string.Empty, programMaster);
            }
            catch (Exception ex)
            {
                return new APIResponse(HttpStatusCode.OK, APIStatus.Failure, "Something went wrong ", string.Empty);
            }

        }
    }
}
