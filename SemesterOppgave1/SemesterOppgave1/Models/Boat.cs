using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Boat
    {
        public int Id { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅöÖäÄ. \-]{2,20}$")]
        public string BoatName { get; set; }
        [RegularExpression(@"^([1-9]{1}[0-9]{1,3})$")]
        public int Capacity { get; set; }
        [RegularExpression(@"^([1-9]{1}[0-9]{1,3})$")]
        public int TicketPrice { get; set; }
    }
}
