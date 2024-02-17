using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.Model.ContractorTrainingNs
{
    public class Ranking
    {
        public long Id { get; set; }
        public int CandidateId { get; set; }
        public string LtcMemberId { get; set; }
        public int Rank { get; set; }
    }
}
