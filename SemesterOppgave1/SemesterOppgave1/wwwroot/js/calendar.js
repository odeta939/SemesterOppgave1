/*
 * https://github.com/beinoriusju/TavoCalendar
 * documentation for the calendar
 * 
 * */


$(function () {
    getDepartureDates()
    getTerminals()
    let myCalendar = new TavoCalendar('#my-calendar', options)
});

function getDepartureDates() {
    $.get("order/GetAllCustomers", function (customers) {
        //get departure time for each route
        console.log(customers)
    });


    //save departure times
    let departureTimes = []
    //get all routes
    $.get("order/GetAllRoutes", function (routes) {
        //get departure time for each route
        console.log(routes)
        $.each(routes, function (index, value) {
            //add the time to array
            
            departureTimes.push(value.departureTime)
        });
    }).then(() => {
        available(departureTimes)
    });
    return departureTimes
}

function getTerminals() {
    let departure = []
    //get all terminals
    $.get("order/getAllTerminals", function (terminals) {
        console.log(terminals)
       /* $.each(terminals, function (index, value) {
            departure.push(value)
        });*/
    });


}

var options = {
    format: 'DD-MM-YYYY',
    highlight: ['12-10-2021'],
    blacklist: ['14-10-2021']
}

function available(dates) {
    console.log( dates)
    $.each(dates, function (index, value) {
        options.highlight.push(value)
    });
}

//filter out the routes!!!