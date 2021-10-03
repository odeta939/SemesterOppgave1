using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Customer
    {
        public int Id { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,20}$")]
        public string Firstname { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,30}$")]
        public string Lastname { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅ. \-]{2,50}$")]
        public string Street { get; set; }
        //Skal det legges til alle mulige telefonnummer eller bare norske?
        [RegularExpression(@"^(\+47)?[2-9][0-9]{7}$")]
        public string Phonenr { get; set; }
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)")]
        public string Email { get; set; }
        [RegularExpression(@"^[0-9]{4}|[1-9]{1}[0-9]{4}|[1-9]{1}[0-9]{2}( )[0-9]{2}$")]
        public string ZipCode { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅ. \-]{2,30}$")]
        public string City { get; set; }
    }
}
