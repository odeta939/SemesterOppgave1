// List of departure and arrival destinations (later populated)
let toList = [];
let fromList = [];

$(function () {
  localStorage.clear();

  //Test if browser supports Web components
  const proceed = supportWarning();

  //If supported, proceed
  if (proceed) {
    addPassengerNrs(); //Adding the amount of passengers to passengers

    getDeparturePlaces(); //Loading all the routes under from

    // Handle reloading edge cases
    enableTo();
    enableDate();

    // Adds onchange handler to fromPlace dropdown
    $("#fromPlace").on("change", function () {
      enableTo(); //Since the user has selected a from destination when can make to destination active
      removeCalendar(); //If there was a calendar showing it means that the user has change its route and the calendar need to be deleted since it is not accurat anymore
      let departurePlace = $("#fromPlace").children("option:selected").text();
      localStorage.setItem("departure", departurePlace); //Departure place get stored into local storage
    });

    // Adds onchange handler to toPlace dropdown
    $("#toPlace").on("change", function () {
      enableDate(); //Both routes are selected so now we can enable the calendar
      removeCalendar(); //If the calendar is showing we remove it since the route has hanged
      let arrivalPlace = $("#toPlace").children("option:selected").text();
      localStorage.setItem("arrival", arrivalPlace); //Arrival place get stored into local storage
    });

    // Adds onchange handler to passengers dropdown
    $("#passengers").on("change", function () {
      removeCalendar(); //Number of passengers has changed and therefor the routesavaliability might have changed as well, we remove it
      localStorage.setItem(
        //Every time the amount of passengers is changed we save it
        "ticketAmount",
        $("#passengers").children("option:selected").text()
      );
      $("#orderbox-params-when-btn > p").text("Select date"); //feedback to user
    });

    // Adds onchange handler to one-way/round-trip radio buttons
    $('input[type="radio"]').on("click change", function (e) {
      //one way vs round trip has been changed so we need to reset the calendar
      $("#orderbox-params-when-btn > p").text("Select date"); //feedback to user
      removeCalendar();
    });
  }
});

/**
 * Checks that browser supports web components. If not, replaces page with warning
 * Despite being in the web standards, IE does not support it (age reasons) and
 * Safari (webkit) chose not to support custom elements
 */
function supportWarning() {
  // Checks for support of versions 0 and 1 of custom elements
  const supportsCustomElementsv0 = "registerElement" in document;
  const supportsCustomElementsv1 = "customElements" in window;

  // If not supported, replaces body with warning message
  if (!supportsCustomElementsv0 && !supportsCustomElementsv1) {
    const main = document.getElementsByTagName("body")[0];
    main.innerHTML = "";

    const div = document.createElement("div");
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.background = "#293241";
    div.style.color = "#e0fbfc";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.textAlign = "center";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    main.appendChild(div);

    const h1 = document.createElement("h1");
    h1.innerText = "Your browser does not support custom elements";
    div.appendChild(h1);

    const p = document.createElement("p");
    p.innerHTML =
      "This website uses Web Components, which your browser does not support. <br> Are you using <strong>Safari</strong> or <strong>Internet Explorer</strong>? <br> Try using Firefox or a Chromium-based browser instead.";
    div.appendChild(p);

    return false;
  }

  return true;
}

/**
 * Adds data to the "Passengers" dropdown
 */
function addPassengerNrs() {
  // Adding options 1-99 under passengers
  for (let i = 1; i < 100; i++) {
    $("#passengers").append(
      $("<option>", {
        value: i,
        text: i,
      })
    );
  }
  localStorage.setItem(
    //Save selected default passenger number to local storage
    "ticketAmount",
    $("#passengers").children("option:selected").text()
  );
}

/**
 * Calls initialPlaces with routes from GetAllRoutes
 */
function getDeparturePlaces() {
  $.get("order/GetAllRoutes", function (routes) {
    //Gets all routes from database
    initialPlaces(routes);
  });
}

/**
 * Enables toPlace dropdown
 */
function enableTo() {
  const from = $('select[name="from"]')[0].value;
  const to = $("#toPlace")[0];

  // Ensure a departure location has been chosen
  if (from !== "noPlace" && from !== "") {
    to.removeAttribute("disabled");
    setToPlaces(); // Load and display destinations
  } else {
    // Ensures destinations are disabled if no departure location chosen
    to.setAttribute("disabled", true);
  }
}

/**
 * Enable date-picking
 */
