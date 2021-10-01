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

async function createOrder() {
    const order = {
        //Add the orders input fields here :D
    };
    $.post("Order/SaveOrder", order, function() {
        //If the post request returns an OK we do this:
        localStorage.removeItem("arrival");
        localStorage.removeItem("departure");
        window.location.href = "somepage.html";
    }).fail(function (fail) {
        alert(fail.responseText);
    });
}
