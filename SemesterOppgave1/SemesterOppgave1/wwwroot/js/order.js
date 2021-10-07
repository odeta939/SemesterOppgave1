//Variables for the order for a oneway trip
let firstRoute = {};

//Variables for the order for a roundtrip
let roundtrip = false;
let roundTripRoute = {};

$(function () {
  getRoutes();
  setOrder();
});

function validateAndOrder() {
  var firstnameOK = validateFirstname($("#firstName").val());
  var lastnameOK = validateLastname($("#lastName").val());
  var phonenrOK = validatePhonenr($("#phoneNr").val());
  var emailOK = validateEmail($("#email").val());
  var streetOK = validateStreet($("#streetName").val());
  var zipOK = validateZipcode($("#zipCode").val());
  var cityOK = validateCity($("#cityName").val());

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

//Function for initializing the variables based on the localStorage values
function getRoutes() {
  $.get("Order/GetAllRoutes", function (routes) {
    for (let route of routes) {
      if (
        route.arrivalTerminalCity == localStorage.getItem("arrival") &&
        route.departureTerminalCity == localStorage.getItem("departure") &&
        route.departureTime == localStorage.getItem("outbound")
      ) {
        firstRoute = route;
      }
      if (
        route.arrivalTerminalCity == localStorage.getItem("departure") &&
        route.departureTerminalCity == localStorage.getItem("arrival") &&
        route.departureTime == localStorage.getItem("inbound")
      ) {
        roundTripRoute = route;
        roundtrip = true;
      }
    }
  });
}

function reduceTicketsLeft(aRoute) {
  $.get("Order/EditRoute", aRoute, function () {
    //Do nothing :D
  }).fail(function (fail) {
      customAlert(fail.responseText, "Error editing route");
  });
}

function setOrder() {
  //If it's a one way trip:
  if (
    localStorage.getItem("departure") &&
    localStorage.getItem("arrival") &&
    localStorage.getItem("outbound") &&
    !localStorage.getItem("inbound")
  ) {
    //Calling getRoutes to initiate the variables for the order - as well as getting the route object to reduce tickets left depending on the ticketamount chosen.

    const departurePlace = localStorage.getItem("departure");
    const arrivalPlace = localStorage.getItem("arrival");
    const departureTime = localStorage.getItem("outbound");

    populateTicket(
      "Outbound",
      "#tripInfo",
      departurePlace,
      arrivalPlace,
      departureTime
    );
  }
  //If it's a round trip:
  else if (
    localStorage.getItem("departure") &&
    localStorage.getItem("arrival") &&
    localStorage.getItem("outbound") &&
    localStorage.getItem("inbound")
  ) {
    //Calling getRoutes to initiate the variables for the order - as well as getting the route object to reduce tickets left depending on the ticketamount chosen.

    const departurePlace = localStorage.getItem("departure");
    const arrivalPlace = localStorage.getItem("arrival");
    const departureTime = localStorage.getItem("outbound");

    populateTicket(
      "Outbound",
      "#tripInfo",
      departurePlace,
      arrivalPlace,
      departureTime
    );

    //Setting the trip info for the round trip (arrivalPlace will be departurePlace and vice versa):
    const departureTime2 = localStorage.getItem("inbound");

    populateTicket(
      "Inbound",
      "#tripInfo2",
      arrivalPlace,
      departurePlace,
      departureTime2
    );
  }
  //If there are no values in localStorage:
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

function populateTicket(
  direction,
  parentElement,
  departurePlace,
  arrivalPlace,
  departureTime
) {
  const h3 = document.createElement("h3");
  h3.innerHTML = "<span class='capitalize'>" + direction + "</span> trip";
  $(parentElement).append(h3);
  createTicketDetails("Departure place", departurePlace, parentElement);
  createTicketDetails("Arrival place", arrivalPlace, parentElement);
  createTicketDetails("Departure time", departureTime, parentElement);
}

function createOrder() {
  let ticketAmount = localStorage.getItem("ticketAmount");
  let firstname = $("#firstName").val();
  let lastname = $("#lastName").val();
  let phonenr = $("#phoneNr").val();
  let email = $("#email").val();
  let street = $("#streetName").val();
  let zipCode = $("#zipCode").val();
  let city = $("#cityName").val();

  if (roundtrip == true) {
    //Reducing the amount of tickets left for a round trip:
    if (firstRoute.ticketsLeft >= ticketAmount) {
      firstRoute.ticketsLeft -= ticketAmount;
    } else {
      customAlert("There are not that many tickets left for this route!", "No tickets left");
      return;
    }

    if (roundTripRoute.ticketsLeft >= ticketAmount) {
      roundTripRoute.ticketsLeft -= ticketAmount;
    } else {
      customAlert("There are not that many tickets left for this route!", "No tickets left");
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

    localStorage.setItem("order", JSON.stringify(order));
    $.post("Order/SaveOrder", order, function () {
      //If the post request returns an OK add the order to local storage:
      //Reducing the amount of tickets left for the route in the database:
      reduceTicketsLeft(firstRoute);
    }).fail(function (fail) {
      customAlert(fail.responseText, "Error saving order");
      return;
    });

    localStorage.setItem("order2", JSON.stringify(order2));
    $.post("Order/SaveOrder", order2, function () {
      //If the post request returns an OK remove the old storage and add the second order to local storage:
      localStorage.removeItem("arrival");
      localStorage.removeItem("departure");
      localStorage.removeItem("outbound");
      localStorage.removeItem("inbound");
      localStorage.removeItem("ticketAmount");
      //Reducing the amount of tickets left for the roundtrip route in the database:
      reduceTicketsLeft(roundTripRoute);
      //Will redirect to an order confirmation page:
      window.location.href = "confirmation.html";
    }).fail(function (fail) {
      customAlert(fail.responseText, "Error saving order");
    });
  } else {
    //Reducing the amount of tickets for a one way trip:
    if (firstRoute.ticketsLeft >= ticketAmount) {
      firstRoute.ticketsLeft -= ticketAmount;
    } else {
      customAlert("There are not that many tickets left for this route!", "Error saving order");
      return;
    }
    //Only one order if it's a oneway trip:
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
      //If the post request returns an OK remove the old storage and add the order to local storage:
      localStorage.setItem("order", JSON.stringify(order));
      localStorage.removeItem("arrival");
      localStorage.removeItem("departure");
      localStorage.removeItem("outbound");
      localStorage.removeItem("inbound");
      localStorage.removeItem("ticketAmount");
      //Reducing the amount of tickets left for the route in the database:
      reduceTicketsLeft(firstRoute);
      //Will redirect to an order confirmation page when thats created:
      window.location.href = "confirmation.html";
    }).fail(function (fail) {
      customAlert(fail.responseText, "Error saving order");
    });
  }
}
