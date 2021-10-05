let toList = [];
let fromList = [];

$(function () {
  checkOrder();
  const proceed = supportWarning();
  if (proceed) {
    getDeparturePlaces();

    $("#fromPlace").on("change", function () {
      $("#toPlace").removeAttr("disabled");
      setToPlaces();
    });

    $("#toPlace").on("change", function () {
      $("#orderbox-params-when-btn").removeAttr("disabled");
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

<<<<<<< HEAD
<<<<<<< HEAD
function setCalendarBtn() {
  const btn = $("#date")[0];
  btn.addEventListener("click", (e) => {
    const container = $("#orderbox-extend")[0];
    container.innerHTML = "";
    const calendar = document.createElement("expand-calendar");
    container.appendChild(calendar);
  });
}


=======
>>>>>>> 7cc7e17 (Calendar working + initial style)
=======
function loadCalendars() {
  const wrapper = $("#orderbox-extend")[0];
  wrapper.innerHTML = "";
  wrapper.appendChild(document.createElement("expand-calendar"));
  initialize();
}

>>>>>>> a4b94a7 (Not working)
function getDeparturePlaces() {
  $.get("order/GetAllRoutes", function (routes) {
    initialPlaces(routes);
  });
}

function setToPlaces() {
  $.get("order/GetAllRoutes", function (routes) {
    AddOptionsToTo(routes);
  });
}

function initialPlaces(routes) {
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

//Adding departure and arrival place to localstorage to retrieve them in another file!
function orderTickets() {
  if ($("#toPlace").val() === null || $("#fromPlace").val() === null) {
    alert("Select both a departure city and a destination!");
  } else {
    let departurePlace = $("#fromPlace").children("option:selected").text();
    let arrivalPlace = $("#toPlace").children("option:selected").text();
    localStorage.setItem("departure", departurePlace);
    localStorage.setItem("arrival", arrivalPlace);
    window.location.href = "order.html";
  }
}

function checkOrder() {
  $.get("Order/GetAllOrders", function (orders) {
    console.log(orders);
  });
}
