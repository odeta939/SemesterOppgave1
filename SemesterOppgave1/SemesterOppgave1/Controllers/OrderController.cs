using Microsoft.AspNetCore.Mvc;
using SemesterOppgave1.DAL;
using SemesterOppgave1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SemesterOppgave1.Controllers
{
    [Route("[controller]/[action]")]
    public class OrderController: ControllerBase
    {
        private readonly ICustomerRepository _db;

        public OrderController(ICustomerRepository db)
        {
            _db = db;
        }

        public async Task<List<Customer>> getAllCustomers()
        {
            return await _db.GetAllCustomers();
        }
        public async Task<List<Order>> getAllOrders()
        {
            return await _db.GetAllOrders();
        }

        public string index()
        {
            return "hei controller her";
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
