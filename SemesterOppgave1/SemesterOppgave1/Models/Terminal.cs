using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Terminal
    {
        public int Id { get; set; }
        [RegularExpression(@"^[a-zA-ZøæåØÆÅ. \-]{2,20}$")]
        public string Name { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅ. \-]{2,50}$")]
        public string Street { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅ. \-]{2,30}$")]
        public string City { get; set; }
        [RegularExpression(@"^([0-9]{4})|([1-9]{1}[0-9]{4})|([1-9]{3} [1-9]{2})$")]
        public string ZipCode { get; set; }
    }
}
