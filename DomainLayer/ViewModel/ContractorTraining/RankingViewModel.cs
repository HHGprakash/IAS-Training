using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.ViewModel.ContractorTraining
{
    public class RankingViewModel
    {
        public long Id { get; set; }
        public int CandidateId { get; set; }
        public string LtcMemberId { get; set; }
        public int Rank { get; set; }

        public string CandidateName { get; set; }
        public int Age { get; set; }
        public string Country { get; set; }
        public string Region { get; set; }
        public string CountryClass { get; set; }
        public string Education { get; set; }
        public string LtcMember { get; set; }
    }
}
