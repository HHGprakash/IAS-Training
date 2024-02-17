using DomainLayer.Model.CustomerModel;
using DomainLayer.ViewModel.CustomerManagement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.IRepository.CustomerManagement
{
    public interface ICustomerRepository
    {
        List<CustomerViewModel> GetCustomerListSp();
    }
}
