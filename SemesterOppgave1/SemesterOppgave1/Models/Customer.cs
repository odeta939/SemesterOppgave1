using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Street { get; set; }
        public string Phonenr { get; set; }
        public string Email { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }
    }
}
