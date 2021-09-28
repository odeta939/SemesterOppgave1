using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;


namespace SemesterOppgave1.DAL
{
    public class Customers
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Phonenr { get; set; }
        public string Email { get; set; }
        virtual public PostPlaces Postplace { get; set; }
    }

    public class PostPlaces
    {
        [Key]
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string ZipCode { get; set; }
        public string Place { get; set; }

        // denne listen ikke nødvendig med mindre man skal finne kundene på et gitt postnr (altså gå inn via Poststeder-collection)
    }

    public class BoatTripContext : DbContext
    {
        public BoatTripContext(DbContextOptions<BoatTripContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Customers> Customers { get; set; }
        public DbSet<PostPlaces> PostPlaces { get; set; }

        /*public DbSet<Boat> Boats { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<Terminal> Terminals { get; set; }
        public DbSet<Order> Orders { get; set; }*/

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}