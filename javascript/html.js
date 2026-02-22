document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

});





document.addEventListener("DOMContentLoaded", function () {

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    reveals.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(50px)";
        el.style.transition = "all 0.8s ease";
        observer.observe(el);
    });

});

const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-scale');

window.addEventListener('scroll', () => {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
});







const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");

        portfolioCards.forEach(card => {

            const category = card.getAttribute("data-category");

           if (filterValue === "all" || category === filterValue) {
    card.classList.remove("hide");

    setTimeout(() => {
        card.classList.add("show");
    }, 100);
}
else {
                card.classList.remove("show");
                card.classList.add("hide");
            }

        });

    });
});


const whyCards = document.querySelectorAll(".why-card");
const counters = document.querySelectorAll(".why-stat h4");

let started = false;

function animateWhySection() {

    const triggerPoint = window.innerHeight * 0.85;

    whyCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;

        if (cardTop < triggerPoint) {

            setTimeout(() => {
                card.classList.add("show");
            }, index * 200);

            if (!started) {
                startCounters();
                started = true;
            }
        }
    });
}

function startCounters() {
    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");
        let count = 0;
        const speed = target / 100;

        const update = () => {
            count += speed;

            if (count < target) {
                counter.innerText = Math.floor(count);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };

        update();
    });
}

window.addEventListener("scroll", animateWhySection);


const track = document.querySelector(".testimonial-track");
const cards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dots span");

let currentIndex = 0;
// Clone first 3 cards and append for seamless looping
for (let i = 0; i < 3; i++) {
    const clone = cards[i].cloneNode(true);
    track.appendChild(clone);
}
function updateSlider(index) {

    currentIndex = index;

    const cardWidth = cards[0].offsetWidth;
    const gap = 30; // margin left + right (15+15)

 const cardPosition = cards[index].offsetLeft;
track.style.transform = `translateX(-${cardPosition}px)`;


    cards.forEach(card => card.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    if(cards[index]) {
        cards[index].classList.add("active");
    }

    dots[index].classList.add("active");
}

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        updateSlider(parseInt(dot.dataset.index));
    });
});

/* Auto Slide */

setInterval(() => {
    currentIndex++;
    updateSlider(currentIndex);

    if (currentIndex >= cards.length) {
        setTimeout(() => {
            track.style.transition = "none";
            currentIndex = 0;
            updateSlider(currentIndex);

            setTimeout(() => {
                track.style.transition = "transform 0.5s ease";
            }, 50);
        }, 500);
    }
}, 4000);



const leadershipTrack = document.querySelector(".leadership-track");
const leadershipCards = document.querySelectorAll(".leader-card");
const leadershipDots = document.querySelectorAll(".leadership-dots span");

let leaderIndex = 0;

function updateLeadership(index) {

    leaderIndex = index;

    const container = document.querySelector(".leadership-slider");
    const containerWidth = container.offsetWidth;

    const card = leadershipCards[index];
    const cardWidth = card.offsetWidth;

    const cardPosition =
        card.offsetLeft - (containerWidth / 2 - cardWidth / 2);

    leadershipTrack.style.transform =
        `translateX(-${cardPosition}px)`;

    leadershipDots.forEach(dot => dot.classList.remove("active"));
    leadershipDots[index].classList.add("active");
}


leadershipDots.forEach(dot => {
    dot.addEventListener("click", () => {
        updateLeadership(parseInt(dot.dataset.index));
    });
});

setInterval(() => {
    let next = leaderIndex + 1;
    if (next >= leadershipCards.length) next = 0;
    updateLeadership(next);
}, 4000);

updateLeadership(0);




document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contact-form");
  if (!form) return; // prevents errors on other pages

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
        console.log(result);
      }

    } catch (error) {
      alert("Network error. Please try again.");
      console.error(error);
    }
  });

});



