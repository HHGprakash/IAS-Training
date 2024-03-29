﻿using DomainLayer.Model.ContractorTrainingNs;
using DomainLayer.ViewModel.AdditionalSkills;
using System;
using System.Collections.Generic;

namespace DomainLayer.ViewModel.ContractorTraining
{
    public class ContractorTrainingViewModal
    {
        public int Id { get; set; }
        public int? ContractorId { get; set; }
        public int? ProgramApplyingId { get; set; }
        public string ContractorName { get; set; }
        public string ProgramApplyingFor { get; set; }
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
        public string FieldofStudySubCategory { get; set; }
        
        public string PassportNo { get; set; }
        public string PassportPhotobase64 { get; set; }
        public string PassportPhotoName { get; set; }
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
        public string UserId { get; set; }

        public string Haveyoubeenpreviouslyselected { get; set; }
        public int? Whichprogramme { get; set; }
        public string Whichyear { get; set; }
        public string Didyouparticipate { get; set; }

        public string FieldsofScientificInterest { get; set; }
        public string Researchundertakenifany { get; set; }
        public string Participationininternationalsymposia { get; set; }
        public string AtseaWorkingExperience { get; set; }
        public string TrainingProgrammewillfurtheryourcareer { get; set; }

        public string CountryName { get; set; }
        public string CountryClass { get; set; }
        public string GroupName { get; set; }
        public int? Rank { get; set; }

        public List<EmploymentViewModel> Employment { get; set; }
        public List<EducationViewModal> Education { get; set; }
        public List<AdditionalSkillsViewModal> AdditionalSkills { get; set; }
        public List<DocumentModel> SupportingDocList { get; set; }

        public string Comments { get; set; }
        public string CommentsCreatedBy { get; set; }
        public DateTime? CommentsCreatedDateTime { get; set; }


    }

    public class DocumentModel
    {
        public int DocId { get; set; }
        public string Base64 { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public bool? IsAddNewDoc { get; set; }
    }
}
