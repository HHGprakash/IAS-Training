using DomainLayer.Model.AdditionalSkills;
using DomainLayer.Model.AspNetUserRoles;
using DomainLayer.Model.ContractorMaster;
using DomainLayer.Model.ContractorTrainingNs;
using DomainLayer.Model.CustomerModel;
using DomainLayer.Model.OtherLanguage;
using DomainLayer.Model.ProgramMaster;
using DomainLayer.ViewModel.AdditionalSkills;
using DomainLayer.ViewModel.AspNetRoles;
using DomainLayer.ViewModel.AspNetUserRoles;
using DomainLayer.ViewModel.ContractorMaster;
using DomainLayer.ViewModel.ContractorTraining;
using DomainLayer.ViewModel.CustomerManagement;
using DomainLayer.ViewModel.ProgramMaster;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.Authentication;

namespace RepositoryLayer
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<CustomerViewModel> CustomerViewModel { get; set; }

        public DbSet<DomainLayer.Model.AspNetUsers.AspNetUsers> aspNetUsers { get; set; }
        public DbSet<DomainLayer.ViewModel.AspNetUsers.AspNetUsersViewModel> AspNetUsersViewModal { get; set; }

        public DbSet<AspNetUserRoles> aspNetUserRoles { get; set; }
        public DbSet<AspNetUserRolesViewModel> AspNetUserRolesViewModal { get; set; }

        //public DbSet<AspNetRoles> AspNetRoles { get; set; }
        public DbSet<AspNetRolesViewModel> aspNetRolesViewModel { get; set; }

        public DbSet<ContractorTraining> contractorTraining { get; set; }
        public DbSet<ContractorTrainingVM> ContractorTrainingVM { get; set; }
        public DbSet<ContractorTrainingViewModal> contractorTrainingViewModal { get; set; }                
        public DbSet<AdditionalSkills> additionalSkills { get; set; }
        public DbSet<AdditionalSkillsViewModal> additionalSkillsViewModal { get; set; }

        public DbSet<ContractorMaster> contractorMaster { get; set; }
        public DbSet<ContractorMasterViewModal> contractorMasterViewModal { get; set; }
        public DbSet<ProgramMaster> programMaster { get; set; }
        public DbSet<ProgramMasterViewModal> programMasterViewModal { get; set; }
        public DbSet<CountryViewModel> CountryViewModel { get; set; }
        public DbSet<Country> Country { get; set; }
        public DbSet<CountryGroupViewModel> CountryGroupViewModel { get; set; }
        public DbSet<CountryGroup> CountryGroup { get; set; }
        public DbSet<Ranking> Ranking { get; set; }
        public DbSet<RankingViewModel> RankingViewModel { get; set; }
        public DbSet<Employment> Employment { get; set; }
        public DbSet<Education> Education { get; set; }
        public DbSet<SupportingDocuments> SupportingDocuments { get; set; }
        public DbSet<OtherLanguage> OtherLanguage { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Ignore<CustomerViewModel>();
            builder.Ignore<DomainLayer.ViewModel.AspNetUsers.AspNetUsersViewModel>();
            builder.Ignore<DomainLayer.ViewModel.AspNetUserRoles.AspNetUserRolesViewModel>();
            builder.Ignore<DomainLayer.ViewModel.ContractorTraining.ContractorTrainingViewModal>();
            builder.Ignore<DomainLayer.ViewModel.AdditionalSkills.AdditionalSkillsViewModal>();
            builder.Ignore<DomainLayer.ViewModel.ContractorMaster.ContractorMasterViewModal>();
            builder.Ignore<DomainLayer.ViewModel.ProgramMaster.ProgramMasterViewModal>();
            builder.Ignore<AspNetRolesViewModel>();
            builder.Ignore<RankingViewModel>();
            base.OnModelCreating(builder);
        }
    }
}
