using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Route
    {
        public int Id { get; set; }
        public string DepartureTime { get; set; }
        public string ArrivalTime { get; set; }

        //boat
        public string BoatName { get; set; }
        public int Capacity { get; set; }
        public int TicketPrice { get; set; }

        //terminal
        public string TerminalName { get; set; }

        public string TerminalAddress { get; set; }
    }
}
