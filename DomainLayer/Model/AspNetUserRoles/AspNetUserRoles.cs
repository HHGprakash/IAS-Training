using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Model.AspNetUserRoles
{
    public class AspNetUserRoles
    {
        [Key]
        public string UserId { get; set; }
        public string RoleId { get; set; }
    }
}
