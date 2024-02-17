using DomainLayer.Model.CustomerModel;
using DomainLayer.ViewModel.CustomerManagement;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.IRepository.CustomerManagement;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository.CustomerManagement
{
    public class CustomerRepository : ICustomerRepository
    {
        #region property  
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<Customer> entities;
        public DbSet<CustomerViewModel> CustomerViewModela { get; set; }
        #endregion

        #region Constructor  
        public CustomerRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<Customer>();
        }
        #endregion

        public List<CustomerViewModel> GetCustomerListSp()
        {
            string sql = "EXEC GetAllCustomer";
            List<CustomerViewModel> Customer = new List<CustomerViewModel>();            
            Customer = _applicationDbContext.CustomerViewModel.FromSqlRaw(sql).ToList();
            return Customer;          
        }
    }
}
