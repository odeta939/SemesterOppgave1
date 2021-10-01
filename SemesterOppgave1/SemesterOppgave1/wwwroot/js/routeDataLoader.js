﻿let toList = []
let fromList = []

$(function () {
    getDeparturePlaces();

    $("#fromPlace").on('change', function () {
        setToPlaces();
    });
});

function getDeparturePlaces() {
    $.get("order/GetAllRoutes", function (routes) {
        initialPlaces(routes);
    });
}

function setToPlaces() {
    $.get("order/GetAllRoutes", function (routes) {
        AddOptionsToTo(routes);
    });
}

function initialPlaces(routes) {
    for (let route of routes) {
        let arrivalCity = route.arrivalTerminalCity
        let departureCity = route.departureTerminalCity
        if (toList.indexOf(arrivalCity) == -1) {
            toList.push(arrivalCity)
            $("#fromPlace").append($('<option>', {
                value: arrivalCity,
                text: arrivalCity
            }));
        } else if (toList.indexOf(departureCity) == -1) {
            toList.push(departureCity)
            $("#fromPlace").append($('<option>', {
                value: departureCity,
                text: departureCity
            }));
        }
    }
}

function AddOptionsToTo(routes) {
    fromList = []
    $("#toPlace").empty()
    let selectedCity = $("#fromPlace").children("option:selected").val();
    for (let route of routes) {
        if (route.departureTerminalCity == selectedCity) {
            let arrivalCity = route.arrivalTerminalCity
            if (fromList.indexOf(arrivalCity) == -1) {
                fromList.push(arrivalCity)
                $("#toPlace").append($('<option>', {
                    value: arrivalCity,
                    text: arrivalCity
                }));
            }
        }
    }
}

//Adding departure and arrival place to localstorage to retrieve them in another file!
function orderTickets() {
    console.log($("#fromPlace").val());
    console.log($("#toPlace").val());
    
    if (($("#toPlace").val() === null) || ($("#fromPlace").val() === null)) {
        alert("Select both a departure city and a destination!");
    } else {
        let departurePlace = $("#fromPlace").children("option:selected").text();
        let arrivalPlace = $("#toPlace").children("option:selected").text();
        localStorage.setItem("departure", departurePlace);
        localStorage.setItem("arrival", arrivalPlace);
        window.location.href = "order.html";
    }
    
}