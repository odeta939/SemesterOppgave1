using Mappeeksamen1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Route
    {
        public int RouteID { get; set; }
        public virtual Boat Boat { get; set; }
        public virtual Terminal DeparturePlace { get; set; }
        public virtual Terminal ArrivalPlace { get; set; }
        public string DepartureTime { get; set; }
        public string ArrivalTime { get; set; }
    }
}
