/**
 * Validates the first name
 * @param {any} firstname Customers first name
 */
function validateFirstname(firstname) {
  return textEntryValidation(
    firstname,
    "#failFirstname",
    "First name is invalid",
    20
  );
}

/**
 * Validates the last name
 * @param {any} lastname Customers last name
 */
function validateLastname(lastname) {
  return textEntryValidation(
    lastname,
    "#failLastname",
    "Last name is invalid",
    30
  );
}

/**
 * Validates the phone number
 * @param {any} phonenr Customers phone number
 */
function validatePhonenr(phonenr) {
  //Only norwegian phone numbers usable for the customer
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

/**
 * Validates the email address
 * @param {any} email Customers email address
 */
function validateEmail(email) {
  const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;
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

/**
 * Validates the street name
 * @param {any} street Customers street name
 */
function validateStreet(street) {
  return textEntryValidation(
    street,
    "#failStreet",
    "Street name is invalid",
    50
  );
}

/**
 * Validates the zip code
 * @param {any} zip Customers zip code
 */
function validateZipcode(zip) {
  const regex = /^[1-9][0-9]{4}|[0-9]{4}|[1-9]{1}[0-9]{2}( )[0-9]{2}$/;
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

/**
 * Validates the city
 * @param {any} city Customers city name
 */
function validateCity(city) {
  return textEntryValidation(city, "#failCity", "City is invalid", 30);
}

/**
 * Handles all of the validation of text with similar regex patterns
 * @param {any} toValidate The variable that is about to be validated
 * @param {any} elemTag The tag of the span element to be edited based on the validation
 * @param {any} msg The message if the input isnt valid
 * @param {any} maxChars The maximum amount of characters for the text that is being validated
 */
function textEntryValidation(toValidate, elemTag, msg, maxChars) {
  let regex;
  const element = $(elemTag)[0];
  //Based on the maxChars, the regex is created
  switch (maxChars) {
    case 20:
      regex = /^[a-zA-ZøæåØÆÅ. \-]{2,20}$/;
      break;
    case 30:
      regex = /^[a-zA-ZøæåØÆÅ. \-]{2,30}$/;
      break;
    case 50:
      regex = /^[0-9a-zA-ZøæåØÆÅ. \-]{2,50}$/;
      break;
    default:
      regex = /^[a-zA-ZøæåØÆÅ. \-]{2,20}$/;
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

/**
 * Styles the border of the span element for error handling
 * @param {any} isError Boolean, if there is an error with validation
 * @param {any} element The span element that is being styled
 */
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
