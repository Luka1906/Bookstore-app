window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".header-section a");
  const currentPage = window.location.pathname.split(",").pop();

  links.forEach((link) => {
    link.classList.remove("active");
  });

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Slider functionality

  let currentIndex = 0;
  const slides = document.querySelectorAll(".slider-item");
  const totalSlides = slides.length;
  const slider = document.querySelector(".slider");

  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  // Show the current slide
  const showSlide = (index) => {
    if (index >= totalSlides) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = totalSlides - 1;
    }

    // Move the slider to the correct position
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  // Show the next slide
nextButton.addEventListener('click', () => {
  currentIndex++;
  showSlide(currentIndex);
});

// Show the previous slide
prevButton.addEventListener('click', () => {
  currentIndex--;
  showSlide(currentIndex);
});

// Initialize the slider
showSlide(currentIndex);

});
