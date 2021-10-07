let toList = [];
let fromList = [];

$(function () {
  localStorage.clear();
  const proceed = supportWarning();
  if (proceed) {
    addPassengerNrs(); //Adding the amount of passengers to passengers

    getDeparturePlaces(); //Loading all the routes under from 

    // Handle reloading edge cases
      enableTo();
    enableDate();

    $("#fromPlace").on("change", function () {
        enableTo(); //Since the user has selected a from destination the rest of the form can be activated
        removeCalendar(); //If there was a calendar showing it means that the user has change its route and the calendar need to be deleted since it is not accurat anymore
        let departurePlace = $("#fromPlace").children("option:selected").text();
        localStorage.setItem("departure", departurePlace); //Departure place get stored into local storage
        //reloadCalendar();
    });

    $("#toPlace").on("change", function () {
        enableDate();
        removeCalendar();
        let arrivalPlace = $("#toPlace").children("option:selected").text();
        localStorage.setItem("arrival", arrivalPlace);
        //reloadCalendar();
    });

    $("#passengers").on("change", function () {
        removeCalendar();
          localStorage.setItem(
            "ticketAmount",
            $("#passengers").children("option:selected").text()
            );
            $("#orderbox-params-when-btn > p").text("Select date")
        reloadCalendar();
    });

      $('input[type="radio"]').on('click change', function (e) {
          $("#orderbox-params-when-btn > p").text("Select date")
          removeCalendar();
          //reloadCalendar();
      });

  }
});

function supportWarning() {
  const supportsCustomElementsv0 = "registerElement" in document;
  const supportsCustomElementsv1 = "customElements" in window;

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

function addPassengerNrs() {
  for (let i = 1; i < 100; i++) {
    $("#passengers").append(
      $("<option>", {
        value: i,
        text: i,
      })
    );
  }
}

function getDeparturePlaces() {
    $.get("order/GetAllRoutes", function (routes) { //Getting all the routes from the database
    initialPlaces(routes);
  });
}

function enableTo() {
  const from = $('select[name="from"]')[0].value;
  const to = $("#toPlace")[0];
  if (from !== "noPlace" && from !== "") {
    to.removeAttribute("disabled");
    setToPlaces();
  } else {
    to.setAttribute("disabled", true);
  }
}

function enableDate() {
  const date = $("#orderbox-params-when-btn")[0];
  const to = $('select[name="to"]')[0].value;
  if (to !== "noPlace" && to !== "") {
    date.removeAttribute("disabled");
  } else {
    addPlaceholder("Select destination", "#toPlace");
    date.setAttribute("disabled", true);
  }
}

function setToPlaces() {
  $.get("order/GetAllRoutes", function (routes) {
    AddOptionsToTo(routes);
  });
}

function initialPlaces(routes) {
  addPlaceholder("Select origin", "#fromPlace");

  for (let route of routes) {
    let departureCity = route.departureTerminalCity;
    if (toList.indexOf(departureCity) == -1) { //If the departure city is not found we add it to the list
      toList.push(departureCity);
      $("#fromPlace").append( //Add option for the place
        $("<option>", {
          value: departureCity,
          text: departureCity,
        })
      );
    }
  }
}

function AddOptionsToTo(routes) {
  fromList = [];
  $("#toPlace").empty();
  let selectedCity = $("#fromPlace").children("option:selected").val();

  addPlaceholder("Select destination", "#toPlace");

  for (let route of routes) {
    if (route.departureTerminalCity == selectedCity) {
      let arrivalCity = route.arrivalTerminalCity;
      if (fromList.indexOf(arrivalCity) == -1) {
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

// Adds placeholder option (edge-case handling)
function addPlaceholder(text, parent) {
  const option = document.createElement("option");
  option.value = "noPlace";
  option.setAttribute("disabled", true);
  option.setAttribute("selected", true);
  option.setAttribute("hidden", true);
  option.innerText = text;
  $(parent).append(option);
}

//Adding departure and arrival place to localstorage to retrieve them in another file!
function orderTickets() {
  if (
    $("#toPlace").val() === null ||
    $("#fromPlace").val() === null ||
    !localStorage.getItem("outbound")
  ) {
    alert("Select a departure city, a destination and a date!");
  } else {
    localStorage.setItem(
      "ticketAmount",
      $("#passengers").children("option:selected").text()
    );
    if (localStorage.getItem("inbound")) {
      let outbound = localStorage.getItem("outbound");
      let outboundArr = outbound.split("-");
      let outboundCorrectOrder =
        outboundArr[2] + "-" + outboundArr[1] + "-" + outboundArr[0];
      var outboundDate = new Date(outboundCorrectOrder);

      let inbound = localStorage.getItem("inbound");
      let inboundArr = inbound.split("-");
      let inboundCorrectOrder =
        inboundArr[2] + "-" + inboundArr[1] + "-" + inboundArr[0];
      var inboundDate = new Date(inboundCorrectOrder);

      if (inboundDate < outboundDate) {
        alert(
          "Your return trip is before your first trip! Choose a new date for your inbound (return) trip."
        );
      } else {
        window.location.href = "order.html";
      }
    } else {
      window.location.href = "order.html";
    }
  }
}

function reloadCalendar() {
  const cal = $("#calendar-outbound")[0];
  if (cal.children.length !== 0) {
    initializeCalendars();
    }
}

function removeCalendar() {
    $(".calendar.inbound").children().empty();
    $(".calendar.outbound").children().empty();
    $("#inbound-details").children().empty();
    $("#outbound-details").children().empty();
    localStorage.removeItem("inbound");
    localStorage.removeItem("outbound");
    $("#orderbox-params-when-btn > p").text("Select date")
}
