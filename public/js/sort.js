import { renderBooks } from "./allBook.js";

export const setUpSorting = () => {
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
  // const allBooks = document.querySelector(".allBooks-list-item");
  // if (allBooks) {
  //   allBooks.addEventListener("click", async () => {
  //     try {
  //       const result = await axios.get(`http://localhost:3000/all`);
  //       renderBooks(result.data.collection);
  //     } catch (error) {
  //       console.log("Error fetching all books:", error);
  //     }
  //   });
  // }
};
