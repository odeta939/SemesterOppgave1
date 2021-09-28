using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SemesterOppgave1.DAL;
using SemesterOppgave1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SemesterOppgave1.Controllers
{
    [Route("[controller]/[action]")]
    public class OrderController: ControllerBase
    {
        private readonly IBoatTripRepository _db;
        private readonly ILogger<BoatTripRepository> _log;

        public OrderController(IBoatTripRepository db, ILogger<BoatTripRepository> log)
        {
            _db = db;
            _log = log;
        }

        //Customer methods:
        public async Task<List<Customer>> GetAllCustomers()
        {
            return await _db.GetAllCustomers();
        }

        public async Task<Customer> GetOneCustomer(int id)
        {
            return await _db.GetOneCustomer(id);
        }

        public async Task<bool> SaveCustomer(Customer customer)
        {
            return await _db.SaveCustomer(customer);
        }

        public async Task<bool> DeleteCustomer(int id)
        {
            return await _db.DeleteCustomer(id);
        }

        public async Task<bool> EditCustomer(Customer customer)
        {
            return await _db.EditCustomer(customer);
        }

        //Boat methods:
        public async Task<List<Boat>> GetAllBoats()
        {
            return await _db.GetAllBoats();
        }

        public async Task<Boat> GetOneBoat(int id)
        {
            return await _db.GetOneBoat(id);
        }

        public async Task<bool> DeleteBoat(int id)
        {
            return await _db.DeleteBoat(id);
        }

        public async Task<bool> EditBoat(Boat boat)
        {
            return await _db.EditBoat(boat);
        }

        //Route methods:
        public async Task<List<Route>> GetAllRoutes()
        {
            return await _db.GetAllRoutes();
        }

        public async Task<Route> GetOneRoute(int id)
        {
            return await _db.GetOneRoute(id);
        }

        //Order methods:
        public async Task<List<Order>> GetAllOrders()
        {
            return await _db.GetAllOrders();
        }

        public async Task<Order> GetOneOrder(int id)
        {
            return await _db.GetOneOrder(id);
        }

        public async Task<bool> SaveOrder(Order order)
        {
            return await _db.SaveOrder(order);
        }

        //Something random:
        public string Index()
        {
            return "Hei, controller her!";
        }




        //[HttpPost]
        /* public async Task PlaceOrder(Order regTicket)
         {
             var postplace = new PostPlace
             {
                 ZipCode = regTicket.Customer.PostPlace.ZipCode,
                 PostPlace = regTicket.Customer.PostPlace.PostPlace
             };

             var customer = new Customer
             {
                 Firstname = regTicket.Customer.Firstname,
                 Lastname = regTicket.Customer.Lastname,
                 Address = regTicket.Customer.Address,
                 PostPlace = postplace,
                 Phonenr = regTicket.Customer.Phonenr,
                 Email = regTicket.Customer.Email
             };

             var route = new Route
             {
                 Boat = regTicket.Route.Boat,
                 DeparturePlace = regTicket.Route.DeparturePlace,
                 ArrivalPlace = regTicket.Route.ArrivalPlace,
                 DepartureTime = regTicket.Route.DepartureTime,
                 ArrivalTime = regTicket.Route.ArrivalTime
             };

             var boat = new Boat
             {
                 BoatName = regTicket.Route.Boat.BoatName,
                 Capacity = regTicket.Route.Boat.Capacity,
                 TicketPrice = regTicket.Route.Boat.TicketPrice
             };

             var departureTerminal = new Terminal
             {
                 Name = regTicket.Route.DeparturePlace.Name,
                 Address = regTicket.Route.DeparturePlace.Address,
                 ZipCode = regTicket.Route.DeparturePlace.ZipCode
             };

             var arrivalTerminal = new Terminal
             {
                 Name = regTicket.Route.ArrivalPlace.Name,
                 Address = regTicket.Route.ArrivalPlace.Address,
                 ZipCode = regTicket.Route.ArrivalPlace.ZipCode
             };

             var order = new Order
             {
                 Route = route,
                 Customer = customer,
                 TicketAmount = regTicket.TicketAmount,
                 TotalPrice = regTicket.TotalPrice
             };

             _db.Customers.Add(customer);
             _db.Boats.Add(boat);
             _db.Routes.Add(route);
             _db.Terminals.Add(arrivalTerminal);
             _db.Terminals.Add(departureTerminal);
             _db.Orders.Add(order);
             await _db.SaveChangesAsync();
         }*/
    } 
}
