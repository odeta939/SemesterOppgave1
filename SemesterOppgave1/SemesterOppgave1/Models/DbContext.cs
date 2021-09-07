using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Mappeeksamen1.Models
{
    public class Customer
    {
        [Key]
        public int CustomerID { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Phonenr { get; set; }
        public string Email { get; set; }
        public virtual List<Order> Orders { get; set; }
    }

    public class Order
    {
        [Key]
        public int OrderID { get; set; }
        public string BoatName { get; set; }
        public string Route { get; set; }
        public int Capacity { get; set; }
        public int Price { get; set; }
        public string Departure { get; set; }
    }

    public class BoatTripContext : DbContext
    {
        public BoatTripContext(DbContextOptions<BoatTripContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}
