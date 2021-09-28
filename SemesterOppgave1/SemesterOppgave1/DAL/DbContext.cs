using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Mappeeksamen1.Models
{
    public class Customers
    {
        [Key]
        public int CustomerID { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Phonenr { get; set; }
        public string Email { get; set; }
        public virtual List<Orders> Orders { get; set; }
    }

    public class Boats
    {
        [Key]
        public int BoatID { get; set; }
        public string BoatName { get; set; }
        public int Capacity { get; set; }
        public int TicketPrice { get; set; }
    }

    public class Routes
    {
        [Key]
        public int RouteID { get; set; }
        public virtual Boats Boat { get; set; }
        public virtual Terminals DeparturePlace { get; set; }
        public virtual Terminals ArrivalPlace { get; set; }
        public string DepartureTime { get; set; }
        public string ArrivalTime { get; set; }
    }

    public class Orders
    {
        [Key]
        public int OrderID { get; set; }
        public virtual Routes Route { get; set; }
        public virtual Customers Customer { get; set; }
        public int TicketAmount { get; set; }
        public int TotalPrice { get; set; }
    }

    public class Terminals
    {
        [Key]
        public int TerminalID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Postnumber { get; set; }
    }

    public class BoatTripContext : DbContext
    {
        public BoatTripContext(DbContextOptions<BoatTripContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Customers> Customers { get; set; }
        public DbSet<Boats> Boats { get; set; }
        public DbSet<Routes> Routes { get; set; }
        public DbSet<Terminals> Terminals { get; set; }
        public DbSet<Orders> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
