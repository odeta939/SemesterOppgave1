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
    } 
}
