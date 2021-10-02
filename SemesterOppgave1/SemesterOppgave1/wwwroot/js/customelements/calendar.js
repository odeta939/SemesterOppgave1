// Define custom element
class Calendar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./css/customelements/calendar.css");

    this.shadowRoot.appendChild(link);

    const wrapper = document.createElement("div");
    wrapper.setAttribute("class", "orderbox-extended-calendar");
    /**
     * Create radio-button structure for one way/round trip
     *  <nrTrips>
     *      <radio>One way</radio>
     *      <radio>Round trip</radio>
     *  </nrTrips>
     */
    const nrTrips = wrapper.appendChild(document.createElement("div"));
    nrTrips.setAttribute("class", "orderbox-extended-nrtrips");

    const oneWay = nrTrips.appendChild(document.createElement("radio"));
    oneWay.setAttribute("type", "radio");
    oneWay.setAttribute("id", "oneway");
    oneWay.setAttribute("class", "orderbox-extended-nrtrips-radio");
    oneWay.setAttribute("name", "nrTrips");
    oneWay.setAttribute("value", "One way");
    oneWay.textContent = "One way";
    oneWay.addEventListener("click", (e) => {
      if (oneWay.getAttribute("checked") == "checked") {
        isOneWay == true;
      } else {
        isOneWay = false;
      }
      initialise();
    });

    const roundTrip = nrTrips.appendChild(document.createElement("radio"));
    roundTrip.setAttribute("type", "radio");
    roundTrip.setAttribute("id", "roundtrip");
    roundTrip.setAttribute("name", "nrTrips");
    roundTrip.setAttribute("value", "Round trip");
    roundTrip.setAttribute("class", "orderbox-extended-nrtrips-radio");
    roundTrip.setAttribute("checked", "checked");
    roundTrip.textContent = "Round trip";
    roundTrip.addEventListener("click", (e) => {
      if (roundTrip.getAttribute("checked") == "checked") {
        isOneWay == false;
      } else {
        isOneWay = true;
      }
      initialise();
    });

    /**
     * Create calendar placement structure
     * <body-calendar>
     *    <calendar-inbound>
     *    <calendar-outbound>
     * </body-calendar>
     */
    const calendars = wrapper.appendChild(document.createElement("div"));
    calendars.setAttribute("id", "body-calendar");

    const calOutbound = calendars.appendChild(document.createElement("div"));
    calOutbound.setAttribute("class", "calendar outbound");

    const calInbound = calendars.appendChild(document.createElement("div"));
    calInbound.setAttribute("class", "calendar inbound");

    this.shadowRoot.append(wrapper);
  }
}

customElements.define("expand-calendar", Calendar);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let antallClicked = 0; //To check how many elements are clicked
let outbound = "outbound"; //Direction
let inbound = "inbound"; //Direction

let monthInbound; //which inbound month to show
let monthOutbound; //Which outbound month to show

let inboundDate;
let outboundDate;
let departureCity;
let arrivalCity;
let isOneWay = false;

function initialise() {
  // Proceed only if departure and arrival places are selected
  const departureSelect = $("#fromPlace").selectedIndex;
  const arrivalSelect = $("#toPlace").selectedIndex;
  if (departureSelect == -1 && arrivalSelect == -1) {
    alert("You must choose the departure and arrival places.");
    return;
  } else if (departureSelect == -1) {
    alert("You must choose where you are departing from.");
    return;
  } else if (arrivalSelect == -1) {
    alert("You must choose where you are going to.");
    return;
  }
  departureCity = $("#fromPlace").value;
  arrivalCity = $("#toPlace").value;
  inboundDate = new Date();
  outboundDate = new Date();
  monthInbound = inboundDate.getMonth(); //Getting the current month
  monthOutbound = outboundDate.getMonth(); //Getting the current month

  if (isOneWay) {
    // One way
    createCalendar(outbound, outboundDate); //Creating outbound calendar
  } else {
    // Back and forth
    createCalendar(outbound, outboundDate); //Creating outbound calendar
    createCalendar(inbound, inboundDate); //Creating inbound calendar
  }
}

function createCalendar(direction, date) {
  //Creating the calendar one month at the time
  $(".calendar" + "." + direction).append(
    //Setting titel of the month
    $("<div/>").addClass("calendar-titel").append("<span/>").text(direction)
  );

  let day = new Date(date.getFullYear(), date.getMonth(), 1); //first of the given month

  startNewMonth(monthNames[day.getMonth()], day, direction); //Fill in the new month in the calendar
  onClickListnersMonths(direction); //Add onclick on the buttons on the side so a user can switch to other months

  if (direction == "outbound") {
    //Now we are getting the routes from the database and plotting it into the calendar again based on direction
    getRoutes(departureCity, arrivalCity, outbound); // outbound = departure first
  } else {
    getRoutes(arrivalCity, departureCity, inbound); // inbouynd = means way back so arrivalCity first
  }
}

