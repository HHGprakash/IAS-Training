using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Model.ContractorTrainingNs
{
    public class SupportingDocuments
    {
        [Key]
        public int Id { get; set; }
        public int ContractorTrainingId { get; set; }
        public string OriginalFileName { get; set; }
        public string FileExtension { get; set; }
        public string FileName { get; set; }
    }
}
