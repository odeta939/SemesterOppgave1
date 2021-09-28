using Microsoft.EntityFrameworkCore;
using SemesterOppgave1.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Mappeeksamen1.Models
{
    public class BoatTripContext : DbContext
    {
        public BoatTripContext(DbContextOptions<BoatTripContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Boat> Boats { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<Terminal> Terminals { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