function startNewMonth(monthName, date, direction) {
  //All months are based on direction so it easy to track
  $(".calendar" + "." + direction).append(
    //Make a new month
    $("<div/>").addClass("month")
  );
  $(".calendar" + "." + direction)
    .children()
    .last()
    .append(
      //Add month text + arrows
      $("<div/>").addClass("monthText").addClass(direction)
    );
  $(".monthText" + "." + direction).append(
    //Add month text
    $("<div/>")
      .addClass("arrow")
      .addClass("left")
      .addClass(direction)
      .append("<span/>")
      .text("<")
  );
  $(".monthText" + "." + direction).append(
    //Add month text
    $("<div/>")
      .addClass("text")
      .addClass(direction)
      .append("<span/>")
      .text(monthName)
  );
  $(".monthText" + "." + direction).append(
    //Add month text
    $("<div/>")
      .addClass("arrow")
      .addClass("right")
      .addClass(direction)
      .append("<span/>")
      .text(">")
  );

  for (let days = 0; days < daysOfTheWeek.length; days++) {
    //Add the days of the week to make it look more readible
    $(".calendar" + "." + direction)
      .children()
      .last()
      .append(
        $("<div/>")
          .addClass("dayOfTheWeek")
          .append("<span/>")
          .text(daysOfTheWeek[days].slice(0, 3)) //Only the first three letters are used so that it is also readable on a phone
      );
  }

  let startingWeekDay = date.getDay(); //Get the starting day of the week of the date that was provided

  //Sunday is 0 in getDay() so we change it to 7 so the week goes from 1 = monday to 7 = sunday
  if (startingWeekDay == 0) {
    startingWeekDay = 7;
  }

  for (let day = 1; day < startingWeekDay; day++) {
    //We create empty days so that the calendar starts on the right day
    $(".calendar" + "." + direction)
      .children()
      .last()
      .append($("<div/>").addClass("emptyDay").append("<span/>").text(""));
  }

  for (let days = 0; days < 31; days++) {
    //For every remaining day we create days in the calendar
    let today = new Date();
    let newDay = new Date();
    newDay.setDate(date.getDate() + days); //New day in the calendar will be added days at while going through the for loop

    if (direction == "outbound") {
      //The difference in months will be calculated here based on direction
      let difference = monthOutbound - date.getMonth();
      newDay.setMonth(date.getMonth() + difference);
    } else {
      let difference = monthInbound - date.getMonth();
      newDay.setMonth(date.getMonth() + difference);
    }

    let yesterday = new Date();
    yesterday.setDate(newDay.getDate() - 1);

    if (yesterday.getDate() > newDay.getDate() && days > 0) {
      //When newDay is in a new month we stop and set the days to 100
      days = 100;
    } else {
      if (
        today.getDate() >= newDay.getDate() &&
        today.getMonth() == newDay.getMonth()
      ) {
        //If day is before today we set it to notActive
        $(".calendar" + "." + direction)
          .children()
          .last()
          .append(
            $("<div/>")
              .addClass("day") //day class so that they all look the same
              .addClass(direction) //direction so that we can track the days
              .addClass("notActiveDay") //notActive since the user is not able to use it
              .append("<span/>")
              .text(newDay.getDate()) //The date
          );
      } else {
        //Otherwise we have a normal day
        $(".calendar" + "." + direction)
          .children()
          .last()
          .append(
            $("<div/>")
              .addClass("day") //day class so that they all look the same
              .addClass(direction) //direction so that we can track the days
              .append("<span/>")
              .text(newDay.getDate()) //The date
          );
      }
    }
  }
}

function onClickListnersMonths(direction) {
  let visibleMonth;
  if (direction == "outbound") {
    visibleMonth = monthOutbound;
  } else {
    visibleMonth = monthInbound;
  }

  let today = new Date();
  let backPossible = false;

  if (today.getMonth() == visibleMonth) {
    //If the showing month is the same as the visible month
    $(".arrow.left" + "." + direction).each(function () {
      $(this).text(""); //No text since it should not be possible to go back in time
    });
  } else {
    $(".arrow.left" + "." + direction).each(function () {
      $(this).text("<");
      backPossible = true;
    });
  }

  if (backPossible) {
    //if back is possible we add the needed onclick
    $(".arrow.left" + "." + direction).each(function () {
      if ($(this).hasClass("outbound")) {
        //We check for direction in order to prevent the function from running twice
        $(this).click(function () {
          arrowOnClick(-1, direction); //We want to go back so we reduce the amount of months with 1
        });
      } else if ($(this).hasClass("inbound")) {
        //We check for direction in order to prevent the function from running twice
        $(this).click(function () {
          arrowOnClick(-1, direction); //We want to go back so we reduce the amount of months with 1
        });
      }
    });
  }
  //We can always go to the future so onclick will be made here
  $(".arrow.right" + "." + direction).each(function () {
    if ($(this).hasClass("outbound")) {
      //We check for direction in order to prevent the function from running twice
      $(this).click(function () {
        arrowOnClick(1, direction); //We want to go back so we increase the amount of months with 1
      });
    } else if ($(this).hasClass("inbound")) {
      //We check for direction in order to prevent the function from running twice
      $(this).click(function () {
        arrowOnClick(1, direction); //We want to go back so we increase the amount of months with 1
      });
    }
  });
}

