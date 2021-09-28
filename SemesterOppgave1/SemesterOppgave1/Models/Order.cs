using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int TicketAmount { get; set; }
        public int TotalPrice { get; set; }

        // route
        public string DepartureTime { get; set; }
        public string ArrivalTime { get; set; }
        public string  BoatName { get; set; }
        public string  DeparturePlace { get; set; }
        public string  ArrivalPlace { get; set; }

        //customer
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Street { get; set; }
        public string Phonenr { get; set; }
        public string Email { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
    }
}
