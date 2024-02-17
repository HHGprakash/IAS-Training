using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer.IService.OtherLanguage
{
  public  interface IOtherLanguageService
    {
        IEnumerable<DomainLayer.Model.OtherLanguage.OtherLanguage> GetAllOtherLanguage();
        DomainLayer.Model.OtherLanguage.OtherLanguage GetOtherLanguage(int id);
        void InsertOtherLanguage(DomainLayer.Model.OtherLanguage.OtherLanguage customer);
        void UpdateOtherLanguage(DomainLayer.Model.OtherLanguage.OtherLanguage customer);
        void DeleteOtherLanguage(int id);
    }
}
