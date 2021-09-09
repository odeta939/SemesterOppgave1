using Mappeeksamen1.Models;
using Microsoft.AspNetCore.Mvc;
using SemesterOppgave1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SemesterOppgave1.Controllers
{
    [Route("[controller]/[action]")]
    public class TicketController: ControllerBase
    {
        private readonly BoatTripContext _db;

        public TicketController(BoatTripContext db)
        {
            _db = db;
        }

        [HttpPost]
        public void placeOrder(Ticket regTicket)
        {

           
             //Make Ticket model with these attributes:
             
            var order = new Order()
            {
                BoatName = regTicket.BoatName,
                Route = regTicket.Route,
                Price = regTicket.Price,
                Departure = regTicket.Departure
                
            };

            var customer = new Customer
            {
                Firstname = regTicket.Firstname,
                Lastname = regTicket.Lastname,
                Address = regTicket.Address,
                /*
                //--//--//
                 * probably need to make one more class in 
                 * DbContext to split out the address properly
                 * and use attributes like "Street + number", "Postnr", "City"
                 //--//--//
                */
                Phonenr = regTicket.Phonenr,
                Email = regTicket.Email
                
            };

            customer.Orders = new List<Order>();
            customer.Orders.Add(order);
            _db.Customers.Add(customer);
            _db.SaveChanges();

            /*
             * Since we don't have login for customer
             * should we still check if customer exists? 
             */


        }
    } 
}
