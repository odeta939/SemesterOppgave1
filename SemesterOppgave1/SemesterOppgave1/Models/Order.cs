using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Order
    {
        public int Id { get; set; }
        [RegularExpression(@"^[1-9]{1}[0-9]{0,3}$")]
        public int TicketAmount { get; set; }
        [RegularExpression(@"^[1-9]{1}[0-9]{1,6}$")]
        public int TotalPrice { get; set; }

        // route
        [RegularExpression(@"^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$")]
        public string DepartureTime { get; set; }
        [RegularExpression(@"^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$")]
        public string ArrivalTime { get; set; }
        [RegularExpression(@"^([1-9]{1}[0-9]{1,3})$")]
        public int TicketsLeft { get; set; }

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

        //boat
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,20}$")]
        public string  BoatName { get; set; }
        [RegularExpression(@"^([1-9]{1}[0-9]{1,3})$")]
        public int Capacity { get; set; }
        [RegularExpression(@"^([1-9]{1}[0-9]{1,3})$")]
        public int TicketPrice { get; set; }

        //customer
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,20}$")]
        public string Firstname { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,30}$")]
        public string Lastname { get; set; }
        //[2-9] fordi telefonnummer som starter på 0 eller 1 er ugyldige i Norge.
        [RegularExpression(@"^(\+47)?[2-9][0-9]{7}$")]
        public string Phonenr { get; set; }
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)")]
        public string Email { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅ. \-]{2,50}$")]
        public string Street { get; set; }
        [RegularExpression(@"^[1-9][0-9]{4}|[0-9]{4}|[1-9]{1}[0-9]{2}( )[0-9]{2}$")]
        public string ZipCode { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅ. \-]{2,30}$")]
        public string City { get; set; }
    }
}
