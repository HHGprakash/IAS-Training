using DomainLayer.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.IService.ProgramMaster
{
    public interface IProgramMasterService
    {
        IEnumerable<DomainLayer.Model.ProgramMaster.ProgramMaster> GetAllProgramMaster();
        DomainLayer.Model.ProgramMaster.ProgramMaster GetProgramMaster(int id);
        APIResponse InsertProgramMaster(DomainLayer.Model.ProgramMaster.ProgramMaster programMaster);
        APIResponse UpdateProgramMaster(DomainLayer.Model.ProgramMaster.ProgramMaster programMaster);
        APIResponse DeleteProgramMaster(int id);
    }
}
