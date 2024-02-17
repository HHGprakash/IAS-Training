using System;

namespace DomainLayer.Model.CustomerModel
{
    public class Customer
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public bool IsActive { get; set; }
        public string CustomerName { get; set; }
        public string PurchasesProduct { get; set; }
        public string PaymentType { get; set; }
        public string ProfilePicture { get; set; }
    }
}
