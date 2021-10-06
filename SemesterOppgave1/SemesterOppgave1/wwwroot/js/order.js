//Variables for the order for a oneway trip
let firstRoute = {};

let roundtrip = false;

//Variables for the order for a roundtrip
let roundTripRoute = {};

$(function () {
  getRoutes();
  setOrder();
});

function validateAndOrder() {
  console.log(firstRoute);
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
    console.log(routes);
    console.log(localStorage.getItem("arrival"));
    console.log(localStorage.getItem("departure"));
    console.log(localStorage.getItem("outbound"));
    console.log(localStorage.getItem("inbound"));
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
    alert(fail.responseText);
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

    let departurePlace = localStorage.getItem("departure");
    let arrivalPlace = localStorage.getItem("arrival");

    let departureTime = localStorage.getItem("outbound");

    let out =
      "Departure place: " +
      departurePlace +
      "\n" +
      "Arrival place: " +
      arrivalPlace +
      "\n" +
      "Departure time: " +
      departureTime +
      " 09:00";
    let tripInfo = $("#tripInfo").text(out);
    tripInfo.html(tripInfo.html().replace(/\n/g, "<br/>"));
  }
  //If it's a round trip:
  else if (
    localStorage.getItem("departure") &&
    localStorage.getItem("arrival") &&
    localStorage.getItem("outbound") &&
    localStorage.getItem("inbound")
  ) {
    //Calling getRoutes to initiate the variables for the order - as well as getting the route object to reduce tickets left depending on the ticketamount chosen.

    let departurePlace = localStorage.getItem("departure");
    let arrivalPlace = localStorage.getItem("arrival");
    let departureTime = localStorage.getItem("outbound");

    let out =
      "Inbound trip:\n\n" +
      "Departure place: " +
      departurePlace +
      "\n" +
      "Arrival place: " +
      arrivalPlace +
      "\n" +
      "Departure time: " +
      departureTime;
    let tripInfo = $("#tripInfo").text(out);
    tripInfo.html(tripInfo.html().replace(/\n/g, "<br/>"));

    //Setting the trip info for the round trip (arrivalPlace will be departurePlace and vice versa):
    let departureTime2 = localStorage.getItem("inbound");

    let out2 =
      "Outbound trip:\n\n" +
      "Departure place: " +
      arrivalPlace +
      "\n" +
      "Arrival place: " +
      departurePlace +
      "\n" +
      "Departure time: " +
      departureTime2;
    let tripInfo2 = $("#tripInfo2").text(out2);
    tripInfo2.html(tripInfo2.html().replace(/\n/g, "<br/>"));
  }
  //If there are no values in localStorage:
  else {
    $("#orderForm").html("");
    let tripInfo = $("#tripInfo").text(
      "You haven't chosen a trip yet! Go back to the home page. :)"
    );
    $("#tripInfo2").text("");
    tripInfo.html(
      tripInfo
        .html()
        .replace(
          /home page/g,
          '<a style="text-decoration: none" href="index.html">home page</a>'
        )
    );
  }
}

function createOrder() {
  let ticketAmount = $("#ticketAmount").val();
  let firstname = $("#firstName").val();
  let lastname = $("#lastName").val();
  let phonenr = $("#phoneNr").val();
  let email = $("#email").val();
  let street = $("#streetName").val();
  let zipCode = $("#zipCode").val();
  let city = $("#cityName").val();

  console.log(roundtrip);

  if (roundtrip == true) {
    //Reducing the amount of tickets left for a round trip:
    if (firstRoute.ticketsLeft >= ticketAmount) {
      firstRoute.ticketsLeft -= ticketAmount;
    } else {
      alert("There are not that many tickets left for this route!");
      return;
    }

    if (roundTripRoute.ticketsLeft >= ticketAmount) {
      roundTripRoute.ticketsLeft -= ticketAmount;
    } else {
      alert("There are not that many tickets left for this route!");
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
      console.log("In ROUNDWAY1");
      //If the post request returns an OK remove the old storage and add the order to local storage:
      localStorage.setItem("order", JSON.stringify(order));
      localStorage.removeItem("arrival");
      localStorage.removeItem("departure");
      localStorage.removeItem("outbound");
      localStorage.removeItem("inbound");
      //Reducing the amount of tickets left for the route in the database:
      reduceTicketsLeft(firstRoute);
    }).fail(function (fail) {
      alert(fail.responseText);
      return;
    });

    $.post("Order/SaveOrder", order2, function () {
      console.log("In ROUNDWAY2");
      //If the post request returns an OK remove the old storage and add the second order to local storage:
      localStorage.setItem("order2", JSON.stringify(order2));
      localStorage.removeItem("arrival");
      localStorage.removeItem("departure");
      localStorage.removeItem("outbound");
      localStorage.removeItem("inbound");
      //Reducing the amount of tickets left for the roundtrip route in the database:
      reduceTicketsLeft(roundTripRoute);
      //Will redirect to an order confirmation page when thats created:
      window.location.href = "confirmation.html";
    }).fail(function (fail) {
      alert(fail.responseText);
    });
  } else {
    //Reducing the amount of tickets for a one way trip:
    if (firstRoute.ticketsLeft >= ticketAmount) {
      firstRoute.ticketsLeft -= ticketAmount;
    } else {
      alert("There are not that many tickets left for this route!");
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

    $.post("Order/SaveOrder", order, function () {
      console.log("In ONEWAY");
      //If the post request returns an OK remove the old storage and add the order to local storage:
      localStorage.setItem("order", JSON.stringify(order));
      localStorage.removeItem("arrival");
      localStorage.removeItem("departure");
      localStorage.removeItem("outbound");
      localStorage.removeItem("inbound");
      //Reducing the amount of tickets left for the route in the database:
      reduceTicketsLeft(firstRoute);
      //Will redirect to an order confirmation page when thats created:
      window.location.href = "confirmation.html";
    }).fail(function (fail) {
      alert(fail.responseText);
    });
  }
}
