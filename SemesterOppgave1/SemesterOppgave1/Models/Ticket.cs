using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Ticket
    {
        public string BoatName { get; set; }
        public string Route { get; set; }
        public int Price { get; set; }
        public string Departure { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        //Address normalization
        public string Phonenr { get; set; }
        public string Email { get; set; }


    }
}
