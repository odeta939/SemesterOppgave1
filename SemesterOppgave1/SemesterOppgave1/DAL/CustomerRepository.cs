using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SemesterOppgave1.Models;




namespace SemesterOppgave1.DAL
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly BoatTripContext _db;

        public CustomerRepository(BoatTripContext db)
        {
            _db = db;
        }

         public async Task<List<Customer>> GetAllCustomers()
         {
                try
                {
                    List<Customer> allCustomers = await _db.Customers.Select(c => new Customer
                    {
                        Id = c.Id,
                        Firstname = c.Firstname,
                        Lastname = c.Lastname,
                        Street = c.Postplace.Street,
                        Phonenr = c.Phonenr,
                        Email = c.Email,
                        ZipCode = c.Postplace.ZipCode,
                        City = c.Postplace.City
                    }).ToListAsync();
                    return allCustomers;
                }
                catch
                {
                    return null;
                }
         }

      

        public async Task<List<Order>> GetAllOrders()
        {
            try
            {
                List<Order> allOrders = await _db.Orders.Select(o => new Order
                {
                    Id = o.Id,
                    TicketAmount = o.TicketAmount,
                    TotalPrice = o.TotalPrice,
                    DepartureTime = o.Route.DepartureTime,
                    ArrivalTime = o.Route.ArrivalTime,
                    Boat = o.Route.Boat.BoatName,
                    DeparturePlace = o.Route.DeparturePlace.TerminalName,
                    ArrivalPlace = o.Route.ArrivalPlace.TerminalName,
                    Firstname = o.Customer.Firstname,
                    Lastname = o.Customer.Lastname,
                    Street = o.Customer.Postplace.Street,
                    Phonenr = o.Customer.Phonenr,
                    Email = o.Customer.Email,
                    ZipCode= o.Customer.Postplace.ZipCode,
                    City = o.Customer.Postplace.City

                }).ToListAsync();
                return allOrders;
            }
            catch
            {
                return null;
            }
        }

    }
}
