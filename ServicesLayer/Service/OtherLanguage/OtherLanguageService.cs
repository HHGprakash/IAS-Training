using RepositoryLayer.IRepository;
using ServicesLayer.IService.OtherLanguage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.Service.OtherLanguage
{
    public class OtherLanguageService : IOtherLanguageService
    {
        #region Property  
        private IRepository<DomainLayer.Model.OtherLanguage.OtherLanguage> iOtherLanguage;
        #endregion

        #region Constructor  
        public OtherLanguageService(IRepository<DomainLayer.Model.OtherLanguage.OtherLanguage> iOtherLanguage)
        {
            this.iOtherLanguage = iOtherLanguage;
        }
        #endregion

        public IEnumerable<DomainLayer.Model.OtherLanguage.OtherLanguage> GetAllOtherLanguage()
        {
            return this.iOtherLanguage.GetAll();
        }

        public DomainLayer.Model.OtherLanguage.OtherLanguage GetOtherLanguage(int id)
        {
            return this.iOtherLanguage.Get(id);
        }

        public void InsertOtherLanguage(DomainLayer.Model.OtherLanguage.OtherLanguage OtherLanguage)
        {
            this.iOtherLanguage.Insert(OtherLanguage);
        }
        public void UpdateOtherLanguage(DomainLayer.Model.OtherLanguage.OtherLanguage OtherLanguage)
        {
            this.iOtherLanguage.Update(OtherLanguage);
        }

        public void DeleteOtherLanguage(int id)
        {
            DomainLayer.Model.OtherLanguage.OtherLanguage OtherLanguage = GetOtherLanguage(id);
            this.iOtherLanguage.Remove(OtherLanguage);
            this.iOtherLanguage.SaveChanges();
        }
    }
}
