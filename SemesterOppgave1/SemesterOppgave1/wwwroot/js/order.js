//Variables for the order for a oneway trip
let arrivalTime = "";
let arrivalTerminalStreet = "";
let arrivalTerminalZipCode = "";
let departureTerminalStreet = "";
let departureTerminalZipCode = "";
let capacity = 0;
let ticketPrice = 0;
let ticketsLeft = 0;
let boatName = "";
let firstRoute = {};

let roundtrip = false;

//Variables for the order for a roundtrip
let arrivalTime2 = "";
let arrivalTerminalStreet2 = "";
let arrivalTerminalZipCode2 = "";
let departureTerminalStreet2 = "";
let departureTerminalZipCode2 = "";
let capacity2 = 0;
let ticketPrice2 = 0;
let ticketsLeft2 = 0;
let boatName2 = "";
let roundTripRoute = {};

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

//Function for initializing the variables based on the localStorage values
function getRoutes() {
    $.get("Order/GetAllRoutes", function (routes) {
        for (let route of routes) {
            if (route.arrivalTerminalCity == localStorage.getItem("arrival") && route.departureTerminalCity == localStorage.getItem("departure")
                && route.departureTime == localStorage.getItem("outbound")) {
                arrivalTime = route.arrivalTime;
                arrivalTerminalStreet = route.arrivalTerminalStreet;
                arrivalTerminalZipCode = route.arrivalTerminalZipCode;
                departureTerminalStreet = route.departureTerminalStreet;
                departureTerminalZipCode = route.departureTerminalZipCode;
                capacity = route.boatName.capacity;
                ticketPrice = route.boatName.ticketPrice;
                ticketsLeft = route.ticketsLeft;
                boatName = route.boatName.boatName;
                firstRoute = route;
            }
            if (route.arrivalTerminalCity == localStorage.getItem("departure") && route.departureTerminalCity == localStorage.getItem("arrival")
                && route.departureTime == localStorage.getItem("inbound")) {
                arrivalTime2 = route.arrivalTime;
                arrivalTerminalStreet2 = route.arrivalTerminalStreet;
                arrivalTerminalZipCode2 = route.arrivalTerminalZipCode;
                departureTerminalStreet2 = route.departureTerminalStreet;
                departureTerminalZipCode2 = route.departureTerminalZipCode;
                capacity2 = route.boatName.capacity;
                ticketPrice2 = route.boatName.ticketPrice;
                ticketsLeft2 = route.ticketsLeft;
                boatName2 = route.boatName.boatName;
                roundTripRoute = route;
                roundtrip = true;
            }
        }
    });
}

function reduceTicketsLeft(ticketsLeft, aRoute) {
    aRoute.ticketsLeft = ticketsLeft;

    $.get("Order/EditRoute", aRoute, function () {
        //Do nothing :D
    }).fail(function (fail) {
        alert(fail.responseText);
    });
}

function setOrder() {
    //If it's a one way trip:
    if (localStorage.getItem("departure") && localStorage.getItem("arrival") && localStorage.getItem("outbound") && !localStorage.getItem("inbound")) {
        //Calling getRoutes to initiate the variables for the order - as well as getting the route object to reduce tickets left depending on the ticketamount chosen.
        getRoutes();

        let departurePlace = localStorage.getItem("departure");
        let arrivalPlace = localStorage.getItem("arrival");

        let departureTime = localStorage.getItem("outbound");

        let out = "Departure place: " + departurePlace + "\n" + "Arrival place: " + arrivalPlace + "\n" + "Departure time: " + departureTime + "\n" + "Arrival time: " + arrivalTime + "\n\n" + "You'll be travelling with " + boatName;
        let tripInfo = $("#tripInfo").text(out);
        tripInfo.html(tripInfo.html().replace(/\n/g, '<br/>'));
    }
    //If it's a round trip:
    else if (localStorage.getItem("departure") && localStorage.getItem("arrival") && localStorage.getItem("outbound")) {
        //Calling getRoutes to initiate the variables for the order - as well as getting the route object to reduce tickets left depending on the ticketamount chosen.
        getRoutes();

        let departurePlace = localStorage.getItem("departure");
        let arrivalPlace = localStorage.getItem("arrival");
        let departureTime = localStorage.getItem("outbound");

        let out = "Departure place: " + departurePlace + "\n" + "Arrival place: " + arrivalPlace + "\n" + "Departure time: " + departureTime + "\n" + "Arrival time: " + arrivalTime + "\n\n" + "You'll be travelling with " + boatName + ".";
        let tripInfo = $("#tripInfo").text(out);
        tripInfo.html(tripInfo.html().replace(/\n/g, '<br/>'));

        //Setting the trip info for the round trip (arrivalPlace will be departurePlace and vice versa):
        let departureTime2 = localStorage.getItem("inbound");

        let out2 = "You chose a round trip so your return boat trip will be as shown below: \n\n" + "Departure place: " + arrivalPlace + "\n" + "Arrival place: " + departurePlace + "\n" + "Departure time: " + departureTime2 + "\n" + "Arrival time: " + arrivalTime2 + "\n\n" + "You'll be travelling with " + boatName2 + ".";
        let tripInfo2 = $("#tripInfo2").text(out2);
        tripInfo2.html(tripInfo2.html().replace(/\n/g, '<br/>'));
    }
    //If there are no values in localStorage:
    else {
        $("#orderForm").html("");
        let tripInfo = $("#tripInfo").text("You haven't chosen a trip yet! Go back to the home page. :)");
        $("#tripInfo2").text("");
        tripInfo.html(tripInfo.html().replace(/home page/g, '<a style="text-decoration: none" href="index.html">home page</a>'));
    }
}

