export const setUpSlider = () => {
  // Slider functionality
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slider-item");
  const totalSlides = slides.length;
  const slider = document.querySelector(".slider");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  const showSlide = (index) => {
    if (index >= totalSlides) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = totalSlides - 1;
    }
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  nextButton.addEventListener("click", () => showSlide(++currentIndex));
  prevButton.addEventListener("click", () => showSlide(--currentIndex));
  showSlide(currentIndex); // Initial call to show the first slide

  // Slider review manipulation
  document.querySelectorAll(".book-review").forEach((review) => {
    if (review.textContent.length > 250) {
      review.textContent = review.textContent.slice(0, 250) + "...";
    }
  });
};
