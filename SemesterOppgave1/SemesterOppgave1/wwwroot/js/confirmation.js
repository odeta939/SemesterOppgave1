$(function () {
  loadConfirmation();
});

function loadConfirmation() {
  const orderOut = getNewOrderOutbound();

  const grandpa = $("#container")[0];

  if (localStorage.getItem("order")) {
    const h1 = document.createElement("h1");
    h1.classList.add("content-title");
    h1.innerHTML = `Thank you, ${orderOut.firstname} ${orderOut.lastname}!`;
    grandpa.append(h1);

    const h2 = document.createElement("h2");
    h2.classList.add("content-subtitle");
    h2.innerText = "Your order has been registered";
    grandpa.append(h2);

    const parent = document.createElement("div");
    parent.classList.add("content-tripinfo");
    grandpa.append(parent);
    createOrderTicket(orderOut, parent, true);

    const orderIn = getNewOrderInbound();
    if (localStorage.getItem("order2")) {
      const parent = $("#content")[0];
      createOrderTicket(orderIn, parent, false);
    }
  } else {
    $("#content").append(`<h1>You have not ordered anything yet.</h1>`);
  }
}

function createOrderTicket(order, parent, isOutbound) {
  const divOrder = document.createElement("div");
  divOrder.classList.add(isOutbound ? "outbound-info" : "inbound-info");
  parent.append(divOrder);

  const h3 = document.createElement("h3");
  h3.classList.add("content-tripinfo-title");
  h3.innerText = isOutbound ? "Outbound trip" : "Inbound trip";
  divOrder.append(h3);

  const divWrapper = document.createElement("div");
  divWrapper.classList.add("content-tripinfo-wrapper");
  divOrder.append(divWrapper);

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
