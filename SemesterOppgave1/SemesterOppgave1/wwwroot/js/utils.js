function createTicketDetails(label, data, parentElement) {
  const p1 = document.createElement("p");
  p1.innerHTML = label;
  p1.classList.add("ticketInfo-infoType");
  p1.classList.add("ticketInfo-infoAll");
  const p2 = document.createElement("p");
  p2.innerHTML =
    label === "Departure time" || label === "Arrival time"
      ? data + " 09:00"
      : data;
  p2.classList.add("ticketInfo-infoData");
  p2.classList.add("ticketInfo-infoAll");

  const div = document.createElement("div");
  div.classList.add("ticketInfo-info");
  div.appendChild(p1);
  div.appendChild(p2);
  $(parentElement).append(div);
}

let totalPrice = 0;

/**
 * Calculates the total price for the tickets
 * @param {*} route     Route object (contains ticketPrice)
 * @param {*} amount    Number of tickets
 */
function calculateTotalPrice(route, amount) {
  const ticketpr = Number(route.ticketPrice);
  totalPrice += ticketpr * amount;
  placeTotal();
}

/**
 * Places total in the corresponding file
 */
function placeTotal() {
  const p1 = document.createElement("p");
  p1.innerHTML = "Total price";
  p1.classList.add("totalPrice-lbl");
  const p2 = document.createElement("p");
  p2.innerHTML = "kr " + totalPrice + ",-";
  p2.classList.add("totalPrice-data");

  const div = document.createElement("div");
  div.classList.add("totalPrice-info");
  div.appendChild(p1);
  div.appendChild(p2);
  $("#priceInfo").html("");
  $("#priceInfo").append(div);
}
