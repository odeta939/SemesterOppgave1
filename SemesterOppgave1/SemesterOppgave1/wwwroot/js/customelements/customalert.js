let btn_text = "Ok";

//A function that creates an alert box
function customAlert(text, title) {
  //Create the background that has the background blur when the alertbox is active
  let background = document
    .getElementsByTagName("body")[0]
    .appendChild(document.createElement("div"));
  background.id = "alertContainer";
  //Make the container have the same height as the scrollheight
  background.style.height = document.documentElement.scrollHeight + "px";
  //Onclick function to make the alertbox and the background go away if you click on the blurred out background itself
  background.onclick = function () {
    document
      .getElementsByTagName("body")[0]
      .removeChild(document.getElementById("alertContainer"));
    document
      .getElementsByTagName("body")[0]
      .removeChild(document.getElementById("alertBox"));
  };

  //Create the alert box as another child to the body tag
  let alerter = document
    .getElementsByTagName("body")[0]
    .appendChild(document.createElement("div"));
  alerter.id = "alertBox";
  //Have the height as scrollTop so that it doesnt disappear when you scroll down
  alerter.style.top = document.documentElement.scrollTop + "px";

  //Append an h1 and a p element to the alert box with their own text nodes that will have their values from the text and title parameters
  let h1 = alerter.appendChild(document.createElement("h1"));
  h1.appendChild(document.createTextNode(title));
  let p = alerter.appendChild(document.createElement("p"));
  p.appendChild(document.createTextNode(text));

  //Append an a tag to the alert box with the same function to remove both the background and the alert box when you click on it
  let a = alerter.appendChild(document.createElement("a"));
  a.id = "okBtn";
  a.appendChild(document.createTextNode(btn_text));
  //So that the page isnt reloaded we have # as the href
  a.href = "#";
  a.onclick = function () {
    document
      .getElementsByTagName("body")[0]
      .removeChild(document.getElementById("alertContainer"));
    document
      .getElementsByTagName("body")[0]
      .removeChild(document.getElementById("alertBox"));
  };
}
