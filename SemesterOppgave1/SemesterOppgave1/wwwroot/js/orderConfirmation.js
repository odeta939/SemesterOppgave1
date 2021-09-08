$(document).ready(function () {
    $("#buyTicket").click(function () {
        $("#popUp").css("display", "block");
    });
    $("#popUp-content-close").click(function () {
        $("#popUp").css("display", "none");
    });

    $(window).click(function (element) {
        if (element.target.id == "popUp") {
            $("#popUp").css("display", "none");
        }
        //alert(e.target.id); // gives the element's ID 
        //alert(e.target.className); // gives the elements class(es)
    });

});