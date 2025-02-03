window.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".header-section a");
  const currentPage = window.location.pathname.split(",").pop();

  links.forEach((link) => {
    link.classList.remove("active");
  });

  links.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === currentPage ||
        (currentPage.startsWith("/book") &&
          link.classList.contains("home-page"))
    );
  });

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
  showSlide(currentIndex);

  // Book review manipulation
  document.querySelectorAll(".book-review").forEach((review) => {
    if (review.textContent.length > 250) {
      review.textContent = review.textContent.slice(0, 250) + "...";
    }
  });

  // Sorting & Genre toggles
  const initializeToggle = (
    arrowUpSelector,
    arrowDownSelector,
    contentSelector
  ) => {
    const arrowUp = document.querySelector(arrowUpSelector);
    const arrowDown = document.querySelector(arrowDownSelector);
    const content = document.querySelector(contentSelector);
    const originalContent = content.innerHTML;

    const hideContent = () => {
      arrowUp.classList.add("hidden");
      arrowDown.classList.remove("hidden");
      content.innerHTML = "";
    };

    const showContent = () => {
      arrowDown.classList.add("hidden");
      arrowUp.classList.remove("hidden");
      content.innerHTML = originalContent;
    };

    arrowUp.addEventListener("click", hideContent);
    arrowDown.addEventListener("click", showContent);
  };

  initializeToggle(
    ".collection-arrow-up",
    ".collection-arrow-down",
    ".collection-options"
  );
  initializeToggle(".genre-arrow-up", ".genre-arrow-down", ".genre-options");

  const generateStarRating = (rating) => {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars += '<span class="star filled">&#9733;</span>';
      } else if (i === Math.floor(rating) + 1 && rating % 1 !== 0) {
        stars += '<span class="star half-filled">&#9733;</span>';
      } else {
        stars += '<span class="star">&#9733;</span>';
      }
    }
    return `<div class="book-rating">${stars}</div>`;
  };

  // Sorting books by selected option
  document.querySelector("#sort").addEventListener("change", async (event) => {
    try {
      const selectedValue = event.target.value;
      console.log(selectedValue)
      if (selectedValue) {
        const result = await axios.get(
          `http://localhost:3000/sortBy?option=${selectedValue}`
        );
        renderBooks(result.data.bookSorted);
      }
    } catch (error) {
      console.log("Error fetching sorted data:", error);
    }
  });

  // Genre-based Sorting
  document.querySelectorAll(".genres").forEach((genre) => {
    genre.addEventListener("click", async () => {
      const selectedGenre = genre.textContent.toLowerCase();
      console.log(selectedGenre)
      if (selectedGenre) {
        const result = await axios.get(
          `http://localhost:3000/sortBy?genre=${selectedGenre}`
        );
        renderBooks(result.data.bookSorted);
      }
    });
  });

  // Fetching all books on click
  const allBooks = document.querySelector(".allBooks-list-item");
  allBooks.addEventListener("click", async () => {
    try {
      const result = await axios.get(`http://localhost:3000/all`);
      renderBooks(result.data.collection);
    } catch (error) {
      console.log("Error fetching all books:", error);
    }
  });

  // Render books
  const renderBooks = (books) => {
    const booksSection = document.querySelector(".books-section");
    booksSection.innerHTML = "";
    books.forEach((book) => {
      const ratingHtml = generateStarRating(book.rating);
      const formatedDate = new Date(book.date).toLocaleDateString("en-US");
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("image-container");
      bookDiv.innerHTML = `
        <i class="fas fa-heart heart-full-icon hidden image-heart"></i>
        <i class="far fa-heart heart-icon image-heart" data-id=${book.book_id}></i>
        <div class="image-section">
          <a href="book/${book.book_id}" target="_blank">
            <img src="https://covers.openlibrary.org/b/id/${book.book_id}-M.jpg" alt="${book.title}" />
          </a>
        </div>
        <div class="book-description">
          <p class="book-title">${book.title}</p>
          <p>${book.author}</p>
          ${ratingHtml}
          <div class="book-date"> Date read: ${formatedDate}</div>
        </div>`;
      booksSection.appendChild(bookDiv);
    });

    addToFavourites();
  };

  // Add event listener for the heart (favourite) functionality

  const addToFavourites = () => {
    const fullHearts = document.querySelectorAll(".heart-full-icon")
    document.querySelectorAll(".heart-icon").forEach((heart,i) => {
      heart.addEventListener("click", async () => {
        try {
          const result = await axios.put(
            "http://localhost:3000/addToFavourites",
            { id: heart.dataset.id }
          );
          
          console.log(result.data.favourite)
        } catch (error) {
          console.log(`Error:`, error);
        }

        // heart.classList.toggle("far"); // Toggle empty heart
        // heart.classList.toggle("fas"); // Toggle full heart
      });
    });
  };

  addToFavourites();
  

  
});
