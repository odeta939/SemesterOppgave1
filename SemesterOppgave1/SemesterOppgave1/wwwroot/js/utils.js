/**
 * Creates all ticket details, with a label-data structure
 * @param {*} label           Label for the data (ex: "Departure time", "Number of passengers")
 * @param {*} data            Data for the ticket (ex: "10-10-2021", "1")
 * @param {*} parentElement   Element under which the nodes will be added
 */
function createTicketDetails(label, data, parentElement) {
  //Creates paragraph with label for data
  const p1 = document.createElement("p");
  p1.innerHTML = label;
  p1.classList.add("ticketInfo-infoType");
  p1.classList.add("ticketInfo-infoAll");

  //Creates paragraph with data
  const p2 = document.createElement("p");
  p2.innerHTML =
    label === "Departure time" || label === "Arrival time"
      ? data + " 09:00"
      : data; // Conditionally adds time (always 09:00) to departure/arrival time fields
  p2.classList.add("ticketInfo-infoData");
  p2.classList.add("ticketInfo-infoAll");

  //Creates wrapper div
  const div = document.createElement("div");
  div.classList.add("ticketInfo-info");

  //Appends children to wrapper
  div.appendChild(p1);
  div.appendChild(p2);

  //Appends wrapper to parent element
  $(parentElement).append(div);
}

/*Total price of order*/
let totalPrice = 0;

/**
 * Calculates the total price for the tickets and calls placeTotal()
 * @param {*} route     Route object (contains ticketPrice)
 * @param {*} amount    Number of tickets
 */
function calculateTotalPrice(route, amount) {
  const ticketpr = Number(route.ticketPrice);
  totalPrice += ticketpr * amount; //Addition and not substitution for cases such as round-trips
  placeTotal();
}

/**
 * Places total price information in the corresponding html file/layout
 */
function placeTotal() {
  //Creates paragraph with label "Total price"
  const p1 = document.createElement("p");
  p1.innerHTML = "Total price";
  p1.classList.add("totalPrice-lbl");

  //Creates paragraph with total price value
  const p2 = document.createElement("p");
  p2.innerHTML = "kr " + totalPrice + ",-";
  p2.classList.add("totalPrice-data");

  //Creates parent div
  const div = document.createElement("div");
  div.classList.add("totalPrice-info");
  div.appendChild(p1);
  div.appendChild(p2);

  //Empties div and attaches paragraphs to it
  $("#priceInfo").html("");
  $("#priceInfo").append(div);
}