function arrowOnClick(value, direction) {
  //We want to change the month of the clicked element
  $(".calendar" + "." + direction).empty(); //clear the old
  let today = new Date();
  let monthToday = today.getMonth(); //get todays month

  let difference;
  if (direction == "outbound") {
    monthOutbound += value; //Update the value for which month
    difference = monthOutbound - monthToday; //calculate the difference in order to offset the current date
  } else {
    monthInbound += value; //Update the value for which month
    difference = monthInbound - monthToday; //calculate the difference in order to offset the current date
  }

  today.setMonth(today.getMonth() + difference); //We offsett the current date based on todays date
  createCalendar(direction, today); //We create a new calendar
}

function getRoutes(departureCity, arrivalCity, direction) {
  $.get("order/GetAllRoutes", function (routes) {
    //Getting routes from database

    let routeList = []; //List of departure times

    $.each(routes, function (index, route) {
      //Check every route if matching arrivalcity and departurecity
      if (
        route.arrivalTerminalCity == arrivalCity &&
        route.departureTerminalCity == departureCity
      ) {
        routeList.push(route.departureTime); //if the match we add it to the list
      }
    });

    setOnclickListners(routeList, direction); //Setting all the onClick based on available routes
  });
}

function setOnclickListners(departureDays, direction) {
  $(".day" + "." + direction).each(function () {
    //For every day
    let routeDay = 0;
    let routeMonth = 0;
    let inRoute = false;

    for (let route = 0; route < departureDays.length; route++) {
      //Looping through all the routes
      let dateArray = departureDays[route].split("-"); //day-month-year is the format we use in the database so we need to split it
      routeDay = dateArray[0]; //Getting the day
      routeMonth = dateArray[1]; //Getting the month
      if (routeDay.slice(0, 1) == 0) {
        //in case the day start with a 0
        routeDay = routeDay.slice(1, 2);
      }
      if (routeMonth.slice(0, 1) == 0) {
        //in case the month start with a 0
        routeMonth = routeMonth.slice(1, 2);
      }
      //In case the day is the same as the route. We check if route day matches, if the day is active or not and if the months matches
      if (
        $(this).text() == routeDay &&
        !$(this).hasClass("notActiveDay") &&
        $(".text" + "." + direction).text() == monthNames[routeMonth - 1]
      ) {
        inRoute = true; //Set inRoute true there is an available route
      }
    }

    if (inRoute) {
      //here we set the onclick
      $(this).click(function () {
        //Only one per outbound and inboud can be selected. This we can check based on antallClicked and directionn
        if (antallClicked == 0) {
          //No days selected so the first is always going to be active
          $(this).addClass("dayActive");
          antallClicked = 1;
        } else if (antallClicked == 1) {
          //If there is one active we will add another with dayActiv
          if ($(".dayActive").hasClass(direction)) {
            //If the active day has the same direction we replace it
            //If it is the same day we remove the class active from it
            if (
              $(".dayActive").attr("class") === $(this).attr("class") &&
              $(".dayActive").text() &&
              $(this).text()
            ) {
              $(".dayActive").removeClass("dayActive");
              antallClicked -= 1; //  = 0
            } else {
              //Otherwise we replace the old one with the new selected
              $(".dayActive").removeClass("dayActive");
              $(this).addClass("dayActive");
              antallClicked = 1; // = 1
            }
          } else {
            //The clicked day has a different direction so we add it
            $(this).addClass("dayActive");
            antallClicked += 1; // = 2
          }
        } else if (antallClicked == 2) {
          //When antallClicked is 2 we need to replace based on the direction
          //If the same day is clicked upon we remove it
          if (
            $("." + direction + ".dayActive").attr("class") ===
              $(this).attr("class") &&
            $(".dayActive").text() &&
            $(this).text()
          ) {
            $("." + direction + ".dayActive").removeClass("dayActive");
            antallClicked -= 1; // = 1
          } else {
            //Otherwise we replace the old with the new
            $("." + direction + ".dayActive").removeClass("dayActive");
            $(this).addClass("dayActive");
          }
        }
      });
    } else {
      $(this).addClass("notActiveDay"); //No active route found so the div will get notActiveDay as extra class
      //This also means that the div will be not clickable
    }
  });
}
