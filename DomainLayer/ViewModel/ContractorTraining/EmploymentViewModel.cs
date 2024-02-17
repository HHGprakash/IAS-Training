using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.ViewModel.ContractorTraining
{
    public class EmploymentViewModel
    {
        public long Id { get; set; }

        public int? FromYear { get; set; }

        public int? FromMonth { get; set; }

        public int? ToYear { get; set; }

        public int? ToMonth { get; set; }

        public string EmployerName { get; set; }

        public string Position { get; set; }

        public string EmployerAddress { get; set; }

        public string Responsibilities { get; set; }

        public int? ContractorTrainingId { get; set; }
    }
}
