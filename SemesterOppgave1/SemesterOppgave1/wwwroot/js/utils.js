function createTicketDetails(label, data, parentElement) {
  const p1 = document.createElement("p");
  p1.innerHTML = label;
  p1.classList.add("ticketInfo-infoType");
  p1.classList.add("ticketInfo-infoAll");
  const p2 = document.createElement("p");
  p2.innerHTML = label === "Departure time" ? data + " 09:00" : data;
  p2.classList.add("ticketInfo-infoData");
  p2.classList.add("ticketInfo-infoAll");

  const div = document.createElement("div");
  div.classList.add("ticketInfo-info");
  div.appendChild(p1);
  div.appendChild(p2);
  $(parentElement).append(div);
}
