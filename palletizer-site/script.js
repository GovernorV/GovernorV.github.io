const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 24) {
    header.style.boxShadow = "0 12px 34px rgba(0, 0, 0, 0.28)";
  } else {
    header.style.boxShadow = "none";
  }
});
