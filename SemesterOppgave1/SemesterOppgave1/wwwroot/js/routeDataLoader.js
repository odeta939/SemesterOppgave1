$(function () {
    const selectTo = $("#toPlace");
    const arrayPlaces = getDeparturePlaces();
    console.log(arrayPlaces);
    console.log(arrayPlaces[0])

    for (var i = 0; i < arrayPlaces.length; i++) {
        console.log(arrayPlaces[i])
    }


    /*arrayPlaces.each(function (place) {
        console.log(place);

    });*/



    /*
    selectTo.append($('<option>', {
        value: "Oslo",
        text: "Oslo"
    }));
    selectTo.append($('<option>', {
        value: "Kiel",
        text: "Kiel"
    }));
    selectTo.append($('<option>', {
        value: "Koben",
        text: "Koben"
    }));
    selectTo.append($('<option>', {
        value: "Gøteborg",
        text: "Gøteborg"
    }));*/


    const selectFrom = $("fromPlace");



});


function getDeparturePlaces() {

    //save departure times
    const departurePlaces = []
    //get all routes
    $.get("order/GetAllRoutes", function (routes) {
        //get departure time for each route
        $.each(routes, function (index, value) {
            const place = value.departureTerminalCity;

            if (departurePlaces.indexOf(place) == -1) {
                departurePlaces.push(place)
            }
        });
    });
    return departurePlaces
}