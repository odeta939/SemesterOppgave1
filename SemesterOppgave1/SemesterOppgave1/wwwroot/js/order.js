//Oneway trip order
let firstRoute = {};

//Round trip order
let isRoundtrip = false;
let roundTripRoute = {};

$(function () {
  getRoutes();
  setOrder();
});

/**
 * Validates order
 * If valid, calls createOrder()
 */
function validateAndOrder() {
  const firstnameOK = validateFirstname($("#firstName").val());
  const lastnameOK = validateLastname($("#lastName").val());
  const phonenrOK = validatePhonenr($("#phoneNr").val());
  const emailOK = validateEmail($("#email").val());
  const streetOK = validateStreet($("#streetName").val());
  const zipOK = validateZipcode($("#zipCode").val());
  const cityOK = validateCity($("#cityName").val());

  if (
    firstnameOK &&
    lastnameOK &&
    phonenrOK &&
    emailOK &&
    streetOK &&
    zipOK &&
    cityOK
  ) {
    createOrder();
  }
}

/**
 * Initialises variables based on the localStorage values
 */
function getRoutes() {
  $.get("Order/GetAllRoutes", function (routes) {
    for (let route of routes) {
      const ticketAmount = Number(localStorage.getItem("ticketAmount"));
      if (
        route.arrivalTerminalCity == localStorage.getItem("arrival") &&
        route.departureTerminalCity == localStorage.getItem("departure") &&
        route.departureTime == localStorage.getItem("outbound")
      ) {
        firstRoute = route;
        calculateTotalPrice(firstRoute, ticketAmount);
      }
      if (
        route.arrivalTerminalCity == localStorage.getItem("departure") &&
        route.departureTerminalCity == localStorage.getItem("arrival") &&
        route.departureTime == localStorage.getItem("inbound")
      ) {
        roundTripRoute = route;
        isRoundtrip = true;
        calculateTotalPrice(roundTripRoute, ticketAmount);
      }
    }
  });
}

/**
 * Reduces the amount of tickets of a route
 * @param {*} aRoute    Route object (to be edited)
 */
function reduceTicketsLeft(aRoute) {
  $.post("Order/EditRoute", aRoute).fail(function (fail) {
    customAlert(fail.statusText, "Cant edit route");
  });
}

/**
 * Populates the divs with the ticket information
 */
function setOrder() {
  //If it's a one way trip
  if (
    localStorage.getItem("departure") &&
    localStorage.getItem("arrival") &&
    localStorage.getItem("outbound") &&
    !localStorage.getItem("inbound")
  ) {
    const departurePlace = localStorage.getItem("departure");
    const arrivalPlace = localStorage.getItem("arrival");
    const departureTime = localStorage.getItem("outbound");
    const ticketAmount = localStorage.getItem("ticketAmount");

    populateTicket(
      "Outbound",
      "#tripInfo",
      departurePlace,
      arrivalPlace,
      departureTime,
      ticketAmount
    );
  }
  //If it's a round trip
  else if (
    localStorage.getItem("departure") &&
    localStorage.getItem("arrival") &&
    localStorage.getItem("outbound") &&
    localStorage.getItem("inbound")
  ) {
    const departurePlace = localStorage.getItem("departure");
    const arrivalPlace = localStorage.getItem("arrival");
    const departureTime = localStorage.getItem("outbound");
    const ticketAmount = localStorage.getItem("ticketAmount");

    populateTicket(
      "Outbound",
      "#tripInfo",
      departurePlace,
      arrivalPlace,
      departureTime,
      ticketAmount
    );

    //Setting the trip info for the round trip (arrivalPlace will be departurePlace and vice versa)
    const departureTime2 = localStorage.getItem("inbound");

    populateTicket(
      "Inbound",
      "#tripInfo2",
      arrivalPlace,
      departurePlace,
      departureTime2,
      ticketAmount
    );
  }
  //If there are no values in localStorage
  else {
    $("#content-title").html("Oops...");
    $("#orderForm").html("");
    $("#selected-title").html("");
    $("#personal-title").html("");
    $("#tripInfo").html(
      "You have not chosen a trip yet. Go back to the <a href='index.html'>home page</a>."
    );
    $("#tripInfo2").text("");
  }
}

