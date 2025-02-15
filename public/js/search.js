export const setUpSearch = () => {
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
        // window.location.href = `book/${book.book_id}`
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

  // Navigate to book details on click or enter

  const searchButton = document.querySelector(".search-icon");

  // Function to handle search (click & Enter)
  const handleSearch = async () => {
    const query = searchInput.value.trim();
    if (!query) return;

    const bookId = await getBookId(query);
    if (bookId) {
      window.location.href = `book/${bookId}`;
    } else {
      console.log("Book not found");
    }
  };
  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  });

  // Function to fetch book ID from backend
  const getBookId = async (title) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/search?q=${title}`
      );
      if (response.data.length > 0) {
        return response.data[0].book_id;
      }
      return null;
    } catch (error) {
      console.error("Error fetching book ID:", error);
      return null;
    }
  };
};
