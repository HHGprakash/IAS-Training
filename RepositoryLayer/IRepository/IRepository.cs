using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace RepositoryLayer.IRepository
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        T Get(int Id);
        T FindOne(params object[] keys);
        T FindOne(Expression<Func<T, bool>> predicate);
        IQueryable<T> Filter(Expression<Func<T, bool>> predicate);
        IQueryable<T> Filter(Expression<Func<T, bool>> filter, out int total, int index = 0, int size = 50);
        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Remove(T entity);        

        void SaveChanges();
        public IEnumerable<T> GetAllSp(string SpName, DynamicParameters dynamicParameters);
    }
}
