function loadFooter() {
  fetch("componenet/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch(err => console.error("Footer load failed:", err));
}

loadFooter();