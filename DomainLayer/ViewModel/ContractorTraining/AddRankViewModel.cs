using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainLayer.ViewModel.ContractorTraining
{
    public class AddRankViewModel
    {
        public int CandidateId { get; set; }
        public int Rank { get; set; }
        public string CurrentLoginUserId { get; set; }
        public string CurrentMemberId { get; set; }
    }
}
