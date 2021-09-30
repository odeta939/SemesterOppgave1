$(function () {
    let d = new Date();
    let today = d.getDay() + "-" + d.getMonth() + "-" + d.getFullYear();
   // console.log(today)
    let myCalendar = new TavoCalendar('#my-calendar', options)
    available()
    
   // console.log(getDepartureDates())
});

function getDepartureDates() {
    //save departure times
    const departureTimes = []
    //get all routes
    $.get("order/GetAllRoutes", function (routes) {
        //get departure time for each route
        $.each(routes, function (index, value) {
            //add the time to array
        departureTimes.push(value.departureTime)
        });
    });

    return departureTimes
}

var options = {
    format: 'DD-MM-YYYY',
    highlight: ['12-10-2021']
   
}
function available() {
    //get all departure dates
    const dates = getDepartureDates()

    for (var i = 0; i < dates.length; i++) {
        options.highlight.push(dates[i])
        console.log(i)

    }
   /* $.each(dates, function (index, value) {
        
    });*/
};