using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Model.AdditionalSkills
{
    public class AdditionalSkills
    {
        public int Id { get; set; }
        public string FieldsofScientificInterest { get; set; }
        public string Researchundertakenifany { get; set; }
        public string Participationininternationalsymposia { get; set; }
        public string AtseaWorkingExperience { get; set; }
        public string TrainingProgrammewillfurtheryourcareer { get; set; }
        public int SequenceNo { get; set; }
        public int ContractorTrainingId { get; set; }
        public string Haveyoubeenpreviouslyselected { get; set; }
        public int? Whichprogramme { get; set; }
        public string Whichyear { get; set; }
        public string Didyouparticipate { get; set; }

        //[ForeignKey("ContractorTrainingId")]
        //public virtual DomainLayer.Model.ContractorTrainingNs.ContractorTraining objContractorTraining { get; set; }
    }
}
