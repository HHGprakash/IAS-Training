using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace DomainLayer.Model.ContractorTrainingNs
{
    public class Employment
    {
        public Employment()
        {

        }
        [Key]
        public long Id { get; set; }

        public int? FromYear { get; set; }

        public int? FromMonth { get; set; }

        public int? ToYear { get; set; }

        public int? ToMonth { get; set; }

        public string EmployerName { get; set; }

        public string Position { get; set; }

        public string EmployerAddress { get; set; }

        public string Responsibilities { get; set; }

        public int? ContractorTrainingId { get; set; }


        //[ForeignKey("ContractorTrainingId")]
        //public virtual ContractorTraining ContractorTraining { get; set; }
    }
}
