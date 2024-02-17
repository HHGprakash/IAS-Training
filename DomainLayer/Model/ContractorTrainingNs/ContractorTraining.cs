using DomainLayer.ViewModel.ContractorTraining;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Model.ContractorTrainingNs
{
    public class ContractorTraining
    {
        [Key]
        public int Id { get; set; }
        public int? ContractorId { get; set; }
        public int? ProgramApplyingId { get; set; }
        //public string ContractorName { get; set; }
        //public string ProgramApplyingFor { get; set; }
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

        public string ResidenceNo { get; set; }
        public string OfficeNo { get; set; }
        public string CellNo { get; set; }
        public string FaxNo { get; set; }
        public string Email { get; set; }
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
        //public string NameofInstitution { get; set; }
        //public int? EducationFromYear { get; set; }
        //public string EducationFromMonth { get; set; }
        //public int? EducationToYear { get; set; }
        //public string EducationToMonth { get; set; }
        //public string Address { get; set; }
        //public string FieldofStudy { get; set; }
        //public string Qualification { get; set; }
        public int Status { get; set; }
        public DateTime? SubmissionDate { get; set; }
        //public string FieldofStudySubCategory { get; set; }

        public string UserId { get; set; }
        public string Comments { get; set; }
        public string CommentsCreatedBy { get; set; }
        public DateTime? CommentsCreatedDateTime { get; set; }
        public List<Employment> Employment { get; set; }
        public List<DomainLayer.Model.AdditionalSkills.AdditionalSkills> AdditionalSkills { get; set; }
        public List<Education> Education { get; set; }

        [NotMapped]
        public string PassportPhotoName { set; get; }

        [NotMapped]

        public List<DocumentModel> SupportingDocList { get; set; }


    }
}
