let btn_text = "Ok";

function customAlert(text, title) {
    if (document.getElementById("alertContainer")) {
        return;
    }
    let container = document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
    container.id = "alertContainer";
    container.style.height = document.documentElement.scrollHeight + "px";
    container.onclick = function () {
        document.getElementsByTagName("body")[0].removeChild(document.getElementById("alertContainer"));
        document.getElementsByTagName("body")[0].removeChild(document.getElementById("alertBox"));
    }

    let alerter = document.getElementsByTagName("body")[0].appendChild(document.createElement("div"));
    alerter.id = "alertBox";
    alerter.style.top = document.documentElement.scrollTop + "px";
    alerter.style.display = "block";

    let h1 = alerter.appendChild(document.createElement("h1"));
    h1.appendChild(document.createTextNode(title));
    let p = alerter.appendChild(document.createElement("p"));
    p.appendChild(document.createTextNode(text));

    let a = alerter.appendChild(document.createElement("a"));
    a.id = "okBtn";
    a.appendChild(document.createTextNode(btn_text));
    a.href = "#";
    a.onclick = function () {
        document.getElementsByTagName("body")[0].removeChild(document.getElementById("alertContainer"));
        document.getElementsByTagName("body")[0].removeChild(document.getElementById("alertBox"));
    };
}