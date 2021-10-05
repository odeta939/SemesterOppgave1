$(function () {
    getAll();
});

function getAll() {
    $.get("order/GetAllRoutes", function ( routes) {
        console.log(routes)
    });
    $.get("order/GetAllOrders", function (orders) {
        console.log(orders)
    });
    $.get("order/GetAllCustomers", function (customers) {
        console.log(customers);
    });
    $.get("order/GetAllTerminals", function (terminals) {
        console.log(terminals);
    });
    $.get("order/GetAllBoats", function (boats) {
        console.log(boats);
    });
}


