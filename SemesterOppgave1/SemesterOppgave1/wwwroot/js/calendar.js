/*
 * https://github.com/beinoriusju/TavoCalendar
 * documentation for the calendar
 * 
 * */


$(function () {

    getDepartureDates()
   
    let myCalendar = new TavoCalendar('#my-calendar', options)
   
    
});

function getDepartureDates() {
    //save departure times
    let departureTimes = []
    //get all routes
    $.get("order/GetAllRoutes", function (routes) {
        //get departure time for each route
        $.each(routes, function (index, value) {
            //add the time to array
            
            departureTimes.push(value.departureTime)
        });
    }).then(() => {
        available(departureTimes)
    });
    return departureTimes
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