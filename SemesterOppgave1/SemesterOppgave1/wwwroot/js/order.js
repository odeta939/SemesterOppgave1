let arrivalTerminalStreet = "";
let arrivalTerminalZipCode = "";
let departureTerminalStreet = "";
let departureTerminalZipCode = "";
let capacity = 0;
let ticketPrice = 0;
let ticketsLeft = 0;
let boatName = "";
let ourRoute = {};

$(function () {
    setOrder();
})

function validateAndOrder() {
    var firstnameOK = validateFirstname($("#firstName").val());
    var lastnameOK = validateLastname($("#lastName").val());
    var phonenrOK = validatePhonenr($("#phoneNr").val());
    var emailOK = validateEmail($("#email").val());
    var streetOK = validateStreet($("#streetName").val());
    var zipOK = validateZipcode($("#zipCode").val());
    var cityOK = validateCity($("#cityName").val());
    var ticketAmountOK = validateTicketAmount($("#ticketAmount").val());

    if (firstnameOK && lastnameOK && phonenrOK && emailOK &&
        streetOK && zipOK && cityOK && ticketAmountOK) {
        createOrder();
    }
}

function getRoutes() {
    $.get("Order/GetAllRoutes", function (routes) {
        for (let route of routes) {
            if (route.arrivalTerminalCity == localStorage.getItem("arrival") && route.departureTerminalCity == localStorage.getItem("departure")
                && route.arrivalTime == localStorage.getItem("inbound") && route.departureTime == localStorage.getItem("outbound")) {
                arrivalTerminalStreet = route.arrivalTerminalStreet;
                arrivalTerminalZipCode = route.arrivalTerminalZipCode;
                departureTerminalStreet = route.departureTerminalStreet;
                departureTerminalZipCode = route.departureTerminalZipCode;
                capacity = route.boatName.capacity;
                ticketPrice = route.boatName.ticketPrice;
                ticketsLeft = route.ticketsLeft;
                boatName = route.boatName.boatName;
                ourRoute = route;
            }
        }
    });
}

function reduceTicketsLeft(ticketsLeft) {
    ourRoute.ticketsLeft = ticketsLeft;

    $.get("Order/EditRoute", ourRoute, function () {
        //Do nothing :D
    }).fail(function (fail) {
        alert(fail.responseText);
    });
}

function setOrder() {
    //----- set the date in index too and bring it to the order page maybe? ----//
    if (localStorage.getItem("departure") && localStorage.getItem("arrival") && localStorage.getItem("outbound") && localStorage.getItem("inbound")) {
        //Calling getRoutes to initiate the variables for the order - as well as getting the route object to reduce tickets left depending on the ticketamount chosen.
        getRoutes();

        let departurePlace = localStorage.getItem("departure");
        let arrivalPlace = localStorage.getItem("arrival");

        let departureTime = localStorage.getItem("outbound");
        let arrivalTime = localStorage.getItem("inbound");

        let out = "Departure place: " + departurePlace + "\n" + "Arrival place: " + arrivalPlace + "\n" + "Departure time: " + departureTime + "\n" + "Arrival time: " + arrivalTime + "\n\n" + "You'll be travelling with " + boatName;
        let tripInfo = $("#tripInfo").text(out);
        tripInfo.html(tripInfo.html().replace(/\n/g, '<br/>'));        
    } else {
        $("#orderForm").html("");
        let tripInfo = $("#tripInfo").text("You haven't chosen a trip yet! Go back to the home page. :)");
        tripInfo.html(tripInfo.html().replace(/home page/g, '<a style="text-decoration: none" href="index.html">home page</a>'));
    }
}

function createOrder() {   
    let ticketAmount = $("#ticketAmount").val();

    if (ticketsLeft >= ticketAmount) {
        ticketsLeft -= ticketAmount;
    } else {
        alert("There are not that many tickets left for this route!");
        return;
    }
    
    //Creating the order based on the order.cs model
    const order = {
        ticketAmount: ticketAmount,
        totalPrice: ticketAmount * ticketPrice,
        departureTime: localStorage.getItem("outbound"),
        arrivalTime: localStorage.getItem("inbound"),
        ticketsLeft: ticketsLeft,
        boatName: boatName,
        capacity: capacity,
        ticketPrice: ticketPrice,
        arrivalTerminalName: localStorage.getItem("arrival"),
        arrivalTerminalStreet: arrivalTerminalStreet,
        arrivalTerminalZipCode: arrivalTerminalZipCode,
        arrivalTerminalCity: localStorage.getItem("arrival"),
        departureTerminalName: localStorage.getItem("departure"),
        departureTerminalStreet: departureTerminalStreet,
        departureTerminalZipCode: departureTerminalZipCode,
        departureTerminalCity: localStorage.getItem("departure"),
        firstname: $("#firstName").val(),
        lastname: $("#lastName").val(),
        phonenr: $("#phoneNr").val(),
        email: $("#email").val(),
        street: $("#streetName").val(),
        zipCode: $("#zipCode").val(),
        city: $("#cityName").val()
    };

    $.post("Order/SaveOrder", order, function() {
        //If the post request returns an OK remove the old storage and add the order to local storage:
        localStorage.setItem("order", JSON.stringify(order));
        localStorage.removeItem("arrival");
        localStorage.removeItem("departure");
        localStorage.removeItem("outbound");
        localStorage.removeItem("inbound");
        //Reducing the amount of tickets left for the route in the database:
        reduceTicketsLeft(ticketsLeft);
        //Will redirect to an order confirmation page when thats created:
        window.location.href = "index.html";
    }).fail(function (fail) {
        alert(fail.responseText);
    });
}