function createOrder() {   
    let ticketAmount = $("#ticketAmount").val();
    
    if (roundtrip) {
        //Reducing the amount of tickets left for a round trip:
        if (ticketsLeft >= ticketAmount) {
            ticketsLeft -= ticketAmount;
        } else {
            alert("There are not that many tickets left for this route!");
            return;
        }

        if (ticketsLeft2 >= ticketAmount) {
            ticketsLeft2 -= ticketAmount;
        } else {
            alert("There are not that many tickets left for this route!");
            return;
        }

        const order = {
            ticketAmount: ticketAmount,
            totalPrice: ticketAmount * ticketPrice,
            departureTime: localStorage.getItem("outbound"),
            arrivalTime: arrivalTime,
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

        const order2 = {
            ticketAmount: ticketAmount,
            totalPrice: ticketAmount * ticketPrice2,
            departureTime: localStorage.getItem("inbound"),
            arrivalTime: arrivalTime2,
            ticketsLeft: ticketsLeft2,
            boatName: boatName2,
            capacity: capacity2,
            ticketPrice: ticketPrice2,
            arrivalTerminalName: localStorage.getItem("departure"),
            arrivalTerminalStreet: arrivalTerminalStreet2,
            arrivalTerminalZipCode: arrivalTerminalZipCode2,
            arrivalTerminalCity: localStorage.getItem("departure"),
            departureTerminalName: localStorage.getItem("arrival"),
            departureTerminalStreet: departureTerminalStreet2,
            departureTerminalZipCode: departureTerminalZipCode2,
            departureTerminalCity: localStorage.getItem("arrival"),
            firstname: $("#firstName").val(),
            lastname: $("#lastName").val(),
            phonenr: $("#phoneNr").val(),
            email: $("#email").val(),
            street: $("#streetName").val(),
            zipCode: $("#zipCode").val(),
            city: $("#cityName").val()
        };

        $.post("Order/SaveOrder", order, function () {
            //If the post request returns an OK remove the old storage and add the order to local storage:
            localStorage.setItem("order", JSON.stringify(order));
            localStorage.removeItem("arrival");
            localStorage.removeItem("departure");
            localStorage.removeItem("outbound");
            localStorage.removeItem("inbound");
            //Reducing the amount of tickets left for the route in the database:
            reduceTicketsLeft(ticketsLeft, firstRoute);
            //Will redirect to an order confirmation page when thats created:
            window.location.href = "index.html";
        }).fail(function (fail) {
            alert(fail.responseText);
        });

        $.post("Order/SaveOrder", order2, function () {
            //If the post request returns an OK remove the old storage and add the second order to local storage:
            localStorage.setItem("order2", JSON.stringify(order2));
            localStorage.removeItem("arrival");
            localStorage.removeItem("departure");
            localStorage.removeItem("outbound");
            localStorage.removeItem("inbound");
            //Reducing the amount of tickets left for the roundtrip route in the database:
            reduceTicketsLeft(ticketsLeft2, roundTripRoute);
            //Will redirect to an order confirmation page when thats created:
            window.location.href = "index.html";
        }).fail(function (fail) {
            alert(fail.responseText);
        });
    } else {
        //Reducing the amount of tickets for a one way trip:
        if (ticketsLeft >= ticketAmount) {
            ticketsLeft -= ticketAmount;
        } else {
            alert("There are not that many tickets left for this route!");
            return;
        }

        const order = {
            ticketAmount: ticketAmount,
            totalPrice: ticketAmount * ticketPrice,
            departureTime: localStorage.getItem("outbound"),
            arrivalTime: arrivalTime,
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

        $.post("Order/SaveOrder", order, function () {
            //If the post request returns an OK remove the old storage and add the order to local storage:
            localStorage.setItem("order", JSON.stringify(order));
            localStorage.removeItem("arrival");
            localStorage.removeItem("departure");
            localStorage.removeItem("outbound");
            localStorage.removeItem("inbound");
            //Reducing the amount of tickets left for the route in the database:
            reduceTicketsLeft(ticketsLeft, firstRoute);
            //Will redirect to an order confirmation page when thats created:
            window.location.href = "index.html";
        }).fail(function (fail) {
            alert(fail.responseText);
        });
    }
}
