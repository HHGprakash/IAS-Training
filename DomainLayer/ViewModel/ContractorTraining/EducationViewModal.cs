using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.ViewModel.ContractorTraining
{
   public class EducationViewModal
    {
        public long Id{ get; set; }
        public string  NameofInstitution { get; set; }
        public int? EducationFromYear { get; set; }
        public string EducationFromMonth { get; set; }
        public int? EducationToYear { get; set; }
        public string EducationToMonth { get; set; }
        public string Address { get; set; }
        public string FieldofStudy { get; set; }
        public string  Qualification { get; set; }
        public string FieldofStudySubCategory { get; set; }
        public int? ContractorTrainingId { get; set; }
    }
}
