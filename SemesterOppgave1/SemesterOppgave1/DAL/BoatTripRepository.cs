using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SemesterOppgave1.Models;




namespace SemesterOppgave1.DAL
{
    public class BoatTripRepository : IBoatTripRepository
    {
        private readonly BoatTripContext _db;
        private readonly ILogger<BoatTripRepository> _log;

        public BoatTripRepository(BoatTripContext db, ILogger<BoatTripRepository> log)
        {
            _db = db;
            _log = log;
        }

        //Customer methods:
         public async Task<List<Customer>> GetAllCustomers()
         {
                try
                {
                    List<Customer> allCustomers = await _db.Customers.Select(c => new Customer
                    {
                        Id = c.Id,
                        Firstname = c.Firstname,
                        Lastname = c.Lastname,
                        Street = c.Street,
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

        public async Task<Customer> GetOneCustomer(int id)
        {
            try
            {
                Customers customer = await _db.Customers.FindAsync(id);
                var fetchedCustomer = new Customer()
                {
                    Id = customer.Id,
                    Firstname = customer.Firstname,
                    Lastname = customer.Lastname,
                    Street = customer.Street,
                    Phonenr = customer.Phonenr,
                    Email = customer.Email,
                    ZipCode = customer.Postplace.ZipCode,
                    City = customer.Postplace.City
                };
                return fetchedCustomer;
            }
            catch
            {
                return null;
            }
        } 

        public async Task<bool> SaveCustomer(Customer customer)
        {
            try
            {
                var newCustomer = new Customers
                {
                    Firstname = customer.Firstname,
                    Lastname = customer.Lastname,
                    Phonenr = customer.Phonenr,
                    Email = customer.Email
                };

                var checkPostPlace = await _db.PostPlaces.FindAsync(customer.ZipCode);
                //If the postplace doesnt already exist we create a new PostPlace
                if (checkPostPlace == null)
                {
                    var newPostPlace = new PostPlaces
                    {
                        ZipCode = customer.ZipCode,
                        City = customer.City,
                    };
                }
                else
                {
                    newCustomer.Postplace = checkPostPlace;
                }
                _db.Customers.Add(newCustomer);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteCustomer(int id)
        {
            try
            {
                Customers customer = await _db.Customers.FindAsync(id);
                _db.Customers.Remove(customer);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> EditCustomer(Customer changedCustomer)
        {
            try
            {
                Customers customer = await _db.Customers.FindAsync(changedCustomer.Id);

                //If the zipcode changed when editing the customer
                if(customer.Postplace.ZipCode != changedCustomer.ZipCode)
                {
                    var checkPostPlace = await _db.PostPlaces.FindAsync(changedCustomer.ZipCode);
                    //If the postplace doesnt already exist we create a new PostPlace
                    if(checkPostPlace == null)
                    {
                        var newPostPlace = new PostPlaces
                        {
                            ZipCode = changedCustomer.ZipCode,
                            City = changedCustomer.City,
                        };
                    }
                    else
                    {
                        customer.Postplace = checkPostPlace;
                    }
                }
                customer.Firstname = changedCustomer.Firstname;
                customer.Lastname = changedCustomer.Lastname;
                customer.Email = changedCustomer.Email;
                customer.Phonenr = changedCustomer.Phonenr;

                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        //Boat methods:
        public async Task<List<Boat>> GetAllBoats()
        {
            try
            {
                List<Boat> AllBoats = await _db.Boats.Select(b => new Boat
                {
                    Id = b.Id,
                    BoatName = b.BoatName,
                    Capacity = b.Capacity,
                    TicketPrice = b.TicketPrice
                }).ToListAsync();
                return AllBoats;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Boat> GetOneBoat(int id)
        {
            try
            {
                Boats boat = await _db.Boats.FindAsync(id);
                var fetchedBoat = new Boat()
                {
                    Id = boat.Id,
                    BoatName = boat.BoatName,
                    Capacity = boat.Capacity,
                    TicketPrice = boat.TicketPrice
                };
                return fetchedBoat;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> DeleteBoat(int id)
        {
            try
            {
                Boats boat = await _db.Boats.FindAsync(id);
                _db.Boats.Remove(boat);
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> EditBoat(Boat changedBoat)
        {
            try
            {
                Boats boat = await _db.Boats.FindAsync(changedBoat.Id);
                boat.BoatName = changedBoat.BoatName;
                boat.Capacity = changedBoat.Capacity;
                boat.TicketPrice = changedBoat.TicketPrice;
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        //Terminal methods:

        public async Task<List<Terminal>> GetAllTerminals()
        {
            try
            {
                List<Terminal> AllTerminals = await _db.Terminals.Select(t => new Terminal
                {
                    Id = t.Id,
                    TerminalName = t.TerminalName,
                    Street = t.Street,
                    City = t.TerminalAddress.City,
                    ZipCode = t.TerminalAddress.ZipCode

                }).ToListAsync();
                return AllTerminals;
            }
            catch
            {
                return null;
            }

        }

        //Route methods:
        public async Task<List<Route>> GetAllRoutes()
        {
            try
            {
                List<Route> allRoutes = await _db.Routes.Select(r => new Route
                {
                    Id = r.Id,
                    DepartureTime = r.DepartureTime,
                    ArrivalTime = r.ArrivalTime,
                    BoatName = r.Boat.BoatName,
                    Capacity = r.Boat.Capacity,
                    TicketPrice = r.Boat.TicketPrice,
                    ArrivalTerminalName = r.ArrivalPlace.TerminalName,
                    ArrivalTerminalCity = r.ArrivalPlace.TerminalAddress.City,
                    ArrivalTerminalStreet = r.ArrivalPlace.Street,
                    ArrivalTerminalZipCode = r.ArrivalPlace.TerminalAddress.ZipCode,
                    DepartureTerminalName = r.DeparturePlace.TerminalName,
                    DepartureTerminalCity = r.DeparturePlace.TerminalAddress.City,
                    DepartureTerminalStreet = r.DeparturePlace.Street,
                    DepartureTerminalZipCode = r.DeparturePlace.TerminalAddress.ZipCode
                }).ToListAsync();
                return allRoutes;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Route> GetOneRoute(int id)
        {
            try
            {
                Routes route = await _db.Routes.FindAsync(id);
                var fetchedRoute = new Route()
                {
                    Id = route.Id,
                    DepartureTime = route.DepartureTime,
                    ArrivalTime = route.ArrivalTime,
                    BoatName = route.Boat.BoatName,
                    Capacity = route.Boat.Capacity,
                    TicketPrice = route.Boat.TicketPrice,
                    ArrivalTerminalName = route.ArrivalPlace.TerminalName,
                    ArrivalTerminalCity = route.ArrivalPlace.TerminalAddress.City,
                    ArrivalTerminalStreet = route.ArrivalPlace.Street,
                    ArrivalTerminalZipCode = route.ArrivalPlace.TerminalAddress.ZipCode,
                    DepartureTerminalName = route.DeparturePlace.TerminalName,
                    DepartureTerminalCity = route.DeparturePlace.TerminalAddress.City,
                    DepartureTerminalStreet = route.DeparturePlace.Street,
                    DepartureTerminalZipCode = route.DeparturePlace.TerminalAddress.ZipCode
                };
                return fetchedRoute;
            }
            catch
            {
                return null;
            }
        }
      
        //Order methods:
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
                    BoatName = o.Route.Boat.BoatName,
                    DeparturePlace = o.Route.DeparturePlace.TerminalName,
                    ArrivalPlace = o.Route.ArrivalPlace.TerminalName,
                    Firstname = o.Customer.Firstname,
                    Lastname = o.Customer.Lastname,
                    Street = o.Customer.Street,
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

        public async Task<Order> GetOneOrder(int id)
        {
            try
            {
                Orders order = await _db.Orders.FindAsync(id);
                var fetchedOrder = new Order()
                {
                    Id = order.Id,
                    TicketAmount = order.TicketAmount,
                    TotalPrice = order.TotalPrice,
                    DepartureTime = order.Route.DepartureTime,
                    ArrivalTime = order.Route.ArrivalTime,
                    BoatName = order.Route.Boat.BoatName,
                    DeparturePlace = order.Route.DeparturePlace.TerminalName,
                    ArrivalPlace = order.Route.ArrivalPlace.TerminalName,
                    Firstname = order.Customer.Firstname,
                    Lastname = order.Customer.Lastname,
                    Street = order.Customer.Street,
                    Phonenr = order.Customer.Phonenr,
                    Email = order.Customer.Email,
                    ZipCode = order.Customer.Postplace.ZipCode,
                    City = order.Customer.Postplace.City
                };
                return fetchedOrder;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> SaveOrder(Order order)
        {
            try
            {
                //The order that is created and added to the database
                var newOrder = new Orders();

                //The customer for the order, gets its info from the order parameter sent from the frontend
                var customer = new Customers
                {
                    Firstname = order.Firstname,
                    Lastname = order.Lastname,
                    Street = order.Street,
                    Phonenr = order.Phonenr,
                    Email = order.Email
                };
                customer.Postplace.City = order.City;
                customer.Postplace.ZipCode = order.ZipCode;

                //The route for the order
                var route = new Routes
                {
                    DepartureTime = order.DepartureTime,
                    ArrivalTime = order.ArrivalTime
                };
                route.Boat.BoatName = order.BoatName;
                route.DeparturePlace.TerminalName = order.DeparturePlace;
                route.ArrivalPlace.TerminalName = order.ArrivalPlace;

                newOrder.TicketAmount = order.TicketAmount;
                newOrder.TotalPrice = order.TotalPrice;
                newOrder.Customer = customer;
                newOrder.Route = route;

                _db.Orders.Add(newOrder);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }
    }
}
