let toList = [];
let fromList = [];

$(function () {
  localStorage.clear();
  checkOrder();
  const proceed = supportWarning();
  if (proceed) {
    addPassengerNrs();

    getDeparturePlaces();

    // Handle reloading edge cases
    enableFrom();
    enableDate();

    $("#fromPlace").on("change", function () {
        enableFrom();
        let departurePlace = $("#fromPlace").children("option:selected").text();
        $(".calendar.inbound").children().empty();
        $(".calendar.outbound").children().empty();
        $("#inbound-details").children().empty();
        $("#outbound-details").children().empty();
        localStorage.removeItem("inbound");
        localStorage.removeItem("outbound");
        localStorage.setItem("departure", departurePlace);
    });

    $("#toPlace").on("change", function () {
        enableDate(); 
        let arrivalPlace = $("#toPlace").children("option:selected").text();
        $(".calendar.inbound").children().empty();
        $(".calendar.outbound").children().empty();
        $("#inbound-details").children().empty();
        $("#outbound-details").children().empty();
        localStorage.removeItem("inbound");
        localStorage.removeItem("outbound");
        localStorage.setItem("arrival", arrivalPlace);
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
  $.get("order/GetAllRoutes", function (routes) {
    initialPlaces(routes);
  });
}

function enableFrom() {
  const from = $('select[name="from"]')[0].value;
  const to = $("#toPlace")[0];
  if (from !== "noPlace" && from !== "") {
    console.log(from);
    to.removeAttribute("disabled");
    setToPlaces();
  } else {
    console.log("In else");
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
    let arrivalCity = route.arrivalTerminalCity;
    let departureCity = route.departureTerminalCity;
    if (toList.indexOf(arrivalCity) == -1) {
      toList.push(arrivalCity);
      $("#fromPlace").append(
        $("<option>", {
          value: arrivalCity,
          text: arrivalCity,
        })
      );
    } else if (toList.indexOf(departureCity) == -1) {
      toList.push(departureCity);
      $("#fromPlace").append(
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
    if ($("#toPlace").val() === null || $("#fromPlace").val() === null || !localStorage.getItem("outbound")) {
    alert("Select a departure city, a destination and a date!");
    } else {
        if (localStorage.getItem("inbound")) {
            let outbound = localStorage.getItem("outbound");
            let outboundArr = outbound.split("-");
            let outboundCorrectOrder = outboundArr[2] + "-" + outboundArr[1] + "-" + outboundArr[0];
            var outboundDate = new Date(outboundCorrectOrder);

            let inbound = localStorage.getItem("inbound");
            let inboundArr = inbound.split("-");
            let inboundCorrectOrder = inboundArr[2] + "-" + inboundArr[1] + "-" + inboundArr[0];
            var inboundDate = new Date(inboundCorrectOrder);

            if (inboundDate < outboundDate) {
                alert("Your return trip is before your first trip! Choose a new date for your inbound (return) trip.");
            } else {
                window.location.href = "order.html";
            }
        } else {
            window.location.href = "order.html";
        }
  }
}

function checkOrder() {
  $.get("Order/GetAllOrders", function (orders) {
    console.log(orders);
  });
}
