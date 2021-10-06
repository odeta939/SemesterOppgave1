class Navbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./css/customelements/navbar.css");
    this.shadowRoot.appendChild(link);

    const nav = document.createElement("nav");
    nav.setAttribute("id", "nav");
    const div = nav.appendChild(document.createElement("div"));
    div.setAttribute("class", "nav-logo");
    const href = div.appendChild(document.createElement("a"));
    href.setAttribute("href", "index.html");
    const img = href.appendChild(document.createElement("img"));
    img.setAttribute("class", "nav-logo-img");
    img.setAttribute("src", "static/Logo.png");
    img.setAttribute("alt", "Logo");

    this.shadowRoot.append(nav);
  }
}

customElements.define("custom-navbar", Navbar);
