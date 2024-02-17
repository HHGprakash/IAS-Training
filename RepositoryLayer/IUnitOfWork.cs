using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer
{
    public interface IUnitOfWork : IDisposable
    {
        ApplicationDbContext DbContext { get; set; }
        void Commit();
    }
}
