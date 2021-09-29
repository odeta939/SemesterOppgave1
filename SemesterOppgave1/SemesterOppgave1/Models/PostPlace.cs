using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class PostPlace
    {
        [RegularExpression(@"^[0-9]{4}$")]
        public string ZipCode { get; set; }
        [RegularExpression(@"^[0-9a-zA-ZøæåØÆÅ. \-]{2,30}$")]
        public string Place { get; set; }
    }
}
