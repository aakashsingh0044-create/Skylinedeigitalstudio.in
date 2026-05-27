const sections = document.querySelectorAll(".section-wrapper");

function revealSections() {
    const trigger = window.innerHeight * 0.85;

    sections.forEach(section => {
        const top = section.getBoundingClientRect().top;

        if (top < trigger) {
            section.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealSections);
revealSections();





