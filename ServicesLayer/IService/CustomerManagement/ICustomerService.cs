using DomainLayer.Model.CustomerModel;
using DomainLayer.ViewModel.CustomerManagement;
using System.Collections.Generic;

namespace ServicesLayer.IService.CustomerManagement
{
    public interface ICustomerService
    {
        IEnumerable<Customer> GetAllCustomers();
        Customer GetCustomer(int id);
        void InsertCustomer(Customer customer);
        void UpdateCustomer(Customer customer);
        void DeleteCustomer(int id);
        List<CustomerViewModel> GetCustomerListSp();
    }
}
