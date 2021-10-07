/**
 * Creates footer web component
 */
class Footer extends HTMLElement {
  constructor() {
    super();

    //Attaches shadow
    this.attachShadow({ mode: "open" });

    //Creates footer stylesheet link
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./css/customelements/footer.css");

    //Adds stylesheet to shadow
    this.shadowRoot.appendChild(link);

    //Creates footer element
    const footer = document.createElement("footer");
    footer.setAttribute("id", "footer");
    const p = footer.appendChild(document.createElement("p"));
    p.innerHTML =
      "Holbergs Båter is a limited responsibility company. <br> All responsibility is on you.";

    //Appends footer to the shadow
    this.shadowRoot.append(footer);
  }
}

//Defines custom footer as usable HTML tag/element
customElements.define("custom-footer", Footer);
