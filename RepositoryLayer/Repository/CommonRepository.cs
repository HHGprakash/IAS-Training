using Dapper;
using DomainLayer.ViewModel.AspNetUsers;
using RepositoryLayer.IRepository;
using System.Data;
using System.Linq;

namespace RepositoryLayer.Repository
{
    public class CommonRepository : BaseRepository, ICommonRepository
    {
        #region property  
        private readonly ApplicationDbContext _applicationDbContext;
        //public System.Data.Entity.DbSet<CountryViewModel> CountryViewModel { get; set; }
        #endregion

        public CommonRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public string GetUserId(string Username)
        {
            string Userid = null;
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Username", Username);

            AspNetUsersViewModel productkit = con.Query<AspNetUsersViewModel>("GetUserId",
                param: parameters,
                commandType: CommandType.StoredProcedure).AsList().FirstOrDefault();
            if(productkit != null)
            {
                Userid = productkit.Id;
            }
            return Userid;
        }
    }
}
