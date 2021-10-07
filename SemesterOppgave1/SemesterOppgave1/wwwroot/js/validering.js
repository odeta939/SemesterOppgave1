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
    styleBorder(true, $("#failPhonenr")[0]);
    return false;
  } else {
    $("#failPhonenr").html("");
    styleBorder(false, $("#failPhonenr")[0]);
    return true;
  }
}

function validateEmail(email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const ok = regex.test(email);
  if (!ok) {
    $("#failEmail").html("Email is invalid");
    styleBorder(true, $("#failEmail")[0]);
    return false;
  } else {
    $("#failEmail").html("");
    styleBorder(false, $("#failEmail")[0]);
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
    styleBorder(true, $("#failZip")[0]);
    return false;
  } else {
    $("#failZip").html("");
    styleBorder(false, $("#failZip")[0]);
    return true;
  }
}

function validateCity(city) {
  return textEntryValidation(city, "#failCity", "City is invalid", 30);
}

function textEntryValidation(toValidate, elemTag, msg, maxChars) {
  let regex;
  const element = $(elemTag)[0];

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
    element.innerText = msg;
    styleBorder(true, element);
    return false;
  } else {
    element.innerText = "";
    styleBorder(false, element);
    return true;
  }
}

function styleBorder(isError, element) {
  let styledBorder;
  if (isError) {
    styledBorder = "var(--font-size-200) solid rgba(var(--accent-500-v), 0.3)";
  } else {
    styledBorder = "var(--font-size-200) solid rgba(var(--blue-300-v), 0.15)";
  }

  const siblings = element.parentElement.children;
  for (e of siblings) {
    if (e.tagName === "INPUT") {
      e.style.borderBottom = styledBorder;
    }
  }
}
