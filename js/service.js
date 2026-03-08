const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  const menuLinks = document.querySelectorAll(".nav-links a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const roadmapFill = document.querySelector(".roadmap-line-fill");
const roadArrows = document.querySelectorAll(".road-arrow");

const totalSteps = tabButtons.length;

function updateRoadmap(step) {
  const progress = ((step - 1) / (totalSteps - 1)) * 100;

  if (roadmapFill) {
    roadmapFill.style.width = `${progress}%`;
  }

  tabButtons.forEach((btn) => {
    const btnStep = Number(btn.dataset.step);
    btn.classList.remove("active", "completed");

    if (btnStep < step) btn.classList.add("completed");
    if (btnStep === step) btn.classList.add("active");
  });

  roadArrows.forEach((arrow, index) => {
    arrow.style.color = index < step - 1 ? "#6ea8ff" : "rgba(255,255,255,0.30)";
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.dataset.tab;
    const step = Number(button.dataset.step);

    tabContents.forEach((content) => content.classList.remove("active"));

    const activeTab = document.getElementById(targetTab);
    if (activeTab) activeTab.classList.add("active");

    updateRoadmap(step);
  });
});

updateRoadmap(1);