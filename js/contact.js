const info = document.querySelector(".contact-info");
const form = document.querySelector(".contact-form");

function revealContact() {
    const trigger = window.innerHeight * 0.85;

    if (info.getBoundingClientRect().top < trigger) {
        info.classList.add("show");
    }

    if (form.getBoundingClientRect().top < trigger) {
        form.classList.add("show");
    }
}

window.addEventListener("scroll", revealContact);
revealContact();









const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");

  document.body.classList.toggle("menu-open");
});