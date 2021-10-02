class Footer extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./css/customelements/footer.css");

    this.shadowRoot.appendChild(link);

    const footer = document.createElement("footer");
    footer.setAttribute("id", "footer");
    const p = footer.appendChild(document.createElement("p"));
    p.innerHTML =
      "Holbergs Båter is a limited responsibility company. <br> All responsibility is on you.";
    this.shadowRoot.append(footer);
  }
}

customElements.define("custom-footer", Footer);
