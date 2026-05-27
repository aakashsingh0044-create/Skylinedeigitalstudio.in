(function () {
  const script = document.currentScript;
  const scriptSrc = script ? script.getAttribute("src") || "" : "";
  const basePath = scriptSrc.includes("../") ? "../" : "";

  function qualifyPartialLinks(target) {
    if (!basePath) return;

    target.querySelectorAll("[href], [src]").forEach((element) => {
      ["href", "src"].forEach((attribute) => {
        const value = element.getAttribute(attribute);

        if (
          !value ||
          value.startsWith("#") ||
          value.startsWith("http") ||
          value.startsWith("mailto:") ||
          value.startsWith("tel:")
        ) {
          return;
        }

        element.setAttribute(attribute, basePath + value);
      });
    });
  }

  function fetchPartial(targetId, partialPath) {
    const target = document.getElementById(targetId);
    if (!target) return Promise.resolve();

    return fetch(basePath + partialPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Could not load ${partialPath}`);
        }
        return response.text();
      })
      .then((html) => {
        target.innerHTML = html;
        qualifyPartialLinks(target);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function initMenu() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      hamburger.classList.toggle("active", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  function highlightActivePage() {
    const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

    document.querySelectorAll(".nav-links a").forEach((link) => {
      const page = (link.dataset.page || link.getAttribute("href").split("/").pop()).toLowerCase();
      link.classList.toggle("active", page === currentPage);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    Promise.all([
      fetchPartial("site-header", "partials/header.html"),
      fetchPartial("site-footer", "partials/footer.html")
    ]).then(() => {
      initMenu();
      highlightActivePage();
      document.dispatchEvent(new CustomEvent("layout:ready"));
    });
  });
})();
