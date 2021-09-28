$(function () {
    getCustomers();
    //getIndex();
});

function getCustomers() {
    $.get("order/getAllCustomers", function (customers) {
        skrivUt(customers);
        console.log(customers)
    });
}

function skrivUt(customers) {
    for (let customer of customers) {
        console.log(customer.FirstName);
    }
}

function getIndex() {
    $.get("order/index", function (text) {
        console.log(text);
    });
}
