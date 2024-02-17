using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Model.ProgramMaster
{
   public class ProgramMaster
    {
        public int Id { get; set; }
        public string Program { get; set; }

        public bool? IsActive { get; set; }

    }
}
