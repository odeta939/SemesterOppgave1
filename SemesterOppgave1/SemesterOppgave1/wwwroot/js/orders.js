$(function(){
    getOrders();
})

GET_ORDERS = "";



function getOrders(){
    $.get(GET_ORDERS, (res) => {
        createTable(res);
    })
}

function createTable(list){
    let str = "<table><thead><tr>" +
        "<th></th>" +
        "</tr></thead>"; 
    str += "<tbody>"
    list.forEach(obj => {
        str += "<td></td>"
    })
    str +="</tbody></table>"
}

customerid
firstname
lastname
address
phone
email

orderid
boatname
route
