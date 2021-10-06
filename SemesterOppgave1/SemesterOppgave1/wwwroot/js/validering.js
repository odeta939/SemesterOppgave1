function validateFirstname(firstname) {
  return textEntryValidation(
    firstname,
    "#failFirstname",
    "First name is invalid",
    20
  );
}

function validateLastname(lastname) {
  return textEntryValidation(
    lastname,
    "#failLastname",
    "Last name is invalid",
    20
  );
}

function validatePhonenr(phonenr) {
  const regex = /^^(\+47)?[2-9][0-9]{7}$/;
  const ok = regex.test(phonenr);
  if (!ok) {
    $("#failPhonenr").html("Phone number is invalid");
    return false;
  } else {
    $("#failPhonenr").html("");
    return true;
  }
}

function validateEmail(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const ok = regex.test(email);
  if (!ok) {
    $("#failEmail").html("Email is invalid");
    return false;
  } else {
    $("#failEmail").html("");
    return true;
  }
}

function validateStreet(street) {
  return textEntryValidation(
    street,
    "#failStreet",
    "Street name is invalid",
    50
  );
}
/^\d{4}$/;
function validateZipcode(zip) {
  const regex = /^\d{4}$/;
  const ok = regex.test(zip);
  if (!ok) {
    $("#failZip").html("Zip code is invalid");
    return false;
  } else {
    $("#failZip").html("");
    return true;
  }
}

function validateCity(city) {
  return textEntryValidation(city, "#failCity", "City is invalid", 30);
}

function textEntryValidation(toValidate, elemTag, msg, maxChars) {
  let regex;
  switch (maxChars) {
    case 30:
      regex = /^[0-9a-zA-ZøæåØÆÅ. \-]{2,30}$/;
      break;
    case 50:
      regex = /^[0-9a-zA-ZøæåØÆÅ. \-]{2,50}$/;
      break;
    default:
      regex = /^[0-9a-zA-ZøæåØÆÅ. \-]{2,20}$/;
      break;
  }
  const ok = regex.test(toValidate);
  if (!ok) {
    $(elemTag).html(msg);
    return false;
  } else {
    $(elemTag).html("");
    return true;
  }
}
