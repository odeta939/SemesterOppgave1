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
const daysOfTheWeeks = [
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

let inboundDate = new Date(); //Current date to start with
let outboundDate = new Date(); //Current date to start with
let departureCity = "";
let arrivalCity = "";
let oneWay = false;

let ticketsWanted;

function initializeCalendars() {
  departureCity = localStorage.getItem("departure");
  arrivalCity = localStorage.getItem("arrival");
  oneWay = $('input[name="nrTrips"]:checked').val() == "oneway" ? true : false;
  monthInbound = inboundDate.getMonth(); //Getting the current month
  monthOutbound = outboundDate.getMonth(); //Getting the current month

  if (oneWay) {
    // One way
    createCalendar(outbound, outboundDate); //Creating outbound calendar
    $(".calendar.inbound").children().empty();
  } else {
    // Back and forth
    createCalendar(outbound, outboundDate); //Creating outbound calendar
    createCalendar(inbound, inboundDate); //Creating inbound calendar
  }
}

function createCalendar(direction, date) {
  //Creating the calendar one month at the time
  $(".calendar" + "." + direction)
    .empty()
    .append(
      //Setting title of the month
      $("<div/>").addClass("calendar-title").append("<span/>").text(direction)
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
      .html(
        "<span class='textMonth " +
          direction +
          "'>" +
          monthName +
          "</span> <span class='textYear " +
          direction +
          "'>" +
          date.getFullYear() +
          "</span>"
      )
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

  //add container for days
  const containerDoW = $("<div/>")
    .addClass("daysOfTheWeek")
    .addClass("calendar-cells");
  $(".calendar" + "." + direction)
    .children()
    .last()
    .append(containerDoW);

  for (let days = 0; days < daysOfTheWeeks.length; days++) {
    //Add the days of the week to make it look more readible
    containerDoW.append(
      $("<div/>")
        .addClass("dayOfTheWeek")
        .append("<span/>")
        .text(daysOfTheWeeks[days].slice(0, 3)) //Only the first three letters are used so that it is also readable on a phone
    );
  }

  //add container for days
  const containerDays = $("<div/>")
    .addClass("daysInCalendar")
    .addClass("calendar-cells");
  $(".calendar" + "." + direction)
    .children()
    .last()
    .append(containerDays);

  let startingWeekDay = date.getDay(); //Get the starting day of the week of the date that was provided

  //Sunday is 0 in getDay() so we change it to 7 so the week goes from 1 = monday to 7 = sunday
  if (startingWeekDay == 0) {
    startingWeekDay = 7;
  }

  for (let day = 1; day < startingWeekDay; day++) {
    //We create empty days so that the calendar starts on the right day
    containerDays.append(
      $("<div/>").addClass("emptyDay").append("<span/>").text("")
    );
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
        containerDays.append(
          $("<div/>")
            .addClass("day") //day class so that they all look the same
            .addClass(direction) //direction so that we can track the days
            .addClass("notActiveDay") //notActive since the user is not able to use it
            .append("<span/>")
            .text(newDay.getDate()) //The date
        );
      } else {
        //Otherwise we have a normal day
        containerDays.append(
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
    let capacityList = []; //List of capacity
    let ticketPriceList = []; //List of prices per route

    $.each(routes, function (index, route) {
      //Check every route if matching arrivalcity and departurecity
      if (
        route.arrivalTerminalCity == arrivalCity &&
        route.departureTerminalCity == departureCity
      ) {
        routeList.push(route.departureTime);
        capacityList.push(route.ticketsLeft);
        ticketPriceList.push(route.ticketPrice);
      }
    });

    setOnclickListners(routeList, capacityList, ticketPriceList, direction); //Setting all the onClick based on available routes
  });
}

function setOnclickListners(departureDays, capacity, ticketprice, direction) {
  $(".day" + "." + direction).each(function () {
    //For every day
    let routeDay = 0;
    let routeMonth = 0;
    let inRoute = false;

    let route = 0;
    let routeIndex = 0;

    for (; route < departureDays.length; route++) {
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
        $(".textMonth" + "." + direction).text() == monthNames[routeMonth - 1]
      ) {
        inRoute = true; //Set inRoute true there is an available route
        routeIndex = route; //capacity of the route has the same index as route since they are added to both the arrays at the same time
        route = 1000; //We found the match so we dont need to look further we can jump out the for loop by changing route to 1000
      }
    }

    if (inRoute) {
      const nrOfTravellers = Number(
        $("#passengers").children("option:selected").text()
      );

      //here we set the onclick
      if (capacity[routeIndex] > nrOfTravellers) {
        $(this).click(function () {
          let ticketDate =
            $(this).text().split("T")[0] +
            "-" +
            (monthNames.indexOf($(".textMonth" + "." + direction).text()) + 1) +
            "-" +
            $(".textYear" + "." + direction).text();

          showTicketData(
            direction,
            localStorage.getItem("departure"),
            localStorage.getItem("arrival"),
            capacity[routeIndex],
            ticketDate,
            ticketprice[routeIndex]
          );

          //Only one per outbound and inboud can be selected. This we can check based on antallClicked and directionn
          if (antallClicked == 0) {
            //No days selected so the first is always going to be active
            $(this).addClass("dayActive");
            let arrayDateText = $(this).text().split("T");
            let date = arrayDateText[0]; //Getting the day
            let selectedMonth = $(".textMonth" + "." + direction).text();

            date += "-" + (monthNames.indexOf(selectedMonth) + 1);
            date += "-" + $(".textYear" + "." + direction).text(); //Getting the year

            localStorage.setItem(direction, date); //Save selected date to locale storage
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
                localStorage.removeItem(direction);
                $(".dayActive").removeClass("dayActive");
                antallClicked -= 1; //  = 0
              } else {
                //Otherwise we replace the old one with the new selected
                $(".dayActive").removeClass("dayActive");
                $(this).addClass("dayActive");
                let arrayDateText = $(this).text().split("T");
                let date = arrayDateText[0]; //Getting the day
                let selectedMonth = $(".textMonth" + "." + direction).text();

                date += "-" + (monthNames.indexOf(selectedMonth) + 1);
                date += "-" + $(".textYear" + "." + direction).text(); //Getting the year

                localStorage.setItem(direction, date); //Save selected date to locale storage
                antallClicked = 1; // = 1
              }
            } else {
              //The clicked day has a different direction so we add it
              $(this).addClass("dayActive");
              let arrayDateText = $(this).text().split("T");
              let date = arrayDateText[0]; //Getting the day
              let selectedMonth = $(".textMonth" + "." + direction).text();

              date += "-" + (monthNames.indexOf(selectedMonth) + 1);
              date += "-" + $(".textYear" + "." + direction).text(); //Getting the year

              localStorage.setItem(direction, date); //Save selected date to locale storage
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
              localStorage.removeItem(direction);
              $("." + direction + ".dayActive").removeClass("dayActive");
              antallClicked -= 1; // = 1
            } else {
              //Otherwise we replace the old with the new
              $("." + direction + ".dayActive").removeClass("dayActive");
              $(this).addClass("dayActive");
              let arrayDateText = $(this).text().split("T");
              let date = arrayDateText[0]; //Getting the day
              let selectedMonth = $(".textMonth" + "." + direction).text();

              date += "-" + (monthNames.indexOf(selectedMonth) + 1);
              date += "-" + $(".textYear" + "." + direction).text(); //Getting the year
              localStorage.setItem(direction, date); //Save selected date to locale storage
            }
          }
        });
      } else {
        $(this).addClass("notActiveDay"); //Ticket is sold out day is set to not active
      }
    } else {
      $(this).addClass("notActiveDay"); //No active route found so the div will get notActiveDay as extra class
      //This also means that the div will be not clickable
    }
  });
}

function showTicketData(direction, from, to, seatsLeft, time, price) {
  const elem = $("#" + direction + "-details")[0];
  elem.innerHTML = "";

  const route = document.createElement("h4");
  route.innerText =
    direction === "outbound" ? from + " to " + to : to + " to " + from;
  route.classList.add("ticket-details-title");
  elem.append(route);

  createTicketDetails("Available seats", seatsLeft, elem);
  createTicketDetails("Departure time", time, elem);
  createTicketDetails("Price per ticket", "kr " + String(price) + ",-", elem);
}
