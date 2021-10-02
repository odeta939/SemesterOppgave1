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
    const img = div.appendChild(document.createElement("img"));
    img.setAttribute("class", "nav-logo-img");
    img.setAttribute("src", "Pictures/Logo.png");
    img.setAttribute("alt", "Logo");

    this.shadowRoot.append(nav);
  }
}

customElements.define("custom-navbar", Navbar);
