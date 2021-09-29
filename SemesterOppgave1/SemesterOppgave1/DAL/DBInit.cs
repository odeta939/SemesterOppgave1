using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections;

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

                //Postplaces customers
                var postplace1 = new PostPlaces { ZipCode = "1001", City = "Oslo" };
                var postplace2 = new PostPlaces { ZipCode = "2002", City = "Oslo" };
                var postplace3 = new PostPlaces { ZipCode = "3003", City = "Oslo" };
                var postplace4 = new PostPlaces { ZipCode = "4004", City = "Oslo" };
                var postplace5 = new PostPlaces { ZipCode = "5005", City = "Oslo" };
                var postplace6 = new PostPlaces { ZipCode = "6006", City = "Oslo" };
                var postplace7 = new PostPlaces { ZipCode = "7007", City = "Oslo" };

                context.PostPlaces.Add(postplace1);
                context.PostPlaces.Add(postplace2);
                context.PostPlaces.Add(postplace3);
                context.PostPlaces.Add(postplace4);
                context.PostPlaces.Add(postplace5);
                context.PostPlaces.Add(postplace6);
                context.PostPlaces.Add(postplace7);


                //Customers
                var customer1 = new Customers { Firstname = "Eivind", Lastname = "Ekeberg", Street = "Osloveien 12", Phonenr = "11111111", Email = "eivind-ekeberg@gmail.com", Postplace = postplace1 };
                var customer2 = new Customers { Firstname = "Lina", Lastname = "Hekkestad", Street = "Trondheimvei 12", Phonenr = "22222222", Email = "lina-hekkestad@gmail.com", Postplace = postplace2 };
                var customer3 = new Customers { Firstname = "Håkon", Lastname = "Håkonsen", Street = "Kristiandsandgata 12", Phonenr = "33333333", Email = "haakon-haakonsen@gmail.com", Postplace = postplace3 };
                var customer4 = new Customers { Firstname = "Vebjørn", Lastname = "Olsen", Street = "Aalesundgata 12", Phonenr = "44444444", Email = "v-olsen@gmail.com", Postplace = postplace4 };
                var customer5 = new Customers { Firstname = "Kjetil", Lastname = "Hansen", Street = "Stavangerveien 12", Phonenr = "55555555", Email = "kjetil-hansen@gmail.com", Postplace = postplace5 };
                var customer6 = new Customers { Firstname = "Maria", Lastname = "Berg", Street = "Bodovei 12A", Phonenr = "66666666", Email = "maria-berg@gmail.com", Postplace = postplace6 };
                var customer7 = new Customers { Firstname = "Jon", Lastname = "Lund", Street = "Lillhammergata 12", Phonenr = "77777777", Email = "jon-lund@gmail.com", Postplace = postplace7 };
                Customers[] customers = { customer1, customer2, customer3, customer4, customer5, customer6, customer7 };

                context.Customers.Add(customer1);
                context.Customers.Add(customer2);
                context.Customers.Add(customer3);
                context.Customers.Add(customer4);
                context.Customers.Add(customer5);
                context.Customers.Add(customer6);
                context.Customers.Add(customer7);


                //Boats
                var boat1 = new Boats { BoatName = "Colorline", Capacity = 1000, TicketPrice = 400 };
                var boat2 = new Boats { BoatName = "Hurtigruten", Capacity = 600, TicketPrice = 1250 };
                var boat3 = new Boats { BoatName = "DFDS", Capacity = 400, TicketPrice = 650 };
                var boat4 = new Boats { BoatName = "FjordLine", Capacity = 500, TicketPrice = 750 };

                context.Boats.Add(boat1);
                context.Boats.Add(boat2);
                context.Boats.Add(boat3);
                context.Boats.Add(boat4);


                //Postplaces Terminals
                var postplaceOslo = new PostPlaces { ZipCode = "1111", City = "Oslo" };
                var postplaceKiel = new PostPlaces { ZipCode = "24143", City = "Kiel-Gaarden" };
                var postplaceGot = new PostPlaces { ZipCode = "405 19", City = "Göteborg" };
                var postplaceKob = new PostPlaces { ZipCode = "2100", City = "København" };

                context.PostPlaces.Add(postplaceOslo);
                context.PostPlaces.Add(postplaceKiel);
                context.PostPlaces.Add(postplaceGot);
                context.PostPlaces.Add(postplaceKob);

                //Terminal
                var Terminal1 = new Terminals { TerminalName = "Oslo", Street = "Schweigaards gate 1", TerminalAddress = postplaceOslo };
                var Terminal2 = new Terminals { TerminalName = "Kiel", Street = "Kiel kai", TerminalAddress = postplaceKiel };
                var Terminal3 = new Terminals { TerminalName = "Göteborg", Street = "Danmarksterminalen", TerminalAddress = postplaceGot };
                var Terminal4 = new Terminals { TerminalName = "København", Street = "Dampfærgevej 30", TerminalAddress = postplaceKob };

                context.Terminals.Add(Terminal1);
                context.Terminals.Add(Terminal2);
                context.Terminals.Add(Terminal3);
                context.Terminals.Add(Terminal4);


                //Routes
                var routeList = new ArrayList();
                for(int i = 0; i < 100; i++)
                {
                    DateTime dateToday = DateTime.Today;
                    DateTime departureDate = dateToday.AddDays(i);
                    string departureDateString = departureDate.ToString("dd-MM-yyyy");
                    DateTime arrivalDate = dateToday.AddDays(i + 1);
                    string arrivalDateString = arrivalDate.ToString("dd-MM-yyyy");

                    //The Boats go back and forward and it takes one day to get there. On even days they go one way on the uneven days the go back.
                    if(dateToday.Day % 2 == 0)
                    {
                        routeList.Add(new Routes { Boat = boat1, DeparturePlace = Terminal1, ArrivalPlace = Terminal2, DepartureTime = departureDateString, ArrivalTime = arrivalDateString });
                        routeList.Add(new Routes { Boat = boat2, DeparturePlace = Terminal1, ArrivalPlace = Terminal4, DepartureTime = departureDateString, ArrivalTime = arrivalDateString });
                        routeList.Add(new Routes { Boat = boat3, DeparturePlace = Terminal1, ArrivalPlace = Terminal3, DepartureTime = departureDateString, ArrivalTime = arrivalDateString });
                        routeList.Add(new Routes { Boat = boat4, DeparturePlace = Terminal3, ArrivalPlace = Terminal4, DepartureTime = departureDateString, ArrivalTime = arrivalDateString });
                    }
                    else
                    {
                        routeList.Add(new Routes { Boat = boat1, DeparturePlace = Terminal2, ArrivalPlace = Terminal1, DepartureTime = departureDateString, ArrivalTime = arrivalDateString });
                        routeList.Add(new Routes { Boat = boat2, DeparturePlace = Terminal4, ArrivalPlace = Terminal1, DepartureTime = departureDateString, ArrivalTime = arrivalDateString });
                        routeList.Add(new Routes { Boat = boat3, DeparturePlace = Terminal3, ArrivalPlace = Terminal1, DepartureTime = departureDateString, ArrivalTime = arrivalDateString });
                        routeList.Add(new Routes { Boat = boat4, DeparturePlace = Terminal4, ArrivalPlace = Terminal3, DepartureTime = departureDateString, ArrivalTime = arrivalDateString });
                    }
                }
                foreach (Routes route in routeList)
                {
                    context.Routes.Add(route);
                }

                
                //Orders
                foreach(Routes route in routeList)
                {
                    Random rnd = new Random();
                    int index = rnd.Next(customers.Length);
                    int randomTicketAmount = rnd.Next(250, 600);

                    int capacity = route.Boat.Capacity;

                    while(randomTicketAmount > capacity)
                    {
                        randomTicketAmount = rnd.Next(250, 600);
                    }

                    int totalPrice = route.Boat.TicketPrice * randomTicketAmount;
                    var order = new Orders { Route = route, Customer = customers[index], TicketAmount = randomTicketAmount, TotalPrice = totalPrice };
                    context.Orders.Add(order);
                }
                
                // context.Orders.Add(order);
                context.SaveChanges();

            }
        }
    }
}
