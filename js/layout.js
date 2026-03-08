document.addEventListener("DOMContentLoaded", function () {

  // Load Header
  fetch("partials/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
      initMenu();
      highlightActive();
    });

  // Load Footer
  fetch("partials/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;
    });

});

function initMenu() {
  const toggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if(toggle) {
    toggle.addEventListener("click", function() {
      navLinks.classList.toggle("active");
    });
  }
}

function highlightActive() {
  const links = document.querySelectorAll(".nav-links a");
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if(link.getAttribute("href") === current) {
      link.style.color = "#3da5ff";
    }
  });
}