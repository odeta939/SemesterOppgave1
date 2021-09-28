using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace SemesterOppgave1.DAL
{
    public static class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<BoatTripContext>();

                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

               
                var postplace = new PostPlaces { ZipCode = "0178", Place = "Oslo" };
                var customer = new Customers { Firstname = "Hei", Lastname = "PåDeg", Address = "Osloveien 13", Phonenr = "12345678", Email = "heipådeg@gmail.com", Postplace = postplace};


                //var boat = new Boat { BoatName = "Colorline", Capacity = 300, TicketPrice = 500 };
                //var departureterminal = new Terminal { Name = "Some place", Address = "Some address", ZipCode = "0178" };
                //var arrivalterminal = new Terminal { Name = "Other place", Address = "Other address", ZipCode = "12312" };
                //var route = new Route { Boat = boat, DeparturePlace = departureterminal, ArrivalPlace = arrivalterminal, ArrivalTime = "01.03.2040", DepartureTime = "31.12.2039" };
                //var order = new Order { Route = route, Customer = customer, TicketAmount = 2, TotalPrice = 1000 };

                context.Customers.Add(customer);
                context.SaveChanges();

                //context.Orders.Add(order)
            }
        }
    }
}
