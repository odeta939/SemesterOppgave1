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
                        Address = c.Address,
                        Phonenr = c.Phonenr,
                        Email = c.Email,
                        ZipCode = c.Postplace.ZipCode,
                        Place = c.Postplace.Place
                    }).ToListAsync();
                    return allCustomers;
                }
                catch
                {
                    return null;
                }
            }

    }
}
