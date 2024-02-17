using DomainLayer.Model.CustomerModel;
using DomainLayer.ViewModel.CustomerManagement;
using RepositoryLayer.IRepository;
using RepositoryLayer.IRepository.CustomerManagement;
using ServicesLayer.IService.CustomerManagement;
using System.Collections.Generic;

namespace ServicesLayer.Service.CustomerManagement
{
    public class CustomerService : ICustomerService
    {
        #region Property  
        private ICustomerRepository iCustomerRepository;
        private IRepository<Customer> iRepository;
        #endregion

        #region Constructor  
        public CustomerService(IRepository<Customer> iRepository,
             ICustomerRepository iCustomerRepository)
        {
            this.iRepository = iRepository;
            this.iCustomerRepository = iCustomerRepository;
        }
        #endregion
        public IEnumerable<Customer> GetAllCustomers()
        {
            return this.iRepository.GetAll();
        }

        public Customer GetCustomer(int id)
        {
            return this.iRepository.Get(id);
        }

        public void InsertCustomer(Customer customer)
        {
            this.iRepository.Insert(customer);
        }
        public void UpdateCustomer(Customer customer)
        {
            this.iRepository.Update(customer);
        }

        public void DeleteCustomer(int id)
        {
            Customer customer = GetCustomer(id);
            this.iRepository.Remove(customer);
            this.iRepository.SaveChanges();
        }

        public List<CustomerViewModel> GetCustomerListSp()
        {
            List<CustomerViewModel> CustomerList = new List<CustomerViewModel>();
            CustomerList = this.iCustomerRepository.GetCustomerListSp();
            return CustomerList;
        }
    }
}
