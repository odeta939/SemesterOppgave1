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
        public async Task<ActionResult> GetAllCustomers()
        {
            List<Customer> allCustomers = await _db.GetAllCustomers();
            return Ok(allCustomers);
        }

        public async Task<ActionResult> GetOneCustomer(int id)
        {
            Customer customer = await _db.GetOneCustomer(id);
            if (customer == null)
            {
                _log.LogInformation("Could not find that customer!");
                return NotFound("Could not find that customer!");
            }
            return Ok(customer);
        }

        public async Task<ActionResult> SaveCustomer(Customer customer)
        {
            if(ModelState.IsValid)
            {
                bool saveCustomer = await _db.SaveCustomer(customer);
                if (!saveCustomer)
                {
                    _log.LogInformation("Could not save that customer!");
                    return BadRequest("Could not save that customer!");
                }
                return Ok("Customer saved!");
            }
            else
            {
                _log.LogInformation("Input not valid!");
                return BadRequest("Input not valid!");
            }
        }

        public async Task<ActionResult> DeleteCustomer(int id)
        {
            bool deleteCustomer = await _db.DeleteCustomer(id);
            if (!deleteCustomer)
            {
                _log.LogInformation("Could not delete that customer!");
                return NotFound("Could not delete that customer!");
            }
            return Ok("Customer deleted!");
        }

        public async Task<ActionResult> EditCustomer(Customer customer)
        {
            if (ModelState.IsValid)
            {
                bool editCustomer = await _db.EditCustomer(customer);
                if (!editCustomer)
                {
                    _log.LogInformation("Could not edit that customer!");
                    return NotFound("Could not edit that customer!");
                }
                return Ok("Customer edited!");
            }
            else
            {
                _log.LogInformation("Input not valid!");
                return BadRequest("Input not valid!");
            }
        }

        //Boat methods:
        public async Task<ActionResult> GetAllBoats()
        {
            List<Boat> allBoats = await _db.GetAllBoats();
            return Ok(allBoats);
        }

        public async Task<ActionResult> GetOneBoat(int id)
        {
            Boat boat = await _db.GetOneBoat(id);
            if (boat == null)
            {
                _log.LogInformation("Could not find that boat!");
                return NotFound("Could not find that boat!");
            }
            return Ok(boat);
        }

        public async Task<ActionResult> DeleteBoat(int id)
        {
            bool deleteBoat = await _db.DeleteBoat(id);
            if (!deleteBoat)
            {
                _log.LogInformation("Could not delete that boat!");
                return NotFound("Could not delete that boat!");
            }
            return Ok("Boat deleted!");
        }

        public async Task<ActionResult> EditBoat(Boat boat)
        {
            if (ModelState.IsValid)
            {
                bool editBoat = await _db.EditBoat(boat);
                if (!editBoat)
                {
                    _log.LogInformation("Could not edit that boat!");
                    return NotFound("Could not edit that boat!");
                }
                return Ok("Boat edited!");
            }
            else
            {
                _log.LogInformation("Input not valid!");
                return BadRequest("Input not valid!");
            }
        }

        //Terminal methods:
        public async Task<ActionResult> GetAllTerminals()
        {
            List<Terminal> allTerminals = await _db.GetAllTerminals();
            return Ok(allTerminals);
        }


        //Route methods:
        public async Task<ActionResult> GetAllRoutes()
        {
            List<Route> allRoutes = await _db.GetAllRoutes();
            return Ok(allRoutes);
        }

        public async Task<ActionResult> GetOneRoute(int id)
        {
            Route route = await _db.GetOneRoute(id);
            if (route == null)
            {
                _log.LogInformation("Could not find that route!");
                return NotFound("Could not find that route!");
            }
            return Ok(route);
        }

        //Order methods:
        public async Task<ActionResult> GetAllOrders()
        {
            List<Order> allOrders = await _db.GetAllOrders();
            return Ok(allOrders);
        }

        public async Task<ActionResult> GetOneOrder(int id)
        {
            Order order = await _db.GetOneOrder(id);
            if (order == null)
            {
                _log.LogInformation("Could not find that order!");
                return NotFound("Could not find that order!");
            }
            return Ok(order);
        }

        public async Task<ActionResult> SaveOrder(Order order)
        {
            bool saveOrder = await _db.SaveOrder(order);
            if (ModelState.IsValid)
            {
                if (!saveOrder)
                {
                    _log.LogInformation("Could not save that order!");
                    return BadRequest("Could not save that order!");
                }
                return Ok("Order saved!");
            }
            else
            {
                _log.LogInformation("Input not valid!");
                return BadRequest("Input not valid!");
            }
        }


      
        //Something random:
        public string Index()
        {
            return "Hei, controller her!";
        }
    } 
}
