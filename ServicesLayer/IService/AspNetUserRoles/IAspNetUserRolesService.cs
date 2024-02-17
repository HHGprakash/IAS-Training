using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.IService.AspNetUserRoles
{
  public  interface IAspNetUserRolesService
    {
        IEnumerable<object> GetAllAspNetUserRoles();
    }
}
