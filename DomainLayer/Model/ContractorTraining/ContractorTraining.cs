using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Model.ContractorTraining
{
   public class ContractorTraining
    {
        public ContractorTraining()
        {

        }
        [Key]
        public int Id { get; set; }
        public int? ContractorId { get; set; }
        public int? ProgramApplyingId { get; set; }
        public Int32? Year { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string MiddleInitial { get; set; }
        public string FamilyName { get; set; }
        public DateTime? DateofBirth { get; set; }
        public string PlaceofBirth { get; set; }
        public int? Country { get; set; }
        public string Nationality { get; set; }
        public string Sex { get; set; }
        public string MaritalStatus { get; set; }
        public string ResidenceAddress { get; set; }
        public string BusinessAddress { get; set; }
        public string PassportNo { get; set; }
        public DateTime? DateofIssue { get; set; }
        public string PlaceofIssue { get; set; }
        public DateTime? DateofExpiry { get; set; }
        public string Listening { get; set; }
        public string Speaking { get; set; }
        public string Writing { get; set; }
        public string Reading { get; set; }
        public string OtherLanguage { get; set; }
        public string MotherLanguage { get; set; }
        public string NameofInstitution { get; set; }
        public int? EducationFromYear { get; set; }
        public string EducationFromMonth { get; set; }
        public int? EducationToYear { get; set; }
        public string EducationToMonth { get; set; }
        public string Address { get; set; }
        public string FieldofStudy { get; set; }
        public string Qualification { get; set; }
        public int? PresentPostFromYear1 { get; set; }
        public string PresentPostFromMonth1 { get; set; }
        public int? PresentPostToYear1 { get; set; }
        public string PresentPostToMonth1 { get; set; }
        public string NameofEmployer1 { get; set; }
        public string TitleofPosition1 { get; set; }
        public string AddressofEmployer1 { get; set; }
        public string Responsibilities1 { get; set; }

        public int? PresentPostFromYear2 { get; set; }
        public string PresentPostFromMonth2 { get; set; }
        public int? PresentPostToYear2 { get; set; }
        public string PresentPostToMonth2 { get; set; }
        public string NameofEmployer2 { get; set; }
        public string TitleofPosition2 { get; set; }
        public string AddressofEmployer2 { get; set; }
        public string Responsibilities2 { get; set; }

        public int? PresentPostFromYear3 { get; set; }
        public string PresentPostFromMonth3 { get; set; }
        public int? PresentPostToYear3 { get; set; }
        public string PresentPostToMonth3 { get; set; }
        public string NameofEmployer3 { get; set; }
        public string TitleofPosition3 { get; set; }
        public string AddressofEmployer3 { get; set; }
        public string Responsibilities3 { get; set; }
        public int Status { get; set; }

    }
}