/**
 * Creates a ticket (inbound or outbound) for the order.html page
 * @param {*} direction       Outbound/inbound
 * @param {*} parentElement   Element to which all the HTML nodes will be attached
 * @param {*} departurePlace  Departure place
 * @param {*} arrivalPlace    Arrival place
 * @param {*} departureTime   Departure time
 * @param {*} ticketAmount    Number of tickets/passengers chosen
 */
function populateTicket(
  direction,
  parentElement,
  departurePlace,
  arrivalPlace,
  departureTime,
  ticketAmount
) {
  // Creates a title for the ticket session (outbound/inbound)
  const h3 = document.createElement("h3");
  h3.innerHTML = "<span class='capitalize'>" + direction + "</span> trip";
  $(parentElement).append(h3);

  // Adds each of the lines of information
  createTicketDetails("Departure place", departurePlace, parentElement);
  createTicketDetails("Arrival place", arrivalPlace, parentElement);
  createTicketDetails("Departure time", departureTime, parentElement);
  createTicketDetails("Amount of passengers", ticketAmount, parentElement);
}

/**
 * Creates order
 * Creates one or two orders, based on it being a round / oneway trip.
 * Calls reduceTicketsLeft() function after a successful request
 */
function createOrder() {
  let ticketAmount = localStorage.getItem("ticketAmount");
  let firstname = $("#firstName").val();
  let lastname = $("#lastName").val();
  let phonenr = $("#phoneNr").val();
  let email = $("#email").val();
  let street = $("#streetName").val();
  let zipCode = $("#zipCode").val();
  let city = $("#cityName").val();

  if (isRoundtrip == true) {
    //Reducing the amount of tickets left for a round trip
    if (firstRoute.ticketsLeft >= ticketAmount) {
      firstRoute.ticketsLeft -= ticketAmount;
    } else {
      customAlert(
        "There are not that many tickets left for this route!",
        "No tickets left"
      );
      return;
    }

    if (roundTripRoute.ticketsLeft >= ticketAmount) {
      roundTripRoute.ticketsLeft -= ticketAmount;
    } else {
      customAlert(
        "There are not that many tickets left for this route!",
        "No tickets left"
      );
      return;
    }

    const order = {
      ticketAmount: ticketAmount,
      totalPrice: ticketAmount * firstRoute.ticketPrice,
      departureTime: localStorage.getItem("outbound"),
      arrivalTime: firstRoute.arrivalTime,
      ticketsLeft: firstRoute.ticketsLeft,
      boatName: firstRoute.boatName,
      capacity: firstRoute.capacity,
      ticketPrice: firstRoute.ticketPrice,
      arrivalTerminalName: localStorage.getItem("arrival"),
      arrivalTerminalStreet: firstRoute.arrivalTerminalStreet,
      arrivalTerminalZipCode: firstRoute.arrivalTerminalZipCode,
      arrivalTerminalCity: localStorage.getItem("arrival"),
      departureTerminalName: localStorage.getItem("departure"),
      departureTerminalStreet: firstRoute.departureTerminalStreet,
      departureTerminalZipCode: firstRoute.departureTerminalZipCode,
      departureTerminalCity: localStorage.getItem("departure"),
      firstname: firstname,
      lastname: lastname,
      phonenr: phonenr,
      email: email,
      street: street,
      zipCode: zipCode,
      city: city,
    };

    const order2 = {
      ticketAmount: ticketAmount,
      totalPrice: ticketAmount * roundTripRoute.ticketPrice,
      departureTime: localStorage.getItem("inbound"),
      arrivalTime: roundTripRoute.arrivalTime,
      ticketsLeft: roundTripRoute.ticketsLeft,
      boatName: roundTripRoute.boatName,
      capacity: roundTripRoute.capacity,
      ticketPrice: roundTripRoute.ticketPrice,
      arrivalTerminalName: localStorage.getItem("departure"),
      arrivalTerminalStreet: roundTripRoute.arrivalTerminalStreet,
      arrivalTerminalZipCode: roundTripRoute.arrivalTerminalZipCode,
      arrivalTerminalCity: localStorage.getItem("departure"),
      departureTerminalName: localStorage.getItem("arrival"),
      departureTerminalStreet: roundTripRoute.departureTerminalStreet,
      departureTerminalZipCode: roundTripRoute.departureTerminalZipCode,
      departureTerminalCity: localStorage.getItem("arrival"),
      firstname: firstname,
      lastname: lastname,
      phonenr: phonenr,
      email: email,
      street: street,
      zipCode: zipCode,
      city: city,
    };

    $.post("Order/SaveOrder", order, function () {
      //If the post request returns an OK add the order to local storage
      localStorage.setItem("order", JSON.stringify(order));
      //Reducing the amount of tickets left for the route in the database
      reduceTicketsLeft(firstRoute);

      $.post("Order/SaveOrder", order2, function () {
        //If the post request returns an OK remove the old storage and add the second order to local storage
        localStorage.setItem("order2", JSON.stringify(order2));
        localStorage.removeItem("arrival");
        localStorage.removeItem("departure");
        localStorage.removeItem("outbound");
        localStorage.removeItem("inbound");
        localStorage.removeItem("ticketAmount");
        //Reducing the amount of tickets left for the roundtrip route in the database
        reduceTicketsLeft(roundTripRoute);
        //Will redirect to an order confirmation page if both orders returns an OK
        //Added a delay because on firefox jquery is changing location before the request is finished
        setTimeout(function () {
          window.location.href = "confirmation.html";
        }, 500);
      }).fail(function (fail) {
        customAlert(fail.responseText, "Error saving order");
      });
    }).fail(function (fail) {
      customAlert(fail.responseText, "Error saving order");
      return;
    });
  } else {
    //Reducing the amount of tickets for a one way trip
    if (firstRoute.ticketsLeft >= ticketAmount) {
      firstRoute.ticketsLeft -= ticketAmount;
    } else {
      customAlert(
        "There are not that many tickets left for this route!",
        "No tickets left"
      );
      return;
    }

    //Only one order if it's a oneway trip
    const order = {
      ticketAmount: ticketAmount,
      totalPrice: ticketAmount * firstRoute.ticketPrice,
      departureTime: localStorage.getItem("outbound"),
      arrivalTime: firstRoute.arrivalTime,
      ticketsLeft: firstRoute.ticketsLeft,
      boatName: firstRoute.boatName,
      capacity: firstRoute.capacity,
      ticketPrice: firstRoute.ticketPrice,
      arrivalTerminalName: localStorage.getItem("arrival"),
      arrivalTerminalStreet: firstRoute.arrivalTerminalStreet,
      arrivalTerminalZipCode: firstRoute.arrivalTerminalZipCode,
      arrivalTerminalCity: localStorage.getItem("arrival"),
      departureTerminalName: localStorage.getItem("departure"),
      departureTerminalStreet: firstRoute.departureTerminalStreet,
      departureTerminalZipCode: firstRoute.departureTerminalZipCode,
      departureTerminalCity: localStorage.getItem("departure"),
      firstname: firstname,
      lastname: lastname,
      phonenr: phonenr,
      email: email,
      street: street,
      zipCode: zipCode,
      city: city,
    };

    $.post("Order/SaveOrder", order, function () {
      //If the post request returns an OK remove the old storage and add the order to local storage
      localStorage.setItem("order", JSON.stringify(order));
      localStorage.removeItem("arrival");
      localStorage.removeItem("departure");
      localStorage.removeItem("outbound");
      localStorage.removeItem("inbound");
      localStorage.removeItem("ticketAmount");
      //Reducing the amount of tickets left for the route in the database
      reduceTicketsLeft(firstRoute);
      //Will redirect to the order confirmation page after a timeout for Firefox
      setTimeout(function () {
        window.location.href = "confirmation.html";
      }, 500);
    }).fail(function (fail) {
      customAlert(fail.responseText, "Error saving order");
    });
  }
}
