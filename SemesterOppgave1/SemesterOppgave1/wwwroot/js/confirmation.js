$(function () {
    loadConfirmation()
});

function loadConfirmation() {
    var orderOut = getNewOrderOutbound();
    if (localStorage.getItem("order")) {
        $("#content").append(`<h1 id='congrats'>Thank you ${orderOut.firstname} ${orderOut.lastname}!</h1>`);
        $("#content").append("<h2 id='info'>Your order has been registered</h2>");
        $("#content").append(`<div id="dep-info">
                                        <h3>Outbound:</h3>
                                            <p><b>Departure</b></p>
                                            <p><b>Terminal:</b> ${orderOut.departureTerminalName}</p>
                                            <p id="address"><b>Address:</b>
                                                             ${orderOut.departureTerminalStreet}, 
                                                             ${orderOut.departureTerminalZipCode}
                                                             ${orderOut.departureTerminalCity}</p>
                                            <p><b>Departure date:</b> ${orderOut.departureTime}</p>
                                   </div>`);
        $("#content").append(`<div id="arr-info">
                                        <p><b>Arrival</b></p>
                                            <p><b>Terminal:</b> ${orderOut.arrivalTerminalName}</p>
                                            <p id="address"><b>Address:</b>
                                                             ${orderOut.arrivalTerminalStreet}, 
                                                             ${orderOut.arrivalTerminalZipCode}
                                                             ${orderOut.arrivalTerminalCity}</p>
                                           <p><b>Arrival date:</b> ${orderOut.arrivalTime}</p>
                                   </div>`);
    } else {
        $("#content").append(`<h1>You havent ordered anything yet!</h1>`);
    }
    

    var orderIn = getNewOrderInbound();
    if (localStorage.getItem("order2")) {
        $("#return-content").append(`<div id="dep-info">
                                <h3>Inbound:</h3>
                                    <p><b>Departure</b></p>
                                    <p><b>Terminal:</b> ${orderIn.departureTerminalName}</p>
                                    <p id="address"><b>Address:</b>
                                                     ${orderIn.departureTerminalStreet}, 
                                                     ${orderIn.departureTerminalZipCode}
                                                     ${orderIn.departureTerminalCity}</p>
                                    <p><b>Departure date:</b> ${orderIn.departureTime}</p>
                           </div>`);
        $("#return-content").append(`<div id="arr-info">
                                <p><b>Arrival</b></p>
                                    <p><b>Terminal:</b> ${orderIn.arrivalTerminalName}</p>
                                    <p id="address"><b>Address:</b>
                                                     ${orderIn.arrivalTerminalStreet}, 
                                                     ${orderIn.arrivalTerminalZipCode}
                                                     ${orderIn.arrivalTerminalCity}</p>
                                   <p><b>Arrival date:</b> ${orderIn.arrivalTime}</p>
                           </div>`);
    }
  

}

function getNewOrderOutbound() {
    //Get the outbound order
    var newOrder = JSON.parse(localStorage.getItem("order"));
    return newOrder;
}

function getNewOrderInbound() {
    //Get the inbound order
    var newOrder = JSON.parse(localStorage.getItem("order2"));
    return newOrder;
}