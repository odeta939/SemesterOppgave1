using Mappeeksamen1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Phonenr { get; set; }
        public string Email { get; set; }
        public virtual PostPlace PostPlace { get; set; }
    }
}
