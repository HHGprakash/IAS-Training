using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Model.ContractorTrainingNs
{
   public  class Education
    {
        public Education()
        {

        }
        [Key]
        public long Id { get; set; }
        public string NameofInstitution { get; set; }
        public int? EducationFromYear { get; set; }
        public string EducationFromMonth { get; set; }
        public int? EducationToYear { get; set; }
        public string EducationToMonth { get; set; }
        public string Address { get; set; }
        public string FieldofStudy { get; set; }
        public string Qualification { get; set; }
        public string FieldofStudySubCategory { get; set; }
        public int? ContractorTrainingId { get; set; }
    }
}
