$(function () {
    //loads the confirmation 
  loadConfirmation();
});

function loadConfirmation() {
  const orderOut = getNewOrderOutbound();

  const grandpa = $("#container")[0];
    //retrieving order information from local storage
    if (localStorage.getItem("order")) {
      //creating a header and adding buyers name to the header 
    const h1 = document.createElement("h1");
    h1.classList.add("content-title");
    h1.innerHTML = `Thank you, ${orderOut.firstname} ${orderOut.lastname}!`;
    grandpa.append(h1);

        //creates second header with more information for the buyer
    const h2 = document.createElement("h2");
    h2.classList.add("content-subtitle");
    h2.innerText = "Your order has been registered";
    grandpa.append(h2);

        //creates a div that will hold information about chosen trip
    const parent = document.createElement("div");
    parent.classList.add("content-tripinfo");
        grandpa.append(parent);

        //creates the ticket for one way
    createOrderTicket(orderOut, parent, true);
    calculateTotalPrice(orderOut, orderOut.ticketAmount);

        //gets return order information
        const orderIn = getNewOrderInbound();
        //checks if the order for return exists in the local storage
        if (localStorage.getItem("order2")) {

            //creates ticket for round trip
      createOrderTicket(orderIn, parent, false);
      calculateTotalPrice(orderIn, orderIn.ticketAmount);
    }
  } else {
    $("#content").append(`<h1>You have not ordered anything yet.</h1>`);
  }
}


function createOrderTicket(order, parent, isOutbound) {
    //creates a div to hold details about the trip ordered
    const divOrder = document.createElement("div");
    //cheks if the trip is one way or round trip 
  divOrder.classList.add(isOutbound ? "outbound-info" : "inbound-info");
  parent.append(divOrder);

    //creates a header and assigns a value acordingly
  const h3 = document.createElement("h3");
    h3.classList.add("content-tripinfo-title");
    // checks if the trip is one way and assigns header text accordingly
  h3.innerText = isOutbound ? "Outbound trip" : "Inbound trip";
  divOrder.append(h3);

  const divWrapper = document.createElement("div");
  divWrapper.classList.add("content-tripinfo-wrapper");
  divOrder.append(divWrapper);


    //creates and populates div with information about departure
  const divDeparture = document.createElement("div");
  divDeparture.classList.add("content-tripinfo-departure");
  divWrapper.append(divDeparture);

  const departureTitle = document.createElement("h4");
  departureTitle.classList.add("content-tripinfo-departure-title");
  departureTitle.innerText = "Departure";
  divDeparture.append(departureTitle);

  createTicketDetails("Terminal", order.departureTerminalName, divDeparture);
  createTicketDetails("Boat", order.boatName, divDeparture);
  createTicketDetails(
    "Address",
    `${order.departureTerminalStreet}, ${order.departureTerminalZipCode}, ${order.departureTerminalCity}`,
    divDeparture
  );
  createTicketDetails("Departure time", order.departureTime, divDeparture);
  createTicketDetails("Amount of passengers", order.ticketAmount, divDeparture);


    //creates and populates div with arival infromation
  const divArrival = document.createElement("div");
  divArrival.classList.add("content-tripinfo-arrival");
  divWrapper.append(divArrival);

  const arrivalTitle = document.createElement("h4");
  arrivalTitle.classList.add("content-tripinfo-arrival-title");
  arrivalTitle.innerText = "Arrival";
  divArrival.append(arrivalTitle);

  createTicketDetails("Terminal", order.arrivalTerminalName, divArrival);
  createTicketDetails("Boat", order.boatName, divArrival);
  createTicketDetails(
    "Address",
    `${order.arrivalTerminalStreet}, ${order.arrivalTerminalZipCode}, ${order.arrivalTerminalCity}`,
    divArrival
  );
  createTicketDetails("Arrival time", order.arrivalTime, divArrival);
}

function getNewOrderOutbound() {
  //Get the outbound order
  const newOrder = JSON.parse(localStorage.getItem("order"));
  return newOrder;
}

function getNewOrderInbound() {
  //Get the inbound order
  const newOrder = JSON.parse(localStorage.getItem("order2"));
  return newOrder;
}
