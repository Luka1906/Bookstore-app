/* eslint-disable no-undef */


// import axios from 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';

window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".header-section a");
  const currentPage = window.location.pathname.split(",").pop();

  links.forEach((link) => {
    link.classList.remove("active");
  });

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else if (currentPage.startsWith("/book")) {
      document.querySelector(".home-page").classList.add("active");
    }
  });
  console.log(currentPage);
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
  const initializeToggle = (
    arrowUpSelector,
    arrowDownSelector,
    contentSelector,
    iconSelector
  ) => {
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
  initializeToggle(
    ".collection-arrow-up",
    ".collection-arrow-down",
    ".collection-options"
  );
  initializeToggle(".genre-arrow-up", ".genre-arrow-down", ".genre-options");

  // Make axios request for sorting books


  document.querySelector("#sort").addEventListener("change", async (event) => {
    try {
      const selectedValue = event.target.value;
      if (selectedValue) {
        // eslint-disable-next-line no-undef
        const result = await axios.get(`http://localhost:3000/sortBy?option=${selectedValue}`);
        const booksSection = document.querySelector(".books-section");
        booksSection.innerHTML = "";


        result.data.bookSorted.forEach((book) => {
          const bookDiv = document.createElement("div");
          bookDiv.classList.add("image-container");
          bookDiv.innerHTML = `<i class="far fa-heart heart-icon"></i>
                        <div class="image-section">
                          <a href="book/${book.book_id}" target="_blank"><img src="https://covers.openlibrary.org/b/id/${book.book_id}-M.jpg"/></a>
                        </div>
                        <div class="book-description">
                            <p class="book-title">${book.title}</p>
                            <p>${book.author}</p>
                             <%- include('partials/bookRating.ejs', {book}) %>
                        </div>`;
          booksSection.appendChild(bookDiv);
        });
      }
    } catch (error) {
      console.log("Error fetching sorted data:", error)
    }
  });

  // Adding books to favourites collection
 
    const hearts = document.querySelectorAll(".heart-icon");
    console.log(hearts[0].dataset.id)
  
    hearts.forEach((heart) => {
      heart.addEventListener("click", async () => {
        try {

          const result = await axios.put(`http://localhost:3000/addToFavourites`, {id:heart.dataset.id});
          console.log(`Updated user with id ${result.data.id}`)
        } catch (error) {
          console.log(`Error:`,error)
        }
        console.log(heart.dataset.id)
        
        heart.classList.toggle("far]"); // Toggle empty heart
        heart.classList.toggle("fas"); // Toggle full heart
      });
    });

});
