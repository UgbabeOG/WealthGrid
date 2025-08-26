// WealthGrid main JS file
// Example: Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Carousel functionality for hero section
const slides = document.querySelectorAll(".carousel-slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}
showSlide(currentSlide);
// Auto-rotate carousel every 4 seconds
setInterval(nextSlide, 4000);
