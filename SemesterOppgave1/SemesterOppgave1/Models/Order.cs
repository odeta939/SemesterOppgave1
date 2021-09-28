using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Models
{
    public class Order
    {
        public int OrderID { get; set; }
        public virtual Route Route { get; set; }
        public virtual Customer Customer { get; set; }
        public int TicketAmount { get; set; }
        public int TotalPrice { get; set; }
    }
}
