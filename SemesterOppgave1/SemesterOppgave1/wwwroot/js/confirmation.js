$(function () {
    //--- initialise content  ---//
    saveToStorage();

    loadConfirmation()
});

function loadConfirmation() {
    var orderOut = getNewOrderOutbound();
    var orderIn = getNewOrderInbound();
    console.log(orderOut)
    $("#content").append(`<h1 id='congrats'>Thank you ${orderOut.firstname} ${orderOut.lastname}!</h1>`)
  
    $("#content").append("<h2 id='info'>Your order has been registered</h2>")
    $("#content").append(`<div id="dep-info">
                                <h3>Outbound:</h3>
                                    <p><b>Terminal:</b> ${orderOut.departureTerminalName}</p>
                                    <p id="address"><b>Address:</b>
                                                     ${orderOut.departureTerminalStreet}, 
                                                     ${orderOut.departureTerminalZipCode}
                                                     ${orderOut.departureTerminalCity}</p>
                                    <p><b>departure date:</b> ${orderOut.departureTime}</p>
                           </div>`)
    $("#content").append(`<div id="arr-info">
                                <h3>Arrival:</h3>
                                    <p><b>Terminal:</b> ${orderOut.arrivalTerminalName}</p>
                                    <p id="address"><b>Address:</b>
                                                     ${orderOut.arrivalTerminalStreet}, 
                                                     ${orderOut.arrivalTerminalZipCode}
                                                     ${orderOut.arrivalTerminalCity}</p>
                                   <p><b>Arrival date:</b> ${orderOut.arrivalTime}</p>
                           </div>`)

    var orderIn = getNewOrderInbound();
    console.log(Object.keys(orderIn).length)

    if (Object.keys(orderIn).length != 0) {
        $("#content").append(`<div id="dep-info">
                                <h3>Return:</h3>
                                    <p><b>Terminal:</b> ${orderIn.departureTerminalName}</p>
                                    <p id="address"><b>Address:</b>
                                                     ${orderIn.departureTerminalStreet}, 
                                                     ${orderIn.departureTerminalZipCode}
                                                     ${orderIn.departureTerminalCity}</p>
                                    <p><b>departure date:</b> ${orderIn.departureTime}</p>
                           </div>`)
        $("#content").append(`<div id="arr-info">
                                <h3>Arrival:</h3>
                                    <p><b>Terminal:</b> ${orderIn.arrivalTerminalName}</p>
                                    <p id="address"><b>Address:</b>
                                                     ${orderIn.arrivalTerminalStreet}, 
                                                     ${orderIn.arrivalTerminalZipCode}
                                                     ${orderIn.arrivalTerminalCity}</p>
                                   <p><b>Arrival date:</b> ${orderIn.arrivalTime}</p>
                           </div>`)
        $("#content").append(``)
    }
  

}

function getNewOrderOutbound() {
    //--- get the recent order ---//
    var newOrder = JSON.parse(localStorage.getItem("orderOut"))
    return newOrder;
}

function getNewOrderInbound() {
     //--- get the recent order ---//
    var newOrder = JSON.parse(localStorage.getItem("orderIn"))
    return newOrder;
}


//--- helper function to save an order to local storage ---//
function saveToStorage() {
    //create a fake order

    const ticketAmount = 2;
    var orderOut = {
        ticketAmount: ticketAmount,
        totalPrice: ticketAmount * 650,
        // routeId: firstRoute.routeId,
        departureTime: "10-10-2021",
        arrivalTime: "11-10-2021",
        ticketsLeft: 449,
        boatName: "Colorline",
        capacity: 450,
        ticketPrice: 650,
        arrivalTerminalName: "Kiel terminal",
        arrivalTerminalStreet: "Street name 4",
        arrivalTerminalZipCode: "0233",
        arrivalTerminalCity: "Kiel",
        departureTerminalName: "Oslo terminal",
        departureTerminalStreet: "Oslostreet 8",
        departureTerminalZipCode: "0297",
        departureTerminalCity: "Oslo",
        firstname: "John",
        lastname: "Doe",
        phonenr: 73373003,
        email: "test@test.no",
        street: "Doestreeet 10",
        zipCode: 3003,
        city: "Oslo"
    }

    // save fake order to the local storage to simulate the real functionality
    localStorage.setItem("orderOut", JSON.stringify(orderOut))

    var orderIn = {
        ticketAmount: ticketAmount,
        totalPrice: ticketAmount * 650,
        // routeId: firstRoute.routeId,
        departureTime: "13-10-2021",
        arrivalTime: "12-10-2021",
        ticketsLeft: 449,
        boatName: "Colorline",
        capacity: 450,
        ticketPrice: 650,
        arrivalTerminalName: "Oslo terminal", //"Kiel terminal",
        arrivalTerminalStreet: "Oslostreet 8", //"Street name 4",
        arrivalTerminalZipCode: "0297", //"0233",
        arrivalTerminalCity: "Oslo", //"Kiel",
        departureTerminalName: "Kiel terminal", //"Oslo terminal",
        departureTerminalStreet: "Street name 4", //"Oslostreet 8",
        departureTerminalZipCode: "0233", //"0297",
        departureTerminalCity: "Kiel", //"Oslo",
        firstname: "John",
        lastname: "Doe",
        phonenr: 73373003,
        email: "test@test.no",
        street: "Doestreeet 10",
        zipCode: 3003,
        city: "Oslo"
    }
    localStorage.setItem("orderIn", JSON.stringify(orderIn))
}