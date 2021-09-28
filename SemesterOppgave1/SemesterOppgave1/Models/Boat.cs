using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Boat
    {
        public int Id { get; set; }
        public string BoatName { get; set; }
        public int Capacity { get; set; }
        public int TicketPrice { get; set; }
    }
}
