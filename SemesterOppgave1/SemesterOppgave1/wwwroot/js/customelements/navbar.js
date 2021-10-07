//Creates navbar custom element
class Navbar extends HTMLElement {
  constructor() {
    super();

    //Attaches shadow
    this.attachShadow({ mode: "open" });

    //Creates navbar stylesheet link
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./css/customelements/navbar.css");

    //Attaches stylesheet to shadow
    this.shadowRoot.appendChild(link);

    //Creates nav
    const nav = document.createElement("nav");
    nav.setAttribute("id", "nav");
    const div = nav.appendChild(document.createElement("div"));
    div.setAttribute("class", "nav-logo");
    //Adds logo with link
    const href = div.appendChild(document.createElement("a"));
    href.setAttribute("href", "index.html");
    const img = href.appendChild(document.createElement("img"));
    img.setAttribute("class", "nav-logo-img");
    img.setAttribute("src", "static/Logo.png");
    img.setAttribute("alt", "Logo");

    //Appends nav to shadow
    this.shadowRoot.append(nav);
  }
}

//Defines custom navbar HTML element/tag
customElements.define("custom-navbar", Navbar);
