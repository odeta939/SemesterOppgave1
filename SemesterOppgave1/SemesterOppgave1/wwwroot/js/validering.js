function validateFirstname(firstname) {
    const regex = /^[a-zA-ZæøåÆØÅ\.\ \-]{2,20}$/;
    const ok = regex.test(firstname);
    if (!ok) {
        $("#failFirstname").html("First name is invalid");
        return false;
    }
    else {
        $("#failFirstname").html("");
        return true;
    }
}

function validateLastname(lastname) {
    const regex = /^[a-zA-ZæøåÆØÅ\.\ \-]{2,20}$/;
    const ok = regex.test(lastname);
    if (!ok) {
        $("#failLastname").html("Last name is invalid");
        return false;
    }
    else {
        $("#failLastname").html("");
        return true;
    }
}

function validatePhonenr(phonenr) {
    const regex = /^^(\+47)?[2-9][0-9]{7}$/;
    const ok = regex.test(phonenr);
    if (!ok) {
        $("#failPhonenr").html("Phone number is invalid");
        return false;
    }
    else {
        $("#failPhonenr").html("");
        return true;
    }

}

function validateEmail(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const ok = regex.test(email);
    if (!ok) {
        $("#failEmail").html("Email is invalid");
        return false;
    }
    else {
        $("#failEmail").html("");
        return true;
    }
}

function validateStreet(street) {
    const regex = /^[0-9a-zA-ZøæåØÆÅ. \-]{2,50}$/
    const ok = regex.test(street);
    if (!ok) {
        $("#failStreet").html("Street name is invalid");
        return false;
    }
    else {
        $("#failStreet").html("");
        return true;
    }
}
/^\d{4}$/
function validateZipcode(zip) {
    const regex = /^\d{4}$/
    const ok = regex.test(zip);
    if (!ok) {
        $("#failZip").html("Zip code is invalid");
        return false;
    }
    else {
        $("#failZip").html("");
        return true;
    }
}

function validateCity(city) {
    const regex = /^[0-9a-zA-ZøæåØÆÅ. \-]{2,30}$/
    const ok = regex.test(city);
    if (!ok) {
        $("#failCity").html("City is invalid");
        return false;
    }
    else {
        $("#failCity").html("");
        return true;
    }
}

function validateTicketAmount(ticketAmount) {
    const regex = /^[1-9]{1}[0-9]{0,3}$/
    const ok = regex.test(ticketAmount);
    if (!ok) {
        $("#failTicketAmount").html("Ticket amount is invalid");
        return false;
    } else {
        $("#failTicketAmount").html("");
        return true;
    }
}