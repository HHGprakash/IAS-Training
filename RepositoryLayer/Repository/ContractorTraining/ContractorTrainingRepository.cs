using Dapper;
using DomainLayer.ViewModel.ContractorTraining;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.IRepository.ContractorTraining;
using System.Collections.Generic;
using System.Linq;
using DomainLayer.ViewModel.AspNetUsers;
using System.Data;
using DomainLayer.Model.ContractorTrainingNs;
using DomainLayer.ViewModel.AdditionalSkills;

namespace RepositoryLayer.Repository.ContractorTraining
{
    public class ContractorTrainingRepository : BaseRepository, IContractorTrainingRepository
    {
        #region property  
        private readonly ApplicationDbContext _applicationDbContext;
        public System.Data.Entity.DbSet<ContractorTrainingViewModal> contractorTrainingViewModal { get; set; }
        #endregion

        #region Constructor  
        public ContractorTrainingRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        #endregion

        public List<ContractorTrainingVM> GetAllContractorTraining(int status)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Status", status);
            var data = con.Query<ContractorTrainingVM>("GetAllContractorTraining",
                param: parameters,
                commandType: CommandType.StoredProcedure).AsList();
            return data;
        }

        public List<RankingViewModel> GetApplicantRanking()
        {            
            var data = con.Query<RankingViewModel>("GetApplicantRanking",         
                commandType: CommandType.StoredProcedure).AsList();
            return data;
        }

        public List<AspNetUsersViewModel> GetUserByRole(string Role)
        {

            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@RoleName", Role);
            var data = con.Query<AspNetUsersViewModel>("GetUserByRole",
                  param: parameters,
                commandType: CommandType.StoredProcedure).AsList();
            return data;
        }

        public ContractorTrainingViewModal GetSingleContractorTraining(int Id, string UserId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Id", Id);
            parameters.Add("@UserId", UserId);
            var data = con.QueryMultiple("GetSingleContractorTraining",
                param: parameters,
                commandType: CommandType.StoredProcedure);

            ContractorTrainingViewModal ContractorTrainingVM = data.Read<ContractorTrainingViewModal>().FirstOrDefault();
            ContractorTrainingVM.Employment = data.Read<EmploymentViewModel>().AsList();
            ContractorTrainingVM.Education = data.Read<EducationViewModal>().AsList();
            ContractorTrainingVM.AdditionalSkills = data.Read<AdditionalSkillsViewModal>().AsList();


            return ContractorTrainingVM;
        }
    }
}
