$(function () {
    getCustomers();
    //getIndex();
});

function getCustomers() {
    $.get("order/getAllRoutes", function ( routes) {
        //skrivUt();
        console.log(routes)
    });
    $.get("order/getAllOrders", function (orders) {
        //skrivUt();
        console.log(orders)
    });
}
/*
function skrivUt(customers) {
    for (let customer of customers) {
        console.log(customer.firstname);
        console.log(customer.lastname);
    }
}*/


