document.addEventListener("DOMContentLoaded", () => {
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

  // Search Functionalities

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const searchInput = document.querySelector(".search-input");
  const dropdown = document.querySelector(".search-dropdown");

  const fetchBooks = async (query) => {
    if (!query) {
      dropdown.style.display = "none";
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3000/search?q=${query}`
      );
      displayDropdown(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const displayDropdown = (books) => {
    dropdown.innerHTML = "";
    if (books.length === 0) {
      dropdown.style.display = "none";
      return;
    }
    books.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("dropdown-item");
      div.innerHTML = `<img class="dropdown-image" src="https://covers.openlibrary.org/b/id/${book.book_id}-M.jpg" alt="${book.title}"/>
        <div class="dropdown-text">
        <p class="dropdown-title">${book.title}</p>
        <p>By ${book.author}</p>
        </div>
        `;
      div.addEventListener("click", () => {
        searchInput.value = book.title;
        dropdown.style.display = "none";
      });
      dropdown.appendChild(div);
    });
    dropdown.style.display = "block";
  };

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== searchInput) {
      dropdown.innerHTML = ""; // Clear dropdown
      dropdown.style.display = "none";
    }
  });

  // Apply debounce to the input event
  const debouncedSearch = debounce((e) => fetchBooks(e.target.value), 500);
  searchInput.addEventListener("input", debouncedSearch);

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

  if (window.location.pathname === "/") {
    // Only initialize the slider on the homepage
    nextButton.addEventListener("click", () => showSlide(++currentIndex));
    prevButton.addEventListener("click", () => showSlide(--currentIndex));
    showSlide(currentIndex); // Initial call to show the first slide
  }

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
    const originalContent = content ? content.innerHTML : "";

    const hideContent = () => {
      arrowUp.classList.add("hidden");
      arrowDown.classList.remove("hidden");
      content.innerHTML = "";
    };

    const showContent = () => {
      arrowDown.classList.add("hidden");
      arrowUp.classList.remove("hidden");
      if (content) {
        content.innerHTML = originalContent;
      }
    };

    if (arrowUp) arrowUp.addEventListener("click", hideContent);
    if (arrowDown) arrowDown.addEventListener("click", showContent);
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
  const sortElement = document.querySelector("#sort");
  if (sortElement) {
    sortElement.addEventListener("change", async (event) => {
      try {
        const selectedValue = event.target.value;
        console.log(selectedValue);
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
  }

  // Genre-based Sorting
  const genres = document.querySelectorAll(".genres");
  if (genres) {
    genres.forEach((genre) => {
      genre.addEventListener("click", async () => {
        const selectedGenre = genre.textContent.toLowerCase();
        console.log(selectedGenre);
        if (selectedGenre) {
          const result = await axios.get(
            `http://localhost:3000/sortBy?genre=${selectedGenre}`
          );
          renderBooks(result.data.bookSorted);
        }
      });
    });
  }

  // Fetching all books on click
  const allBooks = document.querySelector(".allBooks-list-item");
  if (allBooks) {
    allBooks.addEventListener("click", async () => {
      try {
        const result = await axios.get(`http://localhost:3000/all`);
        renderBooks(result.data.collection);
      } catch (error) {
        console.log("Error fetching all books:", error);
      }
    });
  }

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
    const fullHearts = document.querySelectorAll(".heart-full-icon");
    const hearts = document.querySelectorAll(".heart-icon");

    hearts.forEach((heart, i) => {
      const heartId = heart.dataset.id;

      // Check if the heart was previously marked as "favourite"
      const favouriteStatus = localStorage.getItem(`heart-${heartId}`);

      // If it's favourite, show full heart on page load
      if (favouriteStatus === "true") {
        fullHearts[i].classList.remove("hidden");
        heart.classList.add("hidden");
      }

      // Listen for clicks on the heart icon
      heart.addEventListener("click", async () => {
        try {
          // Add to favourites
          const result = await axios.put(
            "http://localhost:3000/addToFavourites",
            {
              id: heartId,
              addToFavorites: true,
            }
          );

          if (result.data.favourite) {
            // Show full heart and hide empty heart
            fullHearts[i].classList.remove("hidden");
            heart.classList.add("hidden");

            // Save to LocalStorage
            localStorage.setItem(`heart-${heartId}`, "true");
          }
        } catch (error) {
          console.log(`Error:`, error);
        }
      });

      // Listen for clicks on the full heart icon
      fullHearts[i].addEventListener("click", async () => {
        try {
          // Remove from favourites
          const result = await axios.put(
            "http://localhost:3000/addToFavourites",
            {
              id: heartId,
              addToFavorites: false,
            }
          );

          if (!result.data.favourite) {
            // Show empty heart and hide full heart
            fullHearts[i].classList.add("hidden");
            heart.classList.remove("hidden");

            // Remove from LocalStorage
            localStorage.setItem(`heart-${heartId}`, "false");
          }
        } catch (error) {
          console.log(`Error:`, error);
        }
      });
    });
  };

  // BookDetailsPage

  const setupReadMoreFeature = () => {
    const description = document.querySelector(".details-description");
  
    if (description && description.textContent.length > 500) {
      const originalText = description.textContent; // Save the full text
      const partialText = originalText.slice(0, 500) + "... "; // Trimmed text
  
      // Set initial truncated text
      description.textContent = partialText;
  
      // Check if buttons already exist to avoid duplicates
      let readMoreBtn = description.querySelector(".read-more-btn");
      let readLessBtn = description.querySelector(".read-less-btn");
  
      if (!readMoreBtn) {
        // Create "Read More" button
        readMoreBtn = document.createElement("button");
        readMoreBtn.classList.add("description-buttons", "read-more-btn");
        readMoreBtn.textContent = "Read More";
        description.appendChild(readMoreBtn);
      }
  
      if (!readLessBtn) {
        // Create "Read Less" button
        readLessBtn = document.createElement("button");
        readLessBtn.classList.add("description-buttons", "read-less-btn", "hidden");
        readLessBtn.textContent = "Read Less";
        description.appendChild(readLessBtn);
      }
  
      // "Read More" button click event
      readMoreBtn.addEventListener("click", () => {
        description.textContent = originalText;
        readMoreBtn.classList.add("hidden");
        readLessBtn.classList.remove("hidden");
        description.appendChild(readLessBtn);
      });
  
      // "Read Less" button click event
      readLessBtn.addEventListener("click", () => {
        description.textContent = partialText;
        readLessBtn.classList.add("hidden");
        readMoreBtn.classList.remove("hidden");
        description.appendChild(readMoreBtn);
      });
    }
  };

  setupReadMoreFeature();

  // Editing and Deleting book functionalities
  const editBtn = document.querySelector(".edit-btn");
  const saveBtn = document.querySelector(".save-btn");
  const editInput = document.querySelector(".edit-input");
  const bookDescription = document.querySelector(".details-description");

  editBtn.addEventListener("click", () => {
    bookDescription.classList.add("hidden");
    editInput.classList.remove("hidden");
    editBtn.classList.add("hidden");
    saveBtn.classList.remove("hidden");
  });

  saveBtn.addEventListener("click", async () => {
    const inputValue = editInput.value.trim();
    const bookId = saveBtn.dataset.id;
    try {
      const result = await axios.put(`http://localhost:3000/editBook/${bookId}`, {
        newDescription: inputValue,
      });
      if (result.data.editedDescription) {
        bookDescription.textContent = result.data.editedDescription;
        bookDescription.classList.remove("hidden");
        editInput.classList.add("hidden");
        editBtn.classList.remove("hidden");
        saveBtn.classList.add("hidden");
        setupReadMoreFeature()
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  
  });

  addToFavourites();
});
