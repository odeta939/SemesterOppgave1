using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SemesterOppgave1.Models;

namespace SemesterOppgave1.DAL
{
    public interface IBoatTripRepository
    {

        Task<List<Customer>> GetAllCustomers();
        Task<Customer> GetOneCustomer(int id);
        Task<bool> SaveCustomer(Customer customer);
        Task<bool> DeleteCustomer(int id);
        Task<bool> EditCustomer(Customer changedCustomer);

        Task<List<Boat>> GetAllBoats();
        Task<Boat> GetOneBoat(int id);
        Task<bool> DeleteBoat(int id);
        Task<bool> EditBoat(Boat changedBoat);

        Task<List<Route>> GetAllRoutes();
        Task<Route> GetOneRoute(int id);

        Task<List<Order>> GetAllOrders();
        Task<Order> GetOneOrder(int id);
        Task<bool> SaveOrder(Order order);

        Task<List<Terminal>> GetAllTerminals();
    }
}
