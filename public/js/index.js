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
  nextButton.addEventListener("click", () => {
    currentIndex++;
    showSlide(currentIndex);
  });

  // Show the previous slide
  prevButton.addEventListener("click", () => {
    currentIndex--;
    showSlide(currentIndex);
  });

  // Initialize the slider
  showSlide(currentIndex);

  // Book review manipualtion

  const bookReview = document.querySelectorAll(".book-review");

  bookReview.forEach((review) => {
    if (review.textContent.length > 250) {
      review.textContent = review.textContent.slice(0, 250) + "...";
    }
  });

  // Display/Hidden Sorting Customization
  
 // Function to initialize toggle behavior for a section
const initializeToggle = (arrowUpSelector, arrowDownSelector, contentSelector) => {
  const arrowUp = document.querySelector(arrowUpSelector);
  const arrowDown = document.querySelector(arrowDownSelector);
  const content = document.querySelector(contentSelector);
  const originalContent = content.innerHTML;

  // Hide content logic
  const hideContent = () => {
    arrowUp.classList.add("hidden");
    arrowDown.classList.remove("hidden");
    content.innerHTML = ""; // Clear content
  };

  // Show content logic
  const showContent = () => {
    arrowDown.classList.add("hidden");
    arrowUp.classList.remove("hidden");
    content.innerHTML = originalContent; // Restore original content
  };

  // Add event listeners
  arrowUp.addEventListener("click", hideContent);
  arrowDown.addEventListener("click", showContent);
};

// Initialize toggles for all sections
initializeToggle(".collection-arrow-up", ".collection-arrow-down", ".collection-options");
initializeToggle(".genre-arrow-up", ".genre-arrow-down", ".genre-options");

});