function enableDate() {
  const date = $("#orderbox-params-when-btn")[0];
  const to = $('select[name="to"]')[0].value;

  //Check if destination has been chosen
  if (to !== "noPlace" && to !== "") {
    date.removeAttribute("disabled");
  } else {
    // Ensures destinations are disabled if no departure location chosen
    addPlaceholder("Select destination", "#toPlace");
    date.setAttribute("disabled", true);
  }
}

/**
 * Calls AddOptionsToTo with routes retrieved from the GetAllRoutes request
 */
function setToPlaces() {
  $.get("order/GetAllRoutes", function (routes) {
    AddOptionsToTo(routes);
  });
}

/**
 * Populates fromPlace dropdown
 * @param {any} routes  All routes, taken from the GetAllRoutes request
 */
function initialPlaces(routes) {
  addPlaceholder("Select origin", "#fromPlace");

  for (let route of routes) {
    let departureCity = route.departureTerminalCity;
    if (toList.indexOf(departureCity) == -1) {
      //If the departure city is not found we add it to the list
      toList.push(departureCity);
      $("#fromPlace").append(
        //Add option for the place
        $("<option>", {
          value: departureCity,
          text: departureCity,
        })
      );
    }
  }
}

/**
 * Populates toPlace dropdown, based on the selected fromPlace
 * @param {any} routes All routes, taken from the GetAllRoutes request
 */
function AddOptionsToTo(routes) {
  fromList = [];
  $("#toPlace").empty();
  let selectedCity = $("#fromPlace").children("option:selected").val();

  addPlaceholder("Select destination", "#toPlace");

  for (let route of routes) {
    if (route.departureTerminalCity == selectedCity) {
      //Compare departure city with selected city
      let arrivalCity = route.arrivalTerminalCity;
      if (fromList.indexOf(arrivalCity) == -1) {
        //If not in the list, add it as an option
        fromList.push(arrivalCity);
        $("#toPlace").append(
          $("<option>", {
            value: arrivalCity,
            text: arrivalCity,
          })
        );
      }
    }
  }
}

/**
 * Adds placeholder to option (edge-case handling)
 * @param {any} text    Text of the select option
 * @param {any} parent  Parent of the select option
 */
function addPlaceholder(text, parent) {
  const option = document.createElement("option");
  option.value = "noPlace";
  option.setAttribute("disabled", true);
  option.setAttribute("selected", true);
  option.setAttribute("hidden", true);
  option.innerText = text;
  $(parent).append(option);
}

/**
 * Validates input, if all fields are populated
 * Does not validate ticketAmount, which is checked when loading the calendar
 */
function orderTickets() {
  //If one-way trip, inbound variable has to be stored in localstorage
  let roundway = $('input[name="nrTrips"]:checked').val();

  //Only proceed if values are set
  if (
    $("#toPlace").val() === null ||
    $("#fromPlace").val() === null ||
    !localStorage.getItem("outbound")
  ) {
    customAlert(
      "Select a departure city, a destination and a date!",
      "Error buying ticket"
    );
  } else {
    //If its a round way trip
    if (roundway == "roundtrip") {
      if (localStorage.getItem("inbound")) {
        let outbound = localStorage.getItem("outbound");
        let outboundArr = outbound.split("-");
        let outboundDate = new Date(
          outboundArr[2],
          outboundArr[1],
          outboundArr[0]
        ); //converting string into date

        let inbound = localStorage.getItem("inbound");
        let inboundArr = inbound.split("-");
        let inboundDate = new Date(inboundArr[2], inboundArr[1], inboundArr[0]); //converting string into date

        if (inboundDate < outboundDate) {
          customAlert(
            "Your return trip is before your first trip! Choose a new date for your inbound (return) trip.",
            "Error with date"
          );
        } else {
          window.location.href = "order.html";
        }
      } else {
        customAlert(
          "You chose a roundway trip but you didnt choose an inbound date!",
          "Error buying ticket"
        );
      }
    } else {
      window.location.href = "order.html";
    }
  }
}

/**
 * Reloads calendar if the div is populated
 */
function reloadCalendar() {
  const cal = $("#calendar-outbound")[0];
  if (cal.children.length !== 0) {
    initializeCalendars();
  }
}

/**
 * Removes calendar
 */
function removeCalendar() {
  $(".calendar.inbound").children().empty();
  $(".calendar.outbound").children().empty();
  $("#inbound-details").children().empty();
  $("#outbound-details").children().empty();
  localStorage.removeItem("inbound");
  localStorage.removeItem("outbound");
  $("#orderbox-params-when-btn > p").text("Select date");
}
