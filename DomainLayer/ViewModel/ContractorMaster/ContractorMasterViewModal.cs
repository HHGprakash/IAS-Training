using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.ViewModel.ContractorMaster
{
   public class ContractorMasterViewModal
    {
        public int Id { get; set; }
        public string ContractorName { get; set; }
        public bool? IsActive { get; set; }
    }
}
