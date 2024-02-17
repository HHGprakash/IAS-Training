using DomainLayer.Model.CustomerModel;
using DomainLayer.ViewModel.AspNetUsers;
using Microsoft.EntityFrameworkCore;
using System;
using DomainLayer.Model.AspNetUsers;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RepositoryLayer.IRepository.AspNetUsers;

namespace RepositoryLayer.Repository.AspNetUsers
{
    public class AspNetUsers: IAspNetUsersRepository
    {
        //#region property  
        //private readonly ApplicationDbContext _applicationDbContext;
        //private System.Data.Entity.DbSet<DomainLayer.Model.LtcUser.LtcUser> entities;
        //public System.Data.Entity.DbSet<LtcUserViewModal> LtcUserViewModal { get; set; }
        //#endregion

        //#region Constructor  
        //public LtcUserRepository(ApplicationDbContext applicationDbContext)
        //{
        //    _applicationDbContext = applicationDbContext;
        //    entities = _applicationDbContext.Set<DomainLayer.Model.LtcUser.LtcUser>();
        //}

        //public List<LtcUserViewModal> GetLtcuserListSp()
        //{
        //    string sql = "EXEC GetAllCustomer";
        //    List<LtcUserViewModal> LtcUser = new List<LtcUserViewModal>();
        //    LtcUser = _applicationDbContext.LtcUserViewModal.FromSqlRaw(sql).ToList();
        //    return LtcUser;
        //}
    }
}
