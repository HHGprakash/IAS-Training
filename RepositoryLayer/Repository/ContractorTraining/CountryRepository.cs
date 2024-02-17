using Dapper;
using DomainLayer.Model.AspNetRoles;
using DomainLayer.ViewModel.AspNetRoles;
using DomainLayer.ViewModel.ContractorTraining;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.IRepository.ContractorTraining;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository.ContractorTraining
{
    public class CountryRepository : BaseRepository, ICountryRepository
    {
        #region property  
        private readonly ApplicationDbContext _applicationDbContext;
        public System.Data.Entity.DbSet<CountryViewModel> CountryViewModel { get; set; }
        #endregion


        #region Constructor  
        public CountryRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }
        #endregion

        public List<CountryViewModel> GetAllCountries()
        {
            string sql = "EXEC GetAllCountries";
            List<CountryViewModel> Countries = new List<CountryViewModel>();
            Countries = _applicationDbContext.CountryViewModel.FromSqlRaw(sql).ToList();
            return Countries;
        }

        public List<AspNetRolesViewModel> GetAllRole()
        {
            var productkit = con.Query<AspNetRolesViewModel>("GetAllRoles",
            commandType: CommandType.StoredProcedure).AsList();
            return productkit;
        }

        public List<AspNetRolesViewModel> GetAllRoles()
        {
            var productkit = con.Query<AspNetRolesViewModel>("GetAllRole",
            commandType: CommandType.StoredProcedure).AsList();
            return productkit;
        }
    }
}
