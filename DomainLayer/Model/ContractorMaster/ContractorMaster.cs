using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Model.ContractorMaster
{
   public  class ContractorMaster
    {
        public int Id { get; set; }
        public string ContractorName { get; set; }
        public bool? IsActive { get; set; }

    }
}
