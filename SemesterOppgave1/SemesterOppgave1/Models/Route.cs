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

        //arrivalterminal
        public string ArrivalTerminalName { get; set; }
        public string ArrivalTerminalCity { get; set; }
        public string ArrivalTerminalZipCode { get; set; }
        public string ArrivalTerminalStreet { get; set; }

        //departureterminal
        public string DepartureTerminalName { get; set; }
        public string DepartureTerminalCity { get; set; }
        public string DepartureTerminalZipCode { get; set; }
        public string DepartureTerminalStreet { get; set; }

    }
}
