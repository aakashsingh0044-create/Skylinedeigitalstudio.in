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









