let arrival = ""
let departure = "";

$(function () {
    setOrder();
})

function setOrder() {
    if (localStorage.getItem("departure") && localStorage.getItem("arrival")) {
        let departurePlace = localStorage.getItem("departure");
        let arrivalPlace = localStorage.getItem("arrival");

        let out = "Departure place: " + departurePlace + "\n" + "Arrival place: " + arrivalPlace;
        let tripInfo = $("#tripInfo").text(out);
        tripInfo.html(tripInfo.html().replace(/\n/g, '<br/>'))
    }
}
//La til noen tilfeldige verdier i visse felt
function createOrder() {
    let arrivalTerminalStreet = "";
    let arrivalTerminalZipCode = "";
    let departureTerminalStreet = "";
    let departureTerminalZipCode = "";
    let capacity = 0;
    let ticketPrice = 0;

    if (localStorage.getItem("arrival") === "Oslo") {
        arrivalTerminalStreet = "Schweigaards gate 1";
        arrivalTerminalZipCode = "1111";
    } else if (localStorage.getItem("arrival") === "Kobenhavn") {
        arrivalTerminalStreet = "Dampfærgevej 30";
        arrivalTerminalZipCode = "2100";
    } else if (localStorage.getItem("arrival") === "Goteborg") {
        arrivalTerminalStreet = "Danmarksterminalen";
        arrivalTerminalZipCode = "405 19";
    } else if (localStorage.getItem("arrival") === "Kiel-Gaarden") {
        arrivalTerminalStreet = "Kiel kai";
        arrivalTerminalZipCode = "24143";
    }

    if (localStorage.getItem("departure") === "Oslo") {
        departureTerminalStreet = "Schweigaards gate 1";
        departureTerminalZipCode = "1111";
    } else if (localStorage.getItem("departure") === "Kobenhavn") {
        departureTerminalStreet = "Dampfærgevej 30";
        departureTerminalZipCode = "2100";
    } else if (localStorage.getItem("departure") === "Goteborg") {
        departureTerminalStreet = "Danmarksterminalen";
        departureTerminalZipCode = "405 19";
    } else if (localStorage.getItem("departure") === "Kiel-Gaarden") {
        departureTerminalStreet = "Kiel kai";
        departureTerminalZipCode = "24143";
    }

    if ($("#boatName").val() === "Colorline") {
        capacity = 1000;
        ticketPrice = 400;
    } else if ($("#boatName").val() === "Hurtigruten") {
        capacity = 600;
        ticketPrice = 1250;
    } else if ($("#boatName").val() === "DFDS") {
        capacity = 400;
        ticketPrice = 650;
    } else if ($("#boatName").val() === "FjordLine") {
        capacity = 500;
        ticketPrice = 750;
    }

    let ticketAmount = $("#ticketAmount").val();

    const order = {
        ticketAmount: ticketAmount,
        totalPrice: ticketAmount * ticketPrice,
        departureTime: $("#departureTime").val(),
        arrivalTime: $("#arrivalTime").val(),
        boatName: $("#boatName").val(),
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
        window.location.href = "index.html";
    }).fail(function (fail) {
        alert(fail.responseText);
    });
}
