$(function () {
    getCustomers();
    //getIndex();
});

function getCustomers() {
    $.get("order/GetAllRoutes", function ( routes) {
        //skrivUt();
        console.log(routes)
    });
    $.get("order/GetAllOrders", function (orders) {
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


