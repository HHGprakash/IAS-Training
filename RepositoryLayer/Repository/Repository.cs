using Dapper;
using Microsoft.EntityFrameworkCore;
using RepositoryLayer.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RepositoryLayer.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        #region property  
        private readonly ApplicationDbContext _applicationDbContext;
        private DbSet<T> entities;
        private readonly IDapper _dapper;
        #endregion

        #region Constructor  
        public Repository(ApplicationDbContext applicationDbContext, IDapper dapper)
        {
            _applicationDbContext = applicationDbContext;
            entities = _applicationDbContext.Set<T>();
            _dapper = dapper;
        }
        #endregion

        public void Delete(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
            _applicationDbContext.SaveChanges();
        }

        public T Get(int Id)
        {
            return entities.Find(Id);
        }

        public virtual T FindOne(params object[] keys)
        {
            return entities.Find(keys);
        }

        public virtual T FindOne(Expression<Func<T, bool>> predicate)
        {
            return entities.FirstOrDefault(predicate);
        }

        public virtual IQueryable<T> Filter(Expression<Func<T, bool>> predicate)
        {
            return entities.Where(predicate).AsQueryable<T>();
        }

        public virtual IQueryable<T> Filter(Expression<Func<T, bool>> filter, out int total, int index = 0, int size = 50)
        {
            int skipCount = index * size;
            var _resetSet = filter != null ? entities.Where(filter).AsQueryable() : entities.AsQueryable();
            _resetSet = skipCount == 0 ? _resetSet.Take(size) : _resetSet.Skip(skipCount).Take(size);
            total = _resetSet.Count();
            return _resetSet.AsQueryable();
        }

        public IEnumerable<T> GetAll()
        {
            return entities.AsEnumerable();
        }

        public void Insert(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Add(entity);
            _applicationDbContext.SaveChanges();
        }

        public void Remove(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Remove(entity);
        }

        public void SaveChanges()
        {
            _applicationDbContext.SaveChanges();
        }

        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity");
            }
            entities.Update(entity);
            _applicationDbContext.SaveChanges();
        }
        public IEnumerable<T> GetAllSp(string SpName, DynamicParameters dynamicParameters)
        {
            return Task.FromResult(_dapper.GetAll<T>(SpName, dynamicParameters,
                          commandType: CommandType.StoredProcedure)).Result.ToList();
        }
    }
}
