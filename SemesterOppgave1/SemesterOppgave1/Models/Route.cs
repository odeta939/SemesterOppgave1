using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Route
    {
        public int Id { get; set; }
        [RegularExpression(@"^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$")]
        public string DepartureTime { get; set; }
        [RegularExpression(@"^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$")]
        public string ArrivalTime { get; set; }
        [RegularExpression(@"^[0-9]{1,4}$")]
        public int TicketsLeft { get; set; }

        //boat
        [RegularExpression(@"^[a-zA-ZøæåØÆÅöÖäÄ. \-]{2,20}$")]
        public string BoatName { get; set; }
        [RegularExpression(@"^([1-9]{1}[0-9]{1,3})$")]
        public int Capacity { get; set; }
        [RegularExpression(@"^([1-9]{1}[0-9]{1,3})$")]
        public int TicketPrice { get; set; }

        //arrivalterminal
        [RegularExpression(@"^[a-zA-ZøæåØÆÅöÖäÄ. \-]{2,20}$")]
        public string ArrivalTerminalName { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅöÖäÄ. \-]{2,20}$")]
        public string ArrivalTerminalCity { get; set; }
        [RegularExpression(@"^[1-9][0-9]{4}|[0-9]{4}|[1-9]{1}[0-9]{2}( )[0-9]{2}$")]
        public string ArrivalTerminalZipCode { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅöÖäÄ. \-]{2,30}$")]
        public string ArrivalTerminalStreet { get; set; }

        //departureterminal
        [RegularExpression(@"^[a-zA-ZøæåØÆÅöÖäÄ. \-]{2,20}$")]
        public string DepartureTerminalName { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅöÖäÄ. \-]{2,20}$")]
        public string DepartureTerminalCity { get; set; }
        [RegularExpression(@"^[1-9][0-9]{4}|[0-9]{4}|[1-9]{1}[0-9]{2}( )[0-9]{2}$")]
        public string DepartureTerminalZipCode { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅöÖäÄ. \-]{2,30}$")]
        public string DepartureTerminalStreet { get; set; }

    }
}
