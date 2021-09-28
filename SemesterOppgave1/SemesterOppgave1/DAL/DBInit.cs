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

               
                var postplace = new PostPlaces { ZipCode = "0178", Street = "Osloveien21", City = "Oslo" };
                var customer = new Customers { Firstname = "Hei", Lastname = "PåDeg", Phonenr = "12345678", Email = "heipådeg@gmail.com", Postplace = postplace};

                var boat = new Boats { BoatName = "Colorline", Capacity = 300, TicketPrice = 500 };
                var boat2 = new Boats { BoatName = "Hurtigruten", Capacity = 500, TicketPrice = 750 };

                var departureterminal = new Terminals { TerminalName = "Some place", TerminalAddress = postplace };
                var arrivalterminal = new Terminals { TerminalName = "Other place", TerminalAddress = postplace  };

                var route = new Routes { Boat = boat, DeparturePlace = departureterminal, ArrivalPlace = arrivalterminal, ArrivalTime = "01.03.2040", DepartureTime = "31.12.2039" };

                var order = new Orders { Route = route, Customer = customer, TicketAmount = 2, TotalPrice = 1000 };

                context.Customers.Add(customer);
                context.Boats.Add(boat);
                context.Boats.Add(boat2);
                context.Terminals.Add(departureterminal);
                context.Terminals.Add(arrivalterminal);
                context.Routes.Add(route);
                context.Orders.Add(order);
                context.PostPlaces.Add(postplace);
                context.SaveChanges();

            }
        }
    }
}
